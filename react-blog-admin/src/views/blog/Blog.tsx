import React from 'react'
import store, { RootState, useAppDispatch, useAppSelector } from '@/redux'

const Blog = () => {
  
	const { token, isLogin } = useAppSelector((state: RootState) => state.auth)
  console.log('--> 这是博客页面, token:', token, isLogin)
  const local = localStorage.getItem('persist:root')

  return (
    <>
      <div>这是博客页面</div>
      <p>{local}</p>
    </>
  )
}

export default Blog
