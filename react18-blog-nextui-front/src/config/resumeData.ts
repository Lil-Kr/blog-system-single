import { ResumeData } from '@/types/resume/resumeTypes'

export const resumeData: ResumeData = {
  basicInfo: {
    name: 'CHESTER CHEN',
    title: 'Full-Stack Developer',
    email: 'cxqybox@gmail.com',
    location: 'GZ, GuangDong, China(UTC+8)',
    website: 'https://web.lilkbox.tech',
    github: 'https://github.com/Lil-Kr',
    avatar: 'https://web.lilkbox.tech/upload/image/%E6%B5%81%E5%B7%9D%E6%9E%AB-1_1915216468627296256.webp'
  },
  summarys: [
    "I'm a Full-Stack Developer with 7 years of professional experience - including over 4 years in Java backend development and more than 3 years working with the React.js tech stack. I also have 3 years of remote work experience. I`m highly proficient in the Spring Framework ecosystem and experienced in building distributed systems using Spring Cloud. On the frontend, I have hands-on expertise with modern technologies like React.js, TypeScript, CSS, and HTML. This website itself is built using React.js and Java/Spring Boot — technologies I know inside and out. I have a solid grasp of core data structures and algorithms, and I`m experienced with both relational databases and popular NoSQL solutions. I`m also actively deepening my knowledge of core computer science fundamentals, including operating systems, the TCP/IP protocol stack, and database theory. With this skill set, I can design and build any web application or service from the ground up. I`m passionate about delivering high-performance, user-friendly solutions that provide exceptional user experiences."
  ],
  skills: {
    frontend: ['ReactJS', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Zustand', 'Vite'],
    backend: [
      'Java',
      'Srping Framework',
      'Srping Boot',
      'Srping Cloud / Alibaba',
      'Mybatis / JPA',
      'MySQL',
      'PostgreSQL',
      'Microsoft SQL Server',
      'MongoDB',
      'Redis',
      'Elasticsearch',
      'Docker',
      'Nginx'
    ],
    systems: ['Linux', 'MacOS', 'Windows'],
    tools: ['IntelliJ IDEA', 'VS Code', 'Git', 'Postman', 'Eclipse', 'ESLint', 'Prettier'],
    other: ['Zoom', 'Google Meeting', 'Teams', 'Slack'],
    soft: ['Agile/Scrum']
  },
  highlights: [
    'Experienced in developing distributed systems using Java, Spring Framework, Spring Boot, and Spring Cloud (IoC/DI, AOP, Eureka/Nacos, OpenFeign).',
    'Strong foundation in core data structures and algorithms.',
    'Familiar with ORM frameworks including MyBatis, MyBatis-Plus, and JPA.',
    'Solid understanding of Java Virtual Machine (JVM) internals, including Garbage Collection (GC) mechanisms.',
    'Familiar with MySQL and PostgreSQL, with in-depth knowledge of locking mechanisms, indexing, and transaction management.',
    'Familiar with distributed system middleware such as Redis, MongoDB, Elasticsearch, Kafka, and RocketMQ.',
    'Familiar with HTML5, CSS3, and JavaScript/TypeScript, with expertise in Flexbox layout and practical experience using Tailwind CSS.',
    'Experienced in building front-end applications with React.js; familiar with back-end development using Nest.js.',
    'Experienced in Linux command-line operations and deploying full-stack applications; hands-on experience with Docker and Docker Compose.',
    'Knowledgeable in Maven and Gradle build tools, with strong Git workflow practices; capable of both independent development and collaborative teamwork.',
    'Active participant in Agile development teams, with a solid understanding of Agile methodologies and workflows.'
  ],
  experience: [
    {
      company: 'GZ HSBC BANK Co., Ltd.',
      position: 'Java Backend Developer / SAPI - PAPI Developer',
      period: 'July 2021 - Jan 2025',
      description: [
        'Participated in Agile software development teams',
        'Implemented functional modules and business logic',
        'Iterated legacy and new feature codebases with continuous bug fixing'
      ]
    },
    {
      company: 'GZ RuoYuChen Technology Co., Ltd.',
      position: 'Full-Stack Developer',
      period: 'June 2017 -  June 2021',
      description: [
        'Led the development of internal SCM (Supply Chain Management) and logistics work order monitoring systems, and drove the implementation of a microservices (Spring Cloud) architecture.',
        'Led the development of a data platform for data collection and integration, providing clean and structured data to the BI (Business Intelligence) team.'
      ]
    }
  ],
  projects: [
    {
      name: 'SCM Supply Chain Operations Platform System',
      tech: ['ReactJS', 'Ant Design', 'SpringBoot', 'SpringCloud', 'Gateway', 'Nacos', 'RocketMQ', 'MySQL', 'Kettle'],
      description:
        'Addressed internal business digitalization by implementing paperless workflows, enabling core functions such as procurement, cashier settlement, order management, and sales revenue reconciliation.',
      highlights: [
        'Responsible for project architecture design and backend business logic development.',
        'Developed the RBAC (Role-Based Access Control) module and organizational structure management module.',
        'Optimized the conversion process of third-party platform orders to sales and return orders, reducing processing time from over 4 minutes to 20ms — achieving a 12× performance improvement.',
        'Utilized Kettle ETL to periodically extract out-of-stock order data from third-party platforms into the system with incremental updates, enabling effective stock-out management.',
        'Redesigned the caching strategy by integrating Redis and asynchronously updating cache data via message queues, improving API response time by 20%.',
        'Optimized large-scale data export interfaces, reducing response time from 1 minute to 15ms — achieving a 4× improvement in request throughput.'
      ]
    },
    {
      name: 'Enterprise Data Warehouse (EDW) Platform',
      tech: ['React.js', 'Ant Design UI', 'Spring Boot', 'Mybatis', 'MySQL 8.x', 'Kettle', 'Nginx', 'RocketMQ'],
      description:
        'Aggregated order data through data collection processes and transferred it to the Business Intelligence (BI) team for further analysis.',
      highlights: [
        'Led the project and resolved scheduled synchronization of third-party order data using Kettle, enabling stable parsing and storage of order data.',
        'Optimized data parsing logic multiple times, reducing processing time from 480ms per 50,000 records to 105ms, improving performance by 4x.',
        'Built the Elasticsearch platform, conducted internal training for the BI team, and integrated reporting data into ES, improving BI dashboard performance by 50%.'
      ]
    },
    {
      name: 'Blog System',
      tech: [
        'React.js',
        'HeroUI',
        'Ant Design UI',
        'TailwindCSS',
        'TinyMCE',
        'Spring Boot',
        'Mybatis',
        'MySQL 8.x',
        'MongoDB',
        'Nginx',
        'Docker'
      ],
      description:
        'This is a Blog System by myself, This system adopts a front-end and back-end separation architecture. The admin panel implements an RBAC (Role-Based Access Control) permission model, supporting blog management, image uploads, and other administrative functions. The portal site is used to browse blog content and serves as a personal website.',
      links: ['websit: https://web.lilkbox.tech', 'github: https://github.com/Lil-Kr/blog-system-single'],
      highlights: [
        'The public site allows users to browse blog content, with rich-text display and TOC support',
        'The admin panel includes a robust RBAC permission control system',
        'Supports user permission management, blog publishing, content and image asset management',
        'Built a scalable and modular admin dashboard template for enterprise use.'
      ]
    }
  ],
  education: {
    degree: 'Bachelor of Science in Computer Science',
    school: 'Kunming Polytechnic University in China',
    period: 'Sep 2013 - Jun 2017',
    gpa: '3.8/4.0'
  },
  certificates: []
}
