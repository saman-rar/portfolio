import { Prisma } from '@/lib/generated/prisma/client';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { category: string } },
) {
  const { category } = await params;

  try {
    let skills: Prisma.SkillGetPayload<{
      include: { category: true; projects: true };
    }>[];

    if (!category || category === 'all') {
      skills = await prisma.skill.findMany({
        include: { category: true, projects: true },
      });
    } else {
      skills = await prisma.skill.findMany({
        where: {
          category: {
            name: category,
          },
        },
        include: { category: true, projects: true },
      });
    }
    console.log(skills, category);
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong!', status: 500 });
  }
}
