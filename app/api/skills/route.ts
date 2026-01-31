import { Prisma } from '@/lib/generated/prisma/client';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const skills: Prisma.SkillGetPayload<{
      include: { category: true; projects: true };
    }>[] = await prisma.skill.findMany({
      include: { category: true, projects: true },
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong!', status: 500 });
  }
}
