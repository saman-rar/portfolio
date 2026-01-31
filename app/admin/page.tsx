import { LoginForm } from '@/components/admin/login-form';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AdminLogin() {
  return (
    <div className='min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-12'>
      <div className='fixed top-2 right-2 md:top-3 md:right-3 z-50 flex flex-col gap-3'>
        <ThemeToggle />
      </div>
      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col justify-center items-center pt-15'>
          <main className='flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden w-200'>
            <div className='p-4 sm:p-5 md:p-6 lg:p-8'>
              <LoginForm />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
