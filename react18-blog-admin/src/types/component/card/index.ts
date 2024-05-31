export interface CardActionProps {
  id: string
  title?: string
  avatar?: string
  imageUrl: string
  imageName: string
  actions?: React.ReactNode[]
  extra?: any
}
