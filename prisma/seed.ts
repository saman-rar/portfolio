import { PrismaClient, Prisma } from '@/lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
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
      name: 'HTML5',
      level: 100,
      years: '3',
      projects: ['GameStation', 'Wedding'],
      category: 'Front-End',
      icon: 'HTML5Icon',
      description_en:
        'HTML5 is the standard web markup language for building modern, semantic, and browser-compatible page structures.',
      description_fa:
        'HTML5 زبان استاندارد نشانه‌گذاری وب برای ساخت ساختار صفحات مدرن، معناگرا و سازگار با مرورگرهای امروزی است.',
    },
    {
      name: 'CSS',
      level: 100,
      years: '3',
      projects: ['GameStation', 'Wedding'],
      category: 'Front-End',
      icon: 'CSSIcon',
      description_en:
        'CSS is the styling language used to design layouts, visual appearance, and responsive user interfaces on the web.',
      description_fa:
        'CSS زبان استایل‌دهی وب برای طراحی ظاهر، چیدمان و واکنش‌گرایی رابط‌های کاربری مدرن است.',
    },
    {
      name: 'Sass',
      level: 100,
      years: '3',
      projects: ['Asia Janebi Shop', 'Task Manager'],
      category: 'Front-End',
      icon: 'SassIcon',
      description_en:
        'A CSS preprocessor that adds variables, nesting, and modularity to write more maintainable stylesheets.',
      description_fa:
        'پیش‌پردازنده CSS برای نوشتن استایل‌های ماژولار، قابل نگهداری و مقیاس‌پذیر.',
    },
    {
      name: 'JavaScript',
      level: 80,
      years: '+2',
      projects: ['Task Manager'],
      category: 'Front-End',
      icon: 'JavaScriptIcon',
      description_en:
        'A versatile programming language that enables dynamic, interactive, and event-driven behavior on the web.',
      description_fa:
        'زبان برنامه‌نویسی پویا برای ایجاد تعامل، منطق و رفتارهای داینامیک در وب.',
    },
    {
      name: 'TypeSript',
      level: 80,
      years: '+2',
      projects: ['Payload Digital Market'],
      category: 'Front-End',
      icon: 'TypeScriptIcon',
      description_en:
        'A strongly typed superset of JavaScript that improves code quality, scalability, and developer productivity.',
      description_fa:
        'نسخه تایپ‌دار جاوااسکریپت برای افزایش کیفیت کد و توسعه‌پذیری پروژه‌ها.',
    },
    {
      name: 'React.js',
      level: 65,
      years: '2',
      projects: ['Asia Janebi Shop'],
      category: 'Front-End',
      icon: 'ReactIcon',
      description_en:
        'A JavaScript library for building fast, reusable, and component-based user interfaces.',
      description_fa:
        'کتابخانه‌ای برای ساخت رابط‌های کاربری سریع، کامپوننت‌محور و قابل استفاده مجدد.',
    },
    {
      name: 'Next.js',
      level: 65,
      years: '2',
      projects: ['Payload Digital Market', 'E-Commerce'],
      category: 'Front-End',
      icon: 'NextIcon',
      description_en:
        'A React framework for production-ready applications with server rendering, routing, and performance optimization.',
      description_fa:
        'فریمورکی مبتنی بر React برای ساخت اپلیکیشن‌های بهینه با رندر سمت سرور و روتینگ پیشرفته.',
    },
    {
      name: 'Zustand, Redux, React Context',
      level: 65,
      years: '2',
      projects: ['Payload Digitla Market', 'Asia Janebi Shop'],
      category: 'Front-End',
      icon: 'ReduxIcon',
      description_en:
        'Libraries and patterns for managing application state efficiently in complex React applications.',
      description_fa:
        'ابزارها و الگوهایی برای مدیریت بهینه state در اپلیکیشن‌های پیچیده React.',
    },
    {
      name: 'Tailwind CSS',
      level: 65,
      years: '2',
      projects: ['Payload Digital Market', 'E-Commerce'],
      category: 'Front-End',
      icon: 'TailwindIcon',
      description_en:
        'A utility-first CSS framework for rapidly building custom and responsive user interfaces.',
      description_fa:
        'فریمورک CSS مبتنی بر utility برای طراحی سریع رابط‌های کاربری سفارشی و واکنش‌گرا.',
    },
    {
      name: 'Git & Github',
      level: 65,
      years: '2',
      projects: [],
      category: 'Tools',
      icon: 'GitIcon',
      description_en:
        'Version control tools for tracking changes, collaborating, and managing code efficiently.',
      description_fa:
        'ابزارهای کنترل نسخه برای مدیریت کد، همکاری تیمی و پیگیری تغییرات.',
    },
    {
      name: 'RESTful APIs',
      level: 65,
      years: '+1',
      projects: ['Github'],
      category: 'Back-End',
      icon: 'RESTfulAPIsIcon',
      description_en:
        'An architectural style for designing scalable and stateless APIs using standard HTTP methods.',
      description_fa:
        'سبک معماری برای طراحی APIهای مقیاس‌پذیر و بدون state بر پایه HTTP.',
    },
    {
      name: 'MongoDb & Mongoose',
      level: 50,
      years: '+1',
      projects: [],
      category: 'Back-End',
      icon: 'MongoDBIcon',
      description_en:
        'A NoSQL database and ODM for modeling and managing flexible, document-based data.',
      description_fa:
        'پایگاه داده NoSQL به‌همراه ODM برای مدیریت داده‌های داکیومنت‌محور و منعطف.',
    },
    {
      name: 'SQL',
      level: 50,
      years: '+1',
      projects: [],
      category: 'Back-End',
      icon: 'SQLIcon',
      description_en:
        'CSS زبان استایل‌دهی وب برای طراحی ظاهر، چیدمان و واکنش‌گرایی رابط‌های کاربری مدرن است.',
      description_fa:
        'SQL زبان استاندارد کوئری برای مدیریت، بازیابی و دستکاری داده‌ها در پایگاه‌های داده رابطه‌ای است.',
    },
    {
      name: 'Prisma',
      level: 50,
      years: '+1',
      projects: [],
      category: 'Back-End',
      icon: 'PrismaIcon',
      description_en:
        'Prisma is a modern ORM that makes database access faster, safer, and more type-safe for developers.',
      description_fa:
        'Prisma یک ORM مدرن برای کار با پایگاه داده است که توسعه را سریع‌تر، ایمن‌تر و تایپ‌محور می‌کند.',
    },
    {
      name: 'Node.js',
      level: 35,
      years: '1',
      projects: [],
      category: 'Back-End',
      icon: 'NodeJsIcon',
      description_en:
        'A JavaScript runtime for building fast and scalable server-side applications.',
      description_fa:
        'محیط اجرای جاوااسکریپت برای ساخت اپلیکیشن‌های سمت سرور سریع و مقیاس‌پذیر.',
    },
    {
      name: 'Express.js',
      level: 15,
      years: '+0',
      projects: [],
      category: 'Back-End',
      icon: 'ExpressIcon',
      description_en:
        'A minimal and flexible Node.js framework for building web APIs and server applications.',
      description_fa:
        'فریمورک سبک و منعطف Node.js برای ساخت API و اپلیکیشن‌های وب.',
    },
    {
      name: 'Nest.js',
      level: 15,
      years: '+0',
      projects: [],
      category: 'Back-End',
      icon: 'NestIcon',
      description_en:
        'A progressive Node.js framework for building scalable, maintainable, and enterprise-grade applications.',
      description_fa:
        'فریمورک پیشرفته Node.js برای ساخت اپلیکیشن‌های ساخت‌یافته و مقیاس‌پذیر.',
    },
    {
      name: 'Payload CMS',
      level: 15,
      years: '+0',
      projects: [],
      category: 'CMS',
      icon: 'PayloadIcon',
      description_en:
        'A modern, headless CMS built with Node.js, offering full control over content and data models.',
      description_fa:
        'CMS هدلس مدرن مبتنی بر Node.js با کنترل کامل روی محتوا و مدل‌های داده.',
    },
  ];
  const skills = await Promise.all(
    skillsData.map((skill) =>
      prisma.skill.upsert({
        where: { name: skill.name },
        update: {},
        create: {
          name: skill.name,
          description_fa: skill.description_fa,
          description_en: skill.description_en,
          icon: skill.icon,
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
      techs: ['JavaScript'],
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
