import { EditForm } from '@/components/admin/project-edit';

export default async function Home({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = await params;
  return <EditForm id={projectId} />;
}
