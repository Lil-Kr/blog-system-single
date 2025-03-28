import { BlogContentAddReq, BlogContentTableType } from '@/apis/blog/content/blogContentApi'
import { create } from 'zustand'

interface BlogState {
  blogPageTableList: BlogContentTableType[]
  blogModalData: BlogContentAddReq
}

interface BlogAction {
  setBlogPageList: (blogPageTableList: BlogContentTableType[]) => void
  setBlogModalData: (blogModalData: BlogContentAddReq) => void
}

const blogData = { blogPageTableList: [], blogModalData: {} as BlogContentAddReq }

const useBlogStore = create<BlogState & BlogAction>()(set => ({
  ...blogData,
  setBlogPageList: (blogPageTableList: BlogContentTableType[]) =>
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
