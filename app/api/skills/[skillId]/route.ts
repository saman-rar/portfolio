import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { skillId: string } },
) {
  const { skillId } = await params;

  try {
    const skill = await prisma.skill.findUnique({
      where: {
        id: Number(skillId),
      },
      include: {
        projects: { include: { techs: true, categories: true } },
        category: true,
      },
    });
    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong!', status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { skillId: string } },
) {
  const { skillId } = await params;
  const body = await req.json();

  const {
    title,
    description,
    liveUrl,
    githubUrl,
    tag,
    techs,
    categories,
    image,
  } = body;

  const skillsId = await prisma.skill.findMany({
    where: {
      name: { in: techs },
    },
    select: {
      id: true,
    },
  });

  const categoriesId = await prisma.category.findMany({
    where: {
      name: { in: categories },
    },
    select: {
      id: true,
    },
  });

  try {
    const project = await prisma.project.update({
      where: { id: Number(skillId) },
      data: {
        title,
        description,
        liveUrl,
        githubUrl,
        tag,
        image,
        techs: {
          set: [],
          connect: skillsId,
        },
        categories: {
          set: [],
          connect: categoriesId,
        },
      },
      include: { techs: true, categories: true },
    });

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to update project.',
      status: 500,
    });
  }
}
