import { Prisma, Project } from '@/lib/generated/prisma/client';
import {
  Project$categoriesArgs,
  ProjectCreateArgs,
  ProjectCreateInput,
  ProjectGetPayload,
} from '@/lib/generated/prisma/models';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get('category');
  const tech = searchParams.get('tech');

  const where: any = {};

  if (category && category !== 'all') {
    where.categories = {
      some: {
        name: category,
      },
    };
  }

  if (tech && tech !== 'all') {
    where.techs = {
      some: {
        name: category,
      },
    };
  }

  try {
    const projects = await prisma.project.findMany({
      where,
      include: { techs: true, categories: true },
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong!', status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      image,
      description,
      liveUrl,
      githubUrl,
      tag,
      techs,
      categories,
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

    const project: ProjectGetPayload<{
      include: { categories: true; techs: true };
    }> = await prisma.project.create({
      data: {
        title,
        image,
        description,
        liveUrl,
        githubUrl,
        tag,
        categories: {
          connect: categoriesId,
        },
        techs: {
          connect: skillsId,
        },
      },
      include: {
        categories: true,
        techs: true,
      },
    });

    return NextResponse.json({
      project,
      status: 201,
      messgae: 'Project created succeddfully!',
    });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
