import { Github, Linkedin, Mail, Phone, Send } from 'lucide-react';

export const profileData = {
  enName: 'Saman Faraji',
  faName: 'سامان فرجی',
  enTitle: 'Front-End Developer',
  faTitle: 'برنامه‌نویس فرانت‌اند',
  avatar: '/professional-developer-avatar.png',
  email: 'samanfaraji1384@gmail.com',
  enBirthday: 'November 10, 2005',
  faBirthday: '19 آبان 1384',
  enEducation: 'Computer science',
  faEducation: 'مهندسی کامپیوتر',
  options: [
    {
      enLabel: 'Email',
      faLabel: 'ایمیل',
      title: 'samanfaraji1384@gmail.com',
      Icon: Mail,
      get href() {
        return `mailto:${this.title}`;
      },
    },
    {
      enLabel: 'Phone',
      faLabel: 'شماره همراه',
      title: '+989193974595',
      Icon: Phone,
      get href() {
        return `tel:${this.title.replace(/\s/g, '')}`;
      },
    },
    // {
    //   enLabel: 'Telegram',
    //   faLabel: 'تلگرام',
    //   title: 'Saman_rar',
    //   Icon: Send,
    //   get href() {
    //     return `https://t.me/${this.title}`;
    //   },
    // },
    {
      enLabel: 'Linkedin',
      faLabel: 'لینکدین',
      title: 'Saman-rar',
      Icon: Linkedin,
      get href() {
        return `https://www.linkedin.com/in/${this.title}`;
      },
    },
    {
      enLabel: 'Github',
      faLabel: 'گیتهاب',
      title: 'Saman-rar',
      Icon: Github,
      get href() {
        return `https://github.com/${this.title}`;
      },
    },
  ],

  social: [
    {
      Icon: Mail,
      href: 'mailto:samanfaraji1384@gmail.com',
    },
    {
      Icon: Linkedin,
      href: 'https://www.linkedin.com/in/saman-rar',
    },
    {
      Icon: Github,
      href: 'https://github.com/saman-rar',
    },
    {
      Icon: Send,
      href: `https://t.me/saman_rar`,
    },
  ],
};

