import React from "react";
import styles from "./Projects.module.css";
import MainContainer from "../layout/MainContainer";
import Project from "./Project";

const projects = [
  {
    number: "1",
    title: "BahaaHelmy.com – Legal Website & Content Management Platform",
    links: [
      {
        href: "https://github.com/emadunan/bahaahelmy",
        label: "💻 GitHub Repository",
      },
      {
        href: "https://bahaahelmy.com",
        label: "🌐 Live Website",
      },
    ],
    overview: `BahaaHelmy.com is an Arabic-first legal website and content management platform developed for Dr. Bahaa Helmy. It gives visitors a responsive, structured way to explore legal articles, publications, educational videos, professional services, and biographical information, as well as submit private consultation requests. A protected administration area enables authorized users to manage the site's content, users, featured items, and consultation workflow. I designed and developed the full platform, including its public experience, server-side application logic, database model, authentication, content migration, and production deployment.`,
    features: [
      "Arabic-first legal content with responsive public pages.",
      "Articles, publications, and videos with featured ordering.",
      "Secure consultation requests and status management.",
      "Role-protected CMS for users and content administration.",
      "Legacy WordPress content import and image processing tools.",
    ],
    technologies: [
      "Next.js", "React", "TypeScript", "Server Actions", "Prisma", "PostgreSQL",
      "NextAuth.js", "React Markdown", "Sharp", "CSS Modules", "Ubuntu", "Nginx", "PM2"
    ],
  },
  {
    number: "2",
    title: "Inventory Demo – Inventory & Sales Management Platform",
    links: [
      {
        href: "https://github.com/emadunan/inventory",
        label: "💻 GitHub Repository",
      },
      {
        href: "https://inventory-demo.emadunan.com",
        label: "🌐 Live Demo",
      },
    ],
    overview: `Inventory Demo is a full-stack inventory, sales, and purchasing management platform designed for businesses operating across multiple branches and stock locations. It provides role-specific workflows for sales staff, inventory managers, and administrators while maintaining a detailed audit trail of stock movement and payment activity. The system supports bilingual Arabic and English interfaces, product variants and barcodes, supplier management, inter-location transfers, stock counts, adjustments, returns, and branch-level reporting. I architected and developed the complete platform, including the React client, NestJS API, shared domain package, PostgreSQL data model, authentication, authorization, testing, and deployment.`,
    features: [
      "Sales, purchases, returns, payments, and supplier workflows.",
      "Multi-location stock transfers, counts, and adjustments.",
      "Product variants, barcode scanning, and label generation.",
      "Role- and permission-based access with secure sessions.",
      "Arabic/English UI with branch sales and stock audit reports.",
    ],
    technologies: [
      "React", "Vite", "TypeScript", "Redux Toolkit", "NestJS", "TypeORM",
      "PostgreSQL", "Passport.js", "JWT Auth", "i18next", "Jest", "CSS Modules", "Ubuntu", "Nginx", "PM2"
    ],
  },
  {
    number: "3",
    title: "Amen24.org – Multilingual Bible & Christian Library Platform",
    links: [
      {
        href: "https://github.com/emadunan/amen24",
        label: "💻 GitHub Repository",
      },
      {
        href: "https://play.google.com/store/apps/details?id=yeshua.emadunan.amen24",
        label: "📱 Android App on Google Play",
      },
      {
        href: "https://amen24.org",
        label: "🌐 Live Website",
      },
    ],
    overview: `Amen24.org is a multilingual Christian platform that delivers searchable Bible content, a glossary of theological terms, and a curated digital library through a modern and accessible interface. Authenticated users can save reading progress, manage favorites, and customize their experience across devices. A dual-language display mode supports in-depth study and translation comparison. Built with scalability and internationalization in mind, the platform balances performance with ease of use. I serve as the sole developer and system architect, overseeing the entire technical stack, infrastructure, and ongoing development, while content is managed by a dedicated team of moderators.`,
    features: [
      "Multilingual Bible with intuitive chapter browsing.",
      "Powerful keyword-based Bible search engine.",
      "Glossary of biblical terms with admin CRUD access.",
      "Christian book library with Markdown-based content.",
      "Role-based admin moderation via the admin panel.",
    ],
    technologies: [
      "Next.js", "React", "Redux Toolkit", "NestJS", "TypeORM", "PostgreSQL",
      "Passport.js", "i18next", "React Native", "Expo",
      "SQLite", "OpenAI API", "Sharp", "Multer", "JWT Auth", "Ubuntu", "Nginx", "Github Actions"
    ],
  },
  {
    number: "4",
    title: "Al-Atas.org – Family Heritage Platform",
    links: [
      {
        href: "https://github.com/emadunan/alatas",
        label: "💻 GitHub Repository",
      },
      {
        href: "https://al-atas.org",
        label: "🌐 Live Website",
      },
    ],
    overview: `Al-atas.org is a private family heritage platform designed to digitally preserve and visualize the full genealogy of the Atas family through an interactive family tree interface. The system allows registered members to explore relationships, view individual profiles, and trace lineage across generations in a structured and user-friendly format. A secure admin panel enables authorized super users to manage the family database, including adding new members, updating personal information, and maintaining accurate family relationships. Built with a modern full-stack architecture, the platform focuses on data integrity, access control, and long-term maintainability, providing a reliable digital reference for a large and growing community.`,
    features: [
      "Interactive family tree with hierarchical navigation.",
      "Member profiles showing personal and relationship info.",
      "Secure auth system with role-based access control.",
      "Admin panel to add/edit members and genealogy data.",
      "Manage parent-child links with database validation.",
    ],
    technologies: [
      "React", "Redux Toolkit", "NestJS", "TypeORM", "PostgreSQL", "Passport.js", "JWT Auth", "Ubuntu", "Nginx", "Github Actions"
    ],
  },
  {
    number: "5",
    title: "Emadunan.com – Personal Portfolio",
    links: [
      {
        href: "https://github.com/emadunan/website",
        label: "💻 GitHub Repository",
      },
      {
        href: "https://emadunan.com",
        label: "🌐 Live Website",
      },
    ],
    overview: `EmadUnan.com is my personal portfolio and professional showcase, designed to highlight my experience, skills, and technical work in a modern, responsive web interface. Built with Next.js and TypeScript, the site presents my background, a curated list of projects, selected blog posts, and contact information in a clean and accessible layout. With a focus on performance, responsive design, and semantic structure, the portfolio serves as both a personal brand platform and a technical demonstration of my frontend engineering capabilities. I handled the full design and development, optimizing for SEO and usability across devices.`,
    features: [
      "Responsive UI showing skills, experience, and projects.",
      "Next.js static site with optimized routing and speed.",
      "Contact section with email and social links.",
      "SEO-friendly structure with clean markup and assets.",
      "Showcased professional blog and qualifications.",
    ],
    technologies: [
      "Next.js", "React", "TypeScript", "CSS Modules", "SEO Optimization", "Responsive Design", "Github Actions", "Ubuntu", "Nginx"
    ],
  },
  {
    number: "6",
    title: "MOI.gov.eg – Egyptian Ministry of Interior Portal",
    links: [
      {
        href: "https://moi.gov.eg",
        label: "🌐 Live Website",
      },
    ],
    overview: `The official digital portal of the Egyptian Ministry of Interior, providing critical public access to ministry news, media content, e-services, and internal sector subsites. The platform serves millions of users across Egypt, offering real-time updates, public safety announcements, and secure citizen services such as traffic, ID, and passport applications. As the technical lead, I oversee a cross-functional team delivering a unified web and mobile experience, ensuring high availability, security compliance, and seamless coordination across multiple departments.`,
    features: [
      "Central portal for Ministry news and public announcements.",
      "Dynamic media center with videos and press content.",
      "Subsites for ministry sectors with modular content delivery.",
      "Mobile integration via Android and iOS with shared APIs.",
      "Public e-services for secure citizen interaction.",
    ],
    technologies: [
      "SQL Server", "SharePoint", ".NET", "IIS", "Javascript", "Typescript", "Angular", "C#", "Swift", "Java", "Windows Server"
    ],
  },
  {
    number: "7",
    title: "Internal Secure Git Server & DevOps Automation",
    links: [],
    overview: `Built a centralized internal Git server using Gitea and Docker on Ubuntu, transforming 
isolated developer workflows into a secure, collaborative version control environment. Automated 
daily backups via Bash + cron and validated disaster recovery by restoring all repositories to a test server. 
Applied Agile concepts using GitHub Projects to track user stories, milestones, and team organization.`,
    features: [
      "Secure internal Git server for centralized collaboration.",
      "RBAC for organizations and teams controlling access.",
      "Automated daily backups with disaster recovery drills.",
      "Track Agile stories and milestones using GitHub Projects.",
      "Dockerized deployment on Ubuntu for scalable operations."
    ],
    technologies: [
      "Git", "Gitea", "Docker", "Ubuntu", "Bash", "Cron", "RBAC", "CI/CD"
    ],
  },
  {
    number: "8",
    title: "Confidential Police Systems",
    links: [],
    overview: `Confidential internal systems developed for law enforcement agencies to manage secure operational and administrative processes. These platforms support mission-critical functions such as case handling, personnel workflows, and internal communications — all under strict national security protocols. While the technical details remain classified, my role included architecting and developing components within highly secure environments, adhering to government standards for data protection, access control, and system resilience.`,
    features: [
      "Secure law enforcement tools",
      "Critical internal infrastructure",
      "Multi-level access control",
      "Government IT compliance",
      "Classified development workflows",
    ],
    technologies: ["Python", "C++", "C#", ".NET", "SQL Server", "Angular", "React", "Redux Toolkit", "NestJS", "PostgreSQL", "TypeORM", "Prisma", "JWT Auth", "Ubuntu", "Nginx", "Docker", "Sqlite", "Kali", "OSINT tools"],
  },
];

const Projects: React.FC = () => {
  return (
    <MainContainer>
      <section className={styles.projects} id="projects">
        <h2 className={styles.title}>Projects</h2>

        {projects.map((project) => (
          <Project key={project.number} item={project} />
        ))}
      </section>
    </MainContainer>
  );
};

export default Projects;
