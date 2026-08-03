<div align="center">
  <img src="./public/professional-developer-avatar.png" alt="Saman Faraji" width="140" />

Saman Faraji — Portfolio

A modern, responsive, bilingual developer portfolio built with Next.js, TypeScript, and Tailwind CSS.



</div>

Overview

This repository contains the web version of Saman Faraji's personal portfolio. It presents profile information, education, projects, technical skills, and contact links through a responsive card-based interface.

The application supports both English and Persian, including correct LTR/RTL layouts, and provides persistent dark and light themes.

Features

English and Persian interfaces

Automatic LTR and RTL layout switching

Dark theme by default with a persistent light/dark toggle

Responsive layout for mobile, tablet, and desktop

Profile sidebar with personal and social information

About, education, portfolio, skills, and contact sections

URL-based active section state using the section query parameter

Project filtering by Front-End and Back-End categories

Dedicated pages for all projects and all technologies

Skill cards with progress levels and experience information

Skill detail modal with related project navigation

Floating language and theme controls

Mobile sticky navigation that reacts to scroll direction

Local project images optimized through the Next.js image component

Vercel Analytics integration

Vazirmatn font for Persian and English content

Main Sections

The main portfolio page contains five sections:

About — biography and development services

Education — education history displayed as a timeline

Portfolio — categorized project cards and external project links

Skills — technical skills, proficiency levels, and related projects

Contact — email, phone, Telegram, LinkedIn, and GitHub links

Included Projects

The current portfolio data includes:

Payload Digital Market

Task Manager

E-Commerce

DigiContents Messenger

Wedding Website

Next.js Blog

Express Shop

Node.js REST API

Project information, screenshots, categories, technologies, live URLs, and repository URLs are stored in lib/portfolio-data.ts.

Technology Stack

Technology

Version in this project

Purpose

Next.js

16.0.10

App Router, routing, rendering, metadata, and image handling

React

18.3.1

Component-based user interface

TypeScript

^5

Static typing and safer development

Tailwind CSS

4.1.9

Utility-first styling and responsive design

PostCSS

^8.5

CSS processing

Lucide React

^0.454.0

Interface and social icons

Vercel Analytics

1.3.1

Deployment analytics

clsx

^2.1.1

Conditional class names

tailwind-merge

^3.3.1

Tailwind class conflict resolution

class-variance-authority

^0.7.1

Reusable component variants

tw-animate-css

1.3.3

Utility animation classes

Routes

Route

Description

/

Redirects to the English portfolio at /en

/en

English main portfolio

/fa

Persian main portfolio

/en/projects

Complete English project list

/fa/projects

Complete Persian project list

/en/techs

Complete English technologies list

/fa/techs

Complete Persian technologies list

The active main-page section can also be selected through the URL:

/en?section=portfolio
/fa?section=skills

Project Structure

portfolio/
├── app/
│   ├── [locale]/
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   ├── techs/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── about-section.tsx
│   ├── contact-section-new.tsx
│   ├── floating-pill.tsx
│   ├── mobile-sticky-nav.tsx
│   ├── portfolio-card.tsx
│   ├── portfolio-section.tsx
│   ├── profile-sidebar.tsx
│   ├── project-card.tsx
│   ├── projects-section.tsx
│   ├── resume-section.tsx
│   ├── skill-card.tsx
│   ├── skill-icons.tsx
│   ├── skill-modal.tsx
│   ├── skills-tab-section.tsx
│   ├── tech-card.tsx
│   └── tech-section.tsx
├── hooks/
│   └── use-media-query.ts
├── lib/
│   ├── portfolio-data.ts
│   └── utils.ts
├── public/
│   ├── professional-developer-avatar.png
│   └── project images...
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── tsconfig.json

Getting Started

Prerequisites

Install the following before running the project:

Node.js 20.9.0 or newer

npm, pnpm, or another compatible Node.js package manager

Git, when cloning from the repository

No environment variables, database, or external API configuration are currently required.

Clone the Repository

git clone https://github.com/saman-rar/portfolio.git
cd portfolio

Install Dependencies

Using npm:

npm install

Or using pnpm:

pnpm install

The repository contains both package-lock.json and pnpm-lock.yaml. Choose one package manager for your local workflow and avoid switching between them without regenerating the appropriate lock file.

Start the Development Server

npm run dev

Open the following address in your browser:

http://localhost:3000

The root page redirects automatically to:

http://localhost:3000/en

Available Scripts

Command

Description

npm run dev

Starts the Next.js development server

npm run build

Creates a production build

npm run start

Runs the production server after building

npm run lint

Runs ESLint across the project

Production Build

npm run build
npm run start

Customization

Personal Information

Edit profile information, contact links, biography, education, projects, skills, and categories in:

lib/portfolio-data.ts

This file is the central source of portfolio content.

Images

Place profile and project images inside:

public/

Then reference each image from lib/portfolio-data.ts with a root-relative path:

image: '/my-project.png'

Colors and Theme

The light and dark color tokens are defined in:

app/globals.css

The interface uses CSS custom properties with OKLCH colors, including:

--background

--foreground

--card

--secondary

--muted-foreground

--accent

--border

The selected theme is saved in browser localStorage under the key theme.

Languages

English and Persian content is currently stored directly in the data and components. Locale-based routes are implemented through the app/[locale] directory.

When adding another language, update:

Locale validation in route pages

Section labels in app/[locale]/page.tsx

Localized fields in lib/portfolio-data.ts

Direction logic for LTR or RTL rendering

Metadata

Update the site title, description, icons, and analytics settings in:

app/layout.tsx

Deployment

Vercel

The project is designed for straightforward deployment to Vercel:

Push the repository to GitHub.

Import the repository into Vercel.

Keep the framework preset set to Next.js.

Deploy the project.

No environment variables are required for the current version.

Other Node.js Hosts

Any hosting provider that supports Node.js and Next.js production builds can run the project with:

npm run build
npm run start

Production Notes

The current next.config.mjs contains these settings:

typescript: {
  ignoreBuildErrors: true,
},
images: {
  unoptimized: true,
},

For a stricter production workflow, consider resolving all TypeScript errors and then removing ignoreBuildErrors: true. If the deployment platform supports image optimization, also review whether unoptimized: true is still necessary.

Run these checks before deployment:

npm run lint
npm run build

License

The source code is available under the terms described in LICENSE.md.

The MIT License applies to the source code. Personal information, portfolio text, profile imagery, project screenshots, logos, and other identity-specific assets are not granted for unrestricted reuse unless you have explicit permission from the owner.

Author

Saman Faraji

GitHub: saman-rar

LinkedIn: Saman-rar

Email: samanfaraji1384@gmail.com

Telegram: saman_rar
