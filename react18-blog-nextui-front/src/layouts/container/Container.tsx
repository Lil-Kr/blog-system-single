import { Outlet } from 'oh-router-react'

const Container = () => {
  return (
    <div className='container-warrper flex justify-center w-full sm:w-10/12 md:w-10/12 lg:w-8/12 gap-x-4'>
      <Outlet />
    </div>
  )
}

export default Container
