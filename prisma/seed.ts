import { PrismaClient, Prisma } from '@/lib/generated/prisma/client';
import { portfolioData } from '@/lib/portfolio-data';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import 'dotenv/config';

const adapter = new PrismaBetterSqlite3({
  url: `${process.env.DATABASE_URL}`,
});

const prisma = new PrismaClient({ adapter });

function getStatus(years: string) {
  if (years === '+0') return 'Learning';
  if (years === '1' || years === '+1') return 'Beginner';
  if (years === '2' || years === '+2') return 'Intermediate';
  if (years === '3') return 'Advanced';
  return 'Unknown';
}

async function main() {
  console.log('Seeding categories...');
  // درست کردن دسته‌ها بدون where
  await prisma.category.createMany({
    data: [
      { name: 'Front-End' },
      { name: 'Back-End' },
      { name: 'CMS' },
      { name: 'Tools' },
    ],
  });

  const categories = await prisma.category.findMany();

  const getCategory = (name: string) =>
    categories.find((c) => c.name === name)!;

  console.log('Seeding skills...');
  const skillsData = [
    {
      name: 'HTML5 & CSS',
      level: 100,
      years: '3',
      projects: ['GameStation', 'Wedding'],
      category: 'Front-End',
    },
    {
      name: 'Sass',
      level: 100,
      years: '3',
      projects: ['Asia Janebi Shop', 'Task Manager'],
      category: 'Front-End',
    },
    {
      name: 'Javascript',
      level: 80,
      years: '+2',
      projects: ['Task Manager'],
      category: 'Front-End',
    },
    {
      name: 'Typescript',
      level: 80,
      years: '+2',
      projects: ['Payload Digital Market'],
      category: 'Front-End',
    },
    {
      name: 'React.js',
      level: 65,
      years: '2',
      projects: ['Asia Janebi Shop'],
      category: 'Front-End',
    },
    {
      name: 'Next.js',
      level: 65,
      years: '2',
      projects: ['Payload Digital Market', 'E-Commerce'],
      category: 'Front-End',
    },
    {
      name: 'React State Managements',
      level: 65,
      years: '2',
      projects: ['Payload Digitla Market', 'Asia Janebi Shop'],
      category: 'Front-End',
    },
    {
      name: 'Tailwind Css',
      level: 65,
      years: '2',
      projects: ['Payload Digital Market', 'E-Commerce'],
      category: 'Front-End',
    },
    {
      name: 'Git & Github',
      level: 65,
      years: '2',
      projects: [],
      category: 'Tools',
    },
    {
      name: 'RESTful APIs',
      level: 65,
      years: '+1',
      projects: ['Github'],
      category: 'Back-End',
    },
    {
      name: 'MongoDb & Mongoose',
      level: 50,
      years: '+1',
      projects: [],
      category: 'Back-End',
    },
    {
      name: 'PostgreSQL & Prisma',
      level: 50,
      years: '+1',
      projects: [],
      category: 'Back-End',
    },
    {
      name: 'Node.js',
      level: 35,
      years: '1',
      projects: [],
      category: 'Back-End',
    },
    {
      name: 'Express.js',
      level: 15,
      years: '+0',
      projects: [],
      category: 'Back-End',
    },
    {
      name: 'Nest.js',
      level: 15,
      years: '+0',
      projects: [],
      category: 'Back-End',
    },
    {
      name: 'Payload CMS',
      level: 15,
      years: '+0',
      projects: [],
      category: 'CMS',
    },
  ];

  const skills = await Promise.all(
    skillsData.map((skill) =>
      prisma.skill.upsert({
        where: { name: skill.name },
        update: {},
        create: {
          name: skill.name,
          level: skill.level,
          yearsOfExperience: skill.years,
          status: getStatus(skill.years),
          category: { connect: { id: getCategory(skill.category).id } },
        },
      }),
    ),
  );

  console.log('Seeding projects...');
  const projectsData = [
    {
      title: 'Task Manager',
      categories: ['Front-End'],
      techs: ['Javascript'],
      tag: 'Javascript',
      image: '/task-management-interface.png',
      description: 'Collaborative task manager with real-time update.',
      liveUrl: 'https://task-manager-iota-mauve.vercel.app',
      githubUrl: 'https://github.com/saman-rar/js-task-manager',
    },
  ];

  for (const project of projectsData) {
    const projectCategories = project.categories.map((cat) => ({
      id: getCategory(cat).id,
    }));
    const projectTechs = project.techs.map((techName) => ({
      id: skills.find((s) => s.name === techName)!.id,
    }));

    await prisma.project.create({
      data: {
        title: project.title,
        image: project.image,
        description: project.description,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        tag: project.tag,
        categories: { connect: projectCategories },
        techs: { connect: projectTechs },
      },
    });
  }

  console.log('✅ Seed finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
