'use client';

import type React from 'react';
import {
  useState,
  useRef,
  useCallback,
  type DragEvent,
  useEffect,
} from 'react';
import { UploadCloud, FileIcon, X, CheckCircle } from 'lucide-react';

type UploadStatus = 'idle' | 'dragging' | 'uploading' | 'success' | 'error';

interface FileUploadProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  previewUrl: string | null;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  onUploadSuccess?: (file: File) => void;
  onUploadError?: (error: string) => void;
  maxFileSize?: number; // in bytes
  currentFile?: File | null;
  onFileRemove?: () => void;
}

export default function ImageUpload({
  file,
  setFile,
  previewUrl,
  setPreviewUrl,
  onUploadSuccess,
  onUploadError,
  maxFileSize = 5 * 1024 * 1024, // Default 5MB
  currentFile: initialFile = null,
  onFileRemove,
}: FileUploadProps) {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file?.type?.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    return () => setPreviewUrl(null);
  }, [file]);

  const handleFileValidation = (selectedFile: File): boolean => {
    setError(null);
    if (maxFileSize && selectedFile.size > maxFileSize) {
      const err = `File size exceeds the limit of ${formatBytes(maxFileSize)}.`;
      setError(err);
      setStatus('error');
      if (onUploadError) onUploadError(err);
      return false;
    }
    return true;
  };

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (!handleFileValidation(selectedFile)) {
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError(null);
    setStatus('uploading');
    setProgress(0);
    simulateUpload(selectedFile);
  };

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (status !== 'uploading' && status !== 'success') {
        setStatus('dragging');
      }
    },
    [status],
  );

  const handleDragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (status === 'dragging') {
        setStatus('idle');
      }
    },
    [status],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (status === 'uploading' || status === 'success') return;

      setStatus('idle');
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) {
        handleFileSelect(droppedFile);
      }
    },
    [status],
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    handleFileSelect(selectedFile || null);
    if (e.target) e.target.value = '';
  };

  const triggerFileInput = () => {
    if (status === 'uploading' || status === 'success') return;
    fileInputRef.current?.click();
  };

  const simulateUpload = (uploadingFile: File) => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10 + 10;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setStatus('success');
        if (onUploadSuccess) {
          onUploadSuccess(uploadingFile);
        }
      } else {
        setStatus((prevStatus) => {
          if (prevStatus === 'uploading') {
            setProgress(currentProgress);
            return 'uploading';
          }
          clearInterval(interval);
          return prevStatus;
        });
      }
    }, 200);
  };

  const resetState = () => {
    setFile(null);
    setStatus('idle');
    setProgress(0);
    setError(null);
    setPreviewUrl(null);
  };

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    setStatus('idle');
    setProgress(0);
    setError(null);
    setPreviewUrl(null);
    if (onFileRemove) onFileRemove();
  }, [onFileRemove]);

  const formatBytes = (bytes: number, decimals = 2): string => {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const unit = sizes[i] || sizes[sizes.length - 1];

    return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${unit}`;
  };

  return (
    <div className='w-full max-w-xlg mx-auto'>
      <div className='bg-black/8 border border-border p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl dark:bg-white/5'>
        {file && (status === 'success' || status !== 'uploading') ? (
          <div className='flex flex-col items-center text-center space-y-4'>
            {previewUrl && (
              <div className='w-50 aspect-video rounded-lg overflow-hidden border'>
                <img
                  src={previewUrl || '/placeholder.svg'}
                  alt={`Preview of ${file.name}`}
                  className='w-full h-full object-cover'
                />
              </div>
            )}
            {!previewUrl && (
              <FileIcon className='w-16 h-16 text-muted-foreground' />
            )}

            <div className='space-y-2'>
              <h3 className='font-semibold'>Current File</h3>
              <div className='bg-muted rounded-lg p-3 space-y-2'>
                <p className='text-sm font-medium truncate' title={file.name}>
                  {file.name}
                </p>
                <div className='grid grid-cols-2 gap-2 text-xs text-muted-foreground'>
                  <div>
                    <span>Size: </span>
                    <span className='font-medium'>
                      {formatBytes(file.size)}
                    </span>
                  </div>
                  <div>
                    <span>Type: </span>
                    <span className='font-medium'>
                      {file.type.split('/')[1]?.toUpperCase() || 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-2'>
              <button
                className='cursor-pointer transition duration-150 ease-in  bg-accent hover:bg-accent/80 py-2 px-4 rounded-lg'
                onClick={triggerFileInput}
              >
                Replace File
              </button>
              <button
                className='cursor-pointer transition duration-150 ease-in bg-destructive hover:bg-destructive/80 py-2 px-4 rounded-lg'
                onClick={handleRemoveFile}
              >
                Remove
              </button>
            </div>
          </div>
        ) : status === 'idle' || status === 'dragging' ? (
          <div
            className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              status === 'dragging'
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary hover:bg-primary/5'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <UploadCloud className='w-12 h-12 mb-4 text-muted-foreground' />
            <p className='mb-2 text-sm text-muted-foreground'>
              <span className='font-semibold'>Click to upload</span> or drag and
              drop
            </p>
            <p className='text-xs text-muted-foreground'>
              Any file type {maxFileSize && `(Max ${formatBytes(maxFileSize)})`}
            </p>
            <input
              ref={fileInputRef}
              type='file'
              className='sr-only'
              onChange={handleFileInputChange}
            />
          </div>
        ) : status === 'uploading' && file ? (
          <div className='flex flex-col items-center space-y-4'>
            <div className='w-16 h-16 relative'>
              <svg className='w-full h-full -rotate-90' viewBox='0 0 36 36'>
                <circle
                  cx='18'
                  cy='18'
                  r='16'
                  fill='none'
                  className='stroke-muted'
                  strokeWidth='2'
                />
                <circle
                  cx='18'
                  cy='18'
                  r='16'
                  fill='none'
                  className='stroke-primary'
                  strokeWidth='2'
                  strokeDasharray='100'
                  strokeDashoffset={100 - progress}
                />
              </svg>
              <FileIcon className='w-8 h-8 absolute inset-0 m-auto text-primary' />
            </div>
            <div className='text-center'>
              <p
                className='text-sm font-medium truncate max-w-50'
                title={file.name}
              >
                {file.name}
              </p>
              <p className='text-xs text-muted-foreground'>
                Uploading... {Math.round(progress)}%
              </p>
            </div>
            <button onClick={resetState}>Cancel</button>
          </div>
        ) : status === 'success' && file ? (
          <div className='flex flex-col items-center text-center space-y-4'>
            <CheckCircle className='w-16 h-16 text-green-500' />
            <div>
              <h3 className='font-semibold'>Upload Successful!</h3>
              <p
                className='text-sm text-muted-foreground truncate max-w-50'
                title={file.name}
              >
                {file.name} ({formatBytes(file.size)})
              </p>
            </div>
            <button onClick={resetState}>Upload Another File</button>
          </div>
        ) : status === 'error' ? (
          <div className='flex flex-col items-center text-center space-y-4'>
            <X className='w-12 h-12 text-destructive' />
            <div>
              <p className='font-medium text-destructive'>Upload Failed</p>
              <p className='text-xs text-muted-foreground max-w-xs'>
                {error || 'An unknown error occurred.'}
              </p>
            </div>
            <button onClick={resetState}>Try Again</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
