import { Prisma } from '@/lib/generated/prisma/client';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const categories: Prisma.CategoryGetPayload<{
      include: { projects: { include: { techs: true; categories: true } } };
    }>[] = await prisma.category.findMany({
      include: {
        projects: { include: { techs: true, categories: true } },
        skills: { include: { projects: true, category: true } },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong!', status: 500 });
  }
}
