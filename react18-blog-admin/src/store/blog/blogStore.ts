import { BlogContentDTO, BlogContentVO } from '@/apis/blog/content/blogContentApi'
import { create } from 'zustand'

interface BlogState {
  blogPageTableList: BlogContentDTO[]
}

interface BlogAction {
  setBlogPageList: (blogPageTableList: BlogContentDTO[]) => void
}

const blogData = { blogPageTableList: [] }

const useBlogStore = create<BlogState & BlogAction>()(set => ({
  ...blogData,
  setBlogPageList: (blogPageTableList: BlogContentDTO[]) =>
    set(state => ({
      ...state,
      blogPageTableList: blogPageTableList
    }))
}))

export { useBlogStore }
