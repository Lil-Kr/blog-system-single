export interface BasicInfo {
  name: string
  title: string
  email: string
  location: string
  website: string
  github: string
  avatar?: string
}

export interface Skills {
  frontend: string[]
  backend: string[]
  systems?: string[]
  tools: string[]
  other: string[]
  soft: string[]
}

export interface Experience {
  company: string
  position: string
  period: string
  description: string[]
}

export interface Project {
  name: string
  tech: string[]
  description: string
  links?: string[]
  highlights?: string[]
}

export interface Education {
  degree: string
  school: string
  period: string
  gpa: string
}

export interface ResumeData {
  basicInfo: BasicInfo
  summarys: string[]
  skills: Skills
  highlights: string[]
  experience: Experience[]
  projects: Project[]
  education: Education
  certificates: string[]
}
