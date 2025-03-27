import { BlogContentAddReq, BlogContentDTO } from '@/apis/blog/content/blogContentApi'
import { SelectProps } from 'antd/lib'
import { create } from 'zustand'

interface BlogState {
  blogPageTableList: BlogContentDTO[]
  blogModalData: BlogContentAddReq
}

interface BlogAction {
  setBlogPageList: (blogPageTableList: BlogContentDTO[]) => void
  setBlogModalData: (blogModalData: BlogContentAddReq) => void
}

const blogData = { blogPageTableList: [], blogModalData: {} as BlogContentAddReq }

const useBlogStore = create<BlogState & BlogAction>()(set => ({
  ...blogData,
  setBlogPageList: (blogPageTableList: BlogContentDTO[]) =>
    set(state => ({
      ...state,
      blogPageTableList: blogPageTableList
    })),
  setBlogModalData: (blogModalData: BlogContentAddReq) =>
    set(state => ({
      ...state,
      blogModalData
    }))
}))

export { useBlogStore }