export const faProfileData = {
  name: 'سامان فرجی',
  title: 'برنامه‌نویس فرانت‌اند',
  avatar: '/professional-developer-avatar.png',
  email: 'samanfaraji1384@gmail.com',
  phone: '+989193974595',
  telegram: 'Saman_rar',
  birthday: '19 آبان 1384',
  university: {
    name: 'دانشگاه بین المللی قم',
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

export const faAboutData = {
  description: [
    'من یک توسعه‌دهنده فرانت‌اند هستم که دانش خوبی در بک‌اند هم دارم و در توسعه وب و خلق راه‌حل‌های دیجیتال نوآورانه تخصص دارم. از ساده کردن مسائل پیچیده و تبدیل آن‌ها به اپلیکیشن‌های زیبا و کاربرپسند لذت می‌برم.',
    'کار من ساخت وب‌سایت یا اپلیکیشن شما به گونه‌ای است که هم کاربردی و کاربرپسند باشد و هم جذاب. علاوه بر این، به محصول شما جلوه‌ای شخصی می‌دهم و مطمئن می‌شوم که هم چشم‌نواز و هم ساده برای استفاده باشد. هدفم انتقال پیام و هویت شما به خلاقانه‌ترین شکل ممکن است. من با فناوری‌های مختلفی از جمله React، Next.js، Node.js و پلتفرم‌های مدرن ابری کار کرده‌ام.',
  ],
  services: [
    {
      icon: 'Code',
      title: 'توسعه فرانت‌اند',
      description:
        'ساخت برنامه‌های وب مدرن و واکنش‌گرا با React، Next.js و TypeScript.',
    },
    {
      icon: 'Zap',
      title: 'توسعه بک‌اند',
      description:
        'ایجاد APIهای قدرتمند و راه‌حل‌های سمت سرور با Node.js و فریم‌ورک‌های مدرن.',
    },
  ],
};

export const educationData = {
  education: [
    {
      title: 'University of Qom',
      period: '2024 — now',
      description: 'Studing Computer Engineering.',
    },
  ],
};

export const faEducationData = {
  education: [
    {
      title: 'دانشگاه بین المللی قم',
      period: '1403 — الان',
      description: 'رشته مهندسی کامپیوتر',
    },
  ],
};

export const contactData = [
  {
    enLabel: 'Email',
    faLabel: 'ایمیل',
    title: 'samanfaraji1384@gmail.com',
    Icon: Mail,
    get href() {
      return `mailto:${this.title}`;
    },
  },
  {
    enLabel: 'Phone',
    faLabel: 'شماره همراه',
    title: '+989193974595',
    Icon: Phone,
    get href() {
      return `tel:${this.title.replace(/\s/g, '')}`;
    },
  },
  {
    enLabel: 'Telegram',
    faLabel: 'تلگرام',
    title: 'Saman_rar',
    Icon: Send,
    get href() {
      return `https://t.me/${this.title}`;
    },
  },
  {
    enLabel: 'Linkedin',
    faLabel: 'لینکدین',
    title: 'Saman-rar',
    Icon: Linkedin,
    get href() {
      return `https://www.linkedin.com/in/${this.title}`;
    },
  },
  {
    enLabel: 'Github',
    faLabel: 'گیتهاب',
    title: 'Saman-rar',
    Icon: Github,
    get href() {
      return `https://github.com/${this.title}`;
    },
  },
];

export const projects = [
  {
    id: 1,
    title: 'Task Manager',
    image: '/task-management-interface.png',
    description: 'Collaborative task manager with real-time update.',
    liveUrl: 'https://task-manager-iota-mauve.vercel.app',
    githubUrl: 'https://github.com/saman-rar/js-task-manager',
    tag: 'JavaScript',
    techs: ['Sass', 'JavaScript'],
    categories: [
      {
        id: 1,
        name: 'Front-End',
      },
    ],
  },
  {
    id: 2,
    title: 'E-Commerce',
    image: '/modern-ecommerce-website.png',
    description:
      'Headphone and earpuds ui shop with redux state management and shopping cart.',
    liveUrl: 'https://redux-shop-ashen-tau.vercel.app',
    githubUrl: 'https://github.com/saman-rar/redux-shop',
    tag: 'React Redux',
    techs: ['React.js', 'Zustand'],
    categories: [
      {
        id: 1,
        name: 'Front-End',
      },
    ],
  },
  {
    id: 3,
    title: 'DigiContents Messenger',
    image: '/messenger-interface.png',
    description: 'Popular-messenger ui like with modern features. ',
    liveUrl: 'https://messenger-sigma-eight.vercel.app',
    githubUrl: 'https://github.com/saman-rar/digicontents-messenger',
    tag: 'Next.js',
    techs: ['TypeScript', 'Next.js'],
    categories: [
      {
        id: 1,
        name: 'Front-End',
      },
    ],
  },
  {
    id: 4,
    title: 'Wedding Website',
    image: '/wedding-website-interface.png',
    description:
      'Single page website for planning wedding ceremony and booking hotel with modern features only using Html and CSS.',
    liveUrl: 'https://wedding-website-three-kappa.vercel.app',
    githubUrl: 'https://github.com/saman-rar/wedding-website',
    tag: 'HTML5 & CSS',
    techs: ['HTML5', 'CSS'],
    categories: [
      {
        id: 1,
        name: 'Front-End',
      },
    ],
  },
  {
    id: 5,
    title: 'Next.js Blog',
    image: '/next-blog-interface.png',
    description: 'Blog Website created with next.js framework.',
    liveUrl: 'https://next-blog-project.vercel.app',
    githubUrl: 'https://github.com/saman-rar/nextjs-blog-project',
    tag: 'Next.js',
    techs: ['Sass', 'Next.js'],
    categories: [
      {
        id: 1,
        name: 'Front-End',
      },
    ],
  },
  {
    id: 7,
    title: 'Express Shop',
    image: '/express-shop.png',
    description: 'Online shop created by Express.js with views.',
    githubUrl: 'https://github.com/saman-rar/nodejs-restapi',
    tag: 'Express.js',
    techs: ['Express', 'Node.js'],
    categories: [
      {
        id: 1,
        name: 'Back-End',
      },
    ],
  },
  {
    id: 6,
    title: 'Node.js REST API',
    image: '/rest-api.webp',
    description: 'Rest API created with Express.js',
    githubUrl: 'https://github.com/saman-rar/nodejs-restapi',
    tag: 'Express.js',
    techs: ['Express', 'Node.js'],
    categories: [
      {
        id: 1,
        name: 'Back-End',
      },
    ],
  },
];

export const techs = [
  {
    name: 'HTML5',
    level: 100,
    yearsOfExperience: '3',
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
    yearsOfExperience: '3',
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
    yearsOfExperience: '3',
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
    yearsOfExperience: '+2',
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
    yearsOfExperience: '+2',
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
    yearsOfExperience: '2',
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
    yearsOfExperience: '2',
    projects: ['E-Commerce'],
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
    yearsOfExperience: '2',
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
    yearsOfExperience: '2',
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
    yearsOfExperience: '2',
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
    yearsOfExperience: '+1',
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
    yearsOfExperience: '+1',
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
    yearsOfExperience: '+1',
    projects: [],
    category: 'Back-End',
    icon: 'SQLIcon',
    description_en:
      'SQL is the standard query language used for managing, retrieving, and manipulating data in relational databases.',
    description_fa:
      'SQL زبان استاندارد کوئری برای مدیریت، بازیابی و دستکاری داده‌ها در پایگاه‌های داده رابطه‌ای است.',
  },
  {
    name: 'Prisma',
    level: 50,
    yearsOfExperience: '+1',
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
    yearsOfExperience: '1',
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
    yearsOfExperience: '+0',
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
    yearsOfExperience: '+0',
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
    yearsOfExperience: '+0',
    projects: [],
    category: 'CMS',
    icon: 'PayloadIcon',
    description_en:
      'A modern, headless CMS built with Node.js, offering full control over content and data models.',
    description_fa:
      'CMS هدلس مدرن مبتنی بر Node.js با کنترل کامل روی محتوا و مدل‌های داده.',
  },
];

export const categories = [
  {
    id: 0,
    name: 'All',
    projects,
  },
  {
    id: 1,
    name: 'Front-End',
    projects: [
      {
        id: 1,
        title: 'Task Manager',
        image: '/task-management-interface.png',
        description: 'Collaborative task manager with real-time update.',
        liveUrl: 'https://task-manager-iota-mauve.vercel.app',
        githubUrl: 'https://github.com/saman-rar/js-task-manager',
        tag: 'JavaScript',
        techs: ['Sass', 'JavaScript'],
        categories: [
          {
            id: 1,
            name: 'Front-End',
          },
        ],
      },
      {
        id: 2,
        title: 'E-Commerce',
        image: '/modern-ecommerce-website.png',
        description:
          'Headphone and earpuds ui shop with redux state management and shopping cart.',
        liveUrl: 'https://redux-shop-ashen-tau.vercel.app',
        githubUrl: 'https://github.com/saman-rar/redux-shop',
        tag: 'React Redux',
        techs: ['React.js', 'Zustand'],
        categories: [
          {
            id: 1,
            name: 'Front-End',
          },
        ],
      },
      {
        id: 3,
        title: 'DigiContents Messenger',
        image: '/messenger-interface.png',
        description: 'Popular-messenger ui like with modern features. ',
        liveUrl: 'https://messenger-sigma-eight.vercel.app',
        githubUrl: 'https://github.com/saman-rar/digicontents-messenger',
        tag: 'Next.js',
        techs: ['TypeScript', 'Next.js'],
        categories: [
          {
            id: 1,
            name: 'Front-End',
          },
        ],
      },
      {
        id: 4,
        title: 'Wedding Website',
        image: '/wedding-website-interface.png',
        description:
          'Single page website for planning wedding ceremony and booking hotel with modern features only using Html and CSS.',
        liveUrl: 'https://wedding-website-three-kappa.vercel.app',
        githubUrl: 'https://github.com/saman-rar/wedding-website',
        tag: 'HTML5 & CSS',
        techs: ['HTML5', 'CSS'],
        categories: [
          {
            id: 1,
            name: 'Front-End',
          },
        ],
      },
      {
        id: 5,
        title: 'Next.js Blog',
        image: '/next-blog-interface.png',
        description: 'Blog Website created with next.js framework.',
        liveUrl: 'https://next-blog-project.vercel.app',
        githubUrl: 'https://github.com/saman-rar/nextjs-blog-project',
        tag: 'Next.js',
        techs: [
          {
            id: 3,
            name: 'Sass',
            icon: 'SassIcon',
            description_en:
              'A CSS preprocessor that adds variables, nesting, and modularity to write more maintainable stylesheets.',
            description_fa:
              'پیش‌پردازنده CSS برای نوشتن استایل‌های ماژولار، قابل نگهداری و مقیاس‌پذیر.',
            categoryId: 1,
            level: 100,
            yearsOfExperience: '3',
            status: 'Advanced',
          },
          {
            id: 7,
            name: 'Next.js',
            icon: 'NextIcon',
            description_en:
              'A React framework for production-ready applications with server rendering, routing, and performance optimization.',
            description_fa:
              'فریمورکی مبتنی بر React برای ساخت اپلیکیشن‌های بهینه با رندر سمت سرور و روتینگ پیشرفته.',
            categoryId: 1,
            level: 65,
            yearsOfExperience: '2',
            status: 'Intermediate',
          },
        ],
        categories: [
          {
            id: 1,
            name: 'Front-End',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Back-End',
    projects: [
      {
        id: 6,
        title: 'Node.js REST API',
        image: '/rest-api.webp',
        description: 'Rest API created with Express.js',
        githubUrl: 'https://github.com/saman-rar/nodejs-restapi',
        tag: 'Express.js',
        techs: ['Express', 'Node.js'],
        categories: [
          {
            id: 1,
            name: 'Back-End',
          },
        ],
      },
      {
        id: 7,
        title: 'Express Shop',
        image: '/express-shop.png',
        description: 'Online shop created by Express.js with views.',
        githubUrl: 'https://github.com/saman-rar/nodejs-restapi',
        tag: 'Express.js',
        techs: ['Express', 'Node.js'],
        categories: [
          {
            id: 1,
            name: 'Back-End',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Tools',
    projects: [],
  },
  {
    id: 4,
    name: 'CMS',
    projects: [],
  },
];
