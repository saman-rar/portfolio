import { EditForm } from '@/components/admin/tech-edit';

export default async function Home({
  params,
}: {
  params: { skillId: string };
}) {
  const { skillId } = await params;
  return <EditForm id={skillId} />;
}
