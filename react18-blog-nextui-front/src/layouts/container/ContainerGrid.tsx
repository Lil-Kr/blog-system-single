import { Outlet } from 'oh-router-react'

const ContainerGrid = () => {
  return (
    <div className='container-grid grid grid-cols-12 w-10/12 gap-x-4'>
      <Outlet />
    </div>
  )
}

export default ContainerGrid
