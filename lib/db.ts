import { ProjectGetPayload, SkillGetPayload } from './generated/prisma/models';
import prisma from './prisma';

//Project
export type Project = ProjectGetPayload<{
  include: { techs: true; categories: true };
}>;

//Get all projects
export const getProjects = async (): Promise<Project[]> => {
  const projects = await prisma.project.findMany({
    include: {
      techs: true,
      categories: true,
    },
  });

  console.log(projects);
  return projects;
};

//Skill
export type Skill = SkillGetPayload<{
  include: { projects: true; category: true };
}>;

export const getSkills = async (): Promise<Skill[]> => {
  const skills = await prisma.skill.findMany({
    include: {
      projects: true,
      category: true,
    },
  });

  return skills;
};
