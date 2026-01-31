export const profileData = {
  name: 'Saman Faraji',
  title: 'Front-End Developer',
  avatar: '/professional-developer-avatar.png',
  email: 'samanfaraji1384@gmail.com',
  phone: '+989193974595',
  telegram: 'Saman_rar',
  birthday: 'November 10, 2005',
  university: {
    name: 'Qom Uni',
    link: 'https://www.qom.ac.ir/',
  },
  social: {
    github: 'https://github.com/saman-rar',
    linkedin: 'https://www.linkedin.com/in/saman-rar',
  },
};

export const aboutData = {
  description: [
    "I'm a Front-End Developer with a solid knowledge in Back-End specializing in web development and creating innovative digital solutions. I enjoy turning complex problems into simple, beautiful and intuitive applications.",
    "My job is to build your website or application so that it is functional and user-friendly but at the same time attractive. Moreover, I add personal touch to your product and make sure that is eye-catching and easy to use. My aim is to bring across your message and identity in the most creative way. I've worked with various technologies including React, Next.js, Node.js, and modern cloud platforms.",
  ],
  services: [
    {
      icon: 'Code',
      title: 'Frontend Development',
      description:
        'Building modern, responsive web applications with React, Next.js, and TypeScript.',
    },
    {
      icon: 'Zap',
      title: 'Backend Development',
      description:
        'Creating robust APIs and server-side solutions with Node.js and modern frameworks.',
    },
  ],
};

export const resumeData = {
  education: [
    {
      title: 'University of Qom',
      period: '2024 — now',
      description: 'Studing Computer Engineering.',
    },
  ],

  skills: [
    {
      name: 'HTML5 & CSS',
      level: 100,
      yearsOfExperience: '3',
      projects: ['GameStation', 'Wedding'],
    },
    {
      name: 'Sass',
      level: 100,
      yearsOfExperience: '3',
      projects: ['Asia Janebi Shop', 'Task Manager'],
    },
    {
      name: 'Javascript',
      level: 80,
      yearsOfExperience: '+2',
      projects: ['Task Manager'],
    },
    {
      name: 'Typescript',
      level: 80,
      yearsOfExperience: '+2',
      projects: ['Payload Digital Market'],
    },
    {
      name: 'React.js',
      level: 65,
      yearsOfExperience: '2',
      projects: ['Asia Janebi Shop'],
    },
    {
      name: 'Next.js',
      level: 65,
      yearsOfExperience: '2',
      projects: ['Payload Digital Market', 'E-Commerce'],
    },
    {
      name: 'React State Managements',
      level: 65,
      yearsOfExperience: '2',
      projects: ['Payload Digitla Market', 'Asia Janebi Shop'],
    },
    {
      name: 'Tailwind Css',
      level: 65,
      yearsOfExperience: '2',
      projects: ['Payload Digital Market', 'E-Commerce'],
    },
    { name: 'Git & Github', level: 65, yearsOfExperience: '2' },
    {
      name: 'RESTful APIs',
      level: 65,
      yearsOfExperience: '+1',
      projects: ['Github'],
    },
    {
      name: 'MongoDb & Mongoose',
      level: 50,
      yearsOfExperience: '+1',
      projects: [],
    },
    { name: 'PostgreSQL & Prisma', level: 50, yearsOfExperience: '+1' },
    { name: 'Node.js', level: 35, yearsOfExperience: '1' },
    { name: 'Express.js', level: 15, yearsOfExperience: '+0' },
    { name: 'Nest.js', level: 15, yearsOfExperience: '+0' },
    { name: 'Payload CMS', level: 15, yearsOfExperience: '+0' },
  ],
};

export const portfolioData = {
  categories: resumeData.skills.map((skill) => skill.name),
  projects: [
    {
      title: 'E-Commerce',
      category: 'React Redux',
      image: '/modern-ecommerce-website.png',
      description:
        'Headphone and earpuds ui shop with redux state management and shopping cart.',
      techs: ['React.js', 'redux', 'React State Management'],
      liveUrl: 'https://redux-shop-ashen-tau.vercel.app',
      githubUrl: 'https://github.com/saman-rar/redux-shop',
    },
    {
      title: 'DigiContents Messenger',
      category: 'Next.js',
      image: '/messenger-interface.png',
      description: '',
      techs: ['Next.js', 'Typescript'],
      liveUrl: 'https://messenger-sigma-eight.vercel.app',
      githubUrl: 'https://github.com/saman-rar/digicontents-messenger',
    },
    {
      title: 'Task Manager',
      category: 'Javascript',
      image: '/task-management-interface.png',
      description: 'Collaborative task manager with real-time updates',
      techs: ['Javascript'],
      liveUrl: 'https://task-manager-iota-mauve.vercel.app',
      githubUrl: 'https://github.com/saman-rar/js-task-manager',
    },
    {
      title: 'Digital Market',
      category: 'Next.js - Payload CMS',
      image: '/restaurant-website-design.png',
      description: 'Elegant restaurant website with online ordering',
      techs: ['Next.js', 'Sanity CMS', 'Stripe'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/johndoe/restaurant',
    },
    {
      title: 'Next.js Blog',
      category: 'Next.js',
      image: '/next-blog-interface.png',
      description: 'Next.js Blog.',
      techs: ['Next.js'],
      liveUrl: 'https://next-blog-project.vercel.app',
      githubUrl: 'https://github.com/saman-rar/nextjs-blog-project',
    },
    {
      title: 'Next.js Blog',
      category: 'Next.js',
      image: '/next-blog-interface.png',
      description: '',
      techs: ['Next.js'],
      liveUrl: 'https://next-blog-project.vercel.app',
      githubUrl: 'https://github.com/saman-rar/nextjs-blog-project',
    },
    {
      title: 'Wedding Website',
      category: 'HTML5 & CSS',
      image: '/wedding-website-interface.png',
      description: '',
      techs: ['HTML5 & CSS'],
      liveUrl: 'https://wedding-website-three-kappa.vercel.app',
      githubUrl: 'https://github.com/saman-rar/wedding-website',
    },
  ],
};

export const contactData = {
  email: 'john@example.com',
  phone: '+989193974595',
  telegram: 'saman_rar',
  github: {
    name: 'Saman-rar',
    link: 'https://github.com/saman-rar/',
  },
  linkedin: {
    name: 'Saman-rar',
    link: 'https://www.linkedin.com/in/saman-rar/',
  },
};
