import React from 'react'

const EnVersion = () => {
  return (
    <div className='flex w-full flex-col bg-white dark:bg-zinc-800 rounded-lg shadow-md p-8'>
      <h1 className='text-3xl font-bold text-indigo-600 dark:text-purple-400 mb-4'>About This Blog</h1>

      <p className='text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6'>
        Welcome to my personal blog 👋. This site was originally created because I wanted a space of my own to document
        everyday thoughts and experiences from work and life, while also serving as a real-world environment to
        experiment with different technologies.
      </p>

      <p className='text-gray-700 dark:text-gray-300 mb-6'>
        My main focus is backend development. I started with front-end development through{' '}
        <span className='font-semibold text-indigo-500 dark:text-purple-400'>jQuery</span>, and now use modern
        frameworks like <span className='font-semibold text-indigo-500 dark:text-purple-400'>ReactJS v18.x</span> to
        build the entire site, keeping up with the latest tech trends. This project will continue to evolve and improve
        over time. I hope the content here proves useful to you!
      </p>

      <p>
        This project is open source:{' '}
        <a
          className='font-bold hover:underline text-indigo-500 dark:text-purple-400'
          href='https://github.com/Lil-Kr/blog-system-single'
        >
          GitHub Link
        </a>
      </p>

      <p>&nbsp;</p>

      <h2 className='text-2xl font-semibold text-gray-800 dark:text-white mb-2'>💡 Motivation</h2>
      <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2'>
        <li>To have a personal platform for documenting ideas and content anytime</li>
        <li>To record the process of learning and thinking, building up technical depth</li>
        <li>To help others, which is also a way to grow myself</li>
      </ul>

      <h2 className='text-2xl font-semibold text-gray-800 dark:text-white mb-2'>🛠️ Tech Stack</h2>
      <p className='text-gray-700 dark:text-gray-300 mb-4'>
        This blog system follows a decoupled front-end/back-end architecture, consisting of a public-facing site and an
        admin panel.
      </p>
      <div className='space-y-2 mb-6 text-gray-700 dark:text-gray-300'>
        <p>
          <span className='font-semibold text-indigo-500 dark:text-purple-400'>Public Website:</span>{' '}
          <span className='font-bold'>ReactJS 18.x + Tailwind CSS + HeroUI</span>
        </p>
        <p>
          <span className='font-semibold text-indigo-500 dark:text-purple-400'>Admin Panel:</span>{' '}
          <span className='font-bold'>ReactJS 18.x + Ant Design 5.x + TinyMCE</span>
        </p>
        <p>
          <span className='font-semibold text-indigo-500 dark:text-purple-400'>Backend Services:</span>{' '}
          <span className='font-bold'>Spring Boot 2.7 + MyBatis + MySQL + MongoDB</span>
        </p>
      </div>

      <h2 className='text-2xl font-semibold text-gray-800 dark:text-white mb-2'>🚀 Key Features</h2>
      <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2'>
        <li>The public site allows users to browse blog content, with rich-text display and TOC support</li>
        <li>The admin panel includes a robust RBAC permission control system</li>
        <li>Supports user permission management, blog publishing, content and image asset management</li>
        <li>More features are being developed and polished...</li>
      </ul>

      <h2 className='text-2xl font-semibold text-gray-800 dark:text-white mb-2'>🌱 Future Plans</h2>
      <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2'>
        <li>Improve content structure and navigation experience</li>
        <li>Add server-side rendering (SSR)</li>
        <li>Track view count statistics</li>
        <li>Support comment system and user interaction</li>
        <li>Implement site-wide search and tagging features</li>
        <li>Refactor the system into a microservices architecture</li>
        <li>...More to come</li>
      </ul>
    </div>
  )
}

export default EnVersion
