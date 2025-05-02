import React from 'react'

const ChineseVersion = () => {
  return (
    <div className='flex w-full flex-col bg-white dark:bg-zinc-800 rounded-lg text-fontColor shadow-md p-8'>
      <h1 className='text-3xl font-bold text-indigo-600 dark:text-purple-400 mb-4'>关于博主</h1>

      <p className='text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6'>
        博主目前是一名后端开发工程师, 主要使用Java语言作为后端开发语言, 目前正在远程办公, 努力成为一名全栈开发者
      </p>
      <p className='text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6'>
        这是我的gitHub地址:{' '}
        <a
          className='font-bold hover:underline text-indigo-500 dark:text-purple-400'
          href='https://github.com/Lil-Kr'
        >{'传送门'}</a>,
        这里记录了我学习数据结构, 刷算法题的过程, 如有需要欢迎Star⭐️
      </p>

      <h1 className='text-3xl font-bold text-indigo-600 dark:text-purple-400 mb-4'>关于本站</h1>

      <p className='text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6'>
        欢迎来到我的个人博客 👋。这是一个动态博客, 设计这个网站的初衷源于博主自己想拥有一个自己的个人网站,
        记录平时工作生活的点滴，虽然目前还有很多需要改进的地方, 同时也让自己拥有一个真实的实验环境来尝试各种技术。
      </p>

      <p className='text-gray-700 dark:text-gray-300 mb-6'>
        博主主要方向是后端，前端早期接触过{' '}
        <span className='font-semibold text-indigo-500 dark:text-purple-400'>Jquery</span>， 目前使用主流前端框架{' '}
        <span className='font-semibold text-indigo-500 dark:text-purple-400'>ReactJS v18.x</span>
        来实现整个网站，跟上技术迭代的步伐，后续将持续更新迭代，慢慢完善，希望博客内容对你有所帮助。
      </p>

      <p>
        本项目目前为开源的：
        <a
          className='font-bold hover:underline text-indigo-500 dark:text-purple-400'
          href='https://github.com/Lil-Kr/blog-system-single'
        >
          {'项目传送门'}
        </a>
      </p>
      <p>&nbsp;</p>

      <h2 className='text-2xl font-semibold text-gray-800 dark:text-white mb-2'>💡 开发初衷</h2>
      <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2'>
        <li>拥有一个属于自己的内容记录平台，随时可以记录</li>
        <li>记录学习和思考的过程，积累技术沉淀</li>
        <li>能帮助到他人更好...</li>
      </ul>

      <h2 className='text-2xl font-semibold text-gray-800 dark:text-white mb-2'>🛠️ 技术架构</h2>
      <p className='text-gray-700 dark:text-gray-300 mb-4'>
        本博客系统采用前后端分离的架构，分为门户网站与后台管理两部分。
      </p>
      <div className='space-y-2 mb-6 text-gray-700 dark:text-gray-300'>
        <p>
          <span className='font-semibold text-indigo-500 dark:text-purple-400'>门户网站：</span>
          <span className='font-bold'>ReactJS 18.x + Tailwind CSS + HeroUI</span>
        </p>
        <p>
          <span className='font-semibold text-indigo-500 dark:text-purple-400'>后台管理系统：</span>
          <span className='font-bold'>ReactJS 18.x + AntDesign 5.x + TinyMCE</span>
        </p>
        <p>
          <span className='font-semibold text-indigo-500 dark:text-purple-400'>后端服务：</span>
          <span className='font-bold'>Spring Boot 2.7 + Mybatis + MySQL + MongoDB</span>
        </p>
      </div>

      <h2 className='text-2xl font-semibold text-gray-800 dark:text-white mb-2'>🚀 功能要点</h2>
      <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2'>
        <li>门户网站用于浏览博客内容，支持文章目录与富文本展示</li>
        <li>
          后台管理系统实现了较为完整的 <span className='font-bold'>RBAC 权限控制模型</span>
        </li>
        <li>
          后台支持<span className='font-bold'>{'用户权限管理、博客发布、内容管理、图片资源管理'}</span>等功能
        </li>
        <li>更多细节功能正在逐步完善中...</li>
      </ul>

      <h2 className='text-2xl font-semibold text-gray-800 dark:text-white mb-2'>🌱 未来方向</h2>
      <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2'>
        <li>优化内容结构与目录导航体验</li>
        <li>增加SSR</li>
        <li>统计浏览量</li>
        <li>支持评论系统与互动功能</li>
        <li>实现站内搜索与标签系统</li>
        <li>重构为微服务架构, 将本系统重构为多人用户的平台</li>
        <li>未完待续...</li>
      </ul>
    </div>
  )
}

export default ChineseVersion
