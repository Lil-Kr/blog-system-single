import { Outlet } from 'oh-router-react'

const ContainerGrid = () => {
  return (
    <div className='container-grid grid grid-cols-12 w-10/12 gap-x-4'>
      {/*
        <div className='col-span-3'>
          <div className='sider-left-warpper hidden flex-col lg:basis-1/4 md:basis-1/4 lg:flex md:flex items-center gap-y-4'>
            <CardMe />
            {cardList.map(item => (
              <CardSimple key={item.key} cardItem={item} />
            ))}
          </div>
        </div>
        <div className='col-span-9 w-full'>
          <Outlet />
        </div>
      */}
      <Outlet />
    </div>
  )
}

export default ContainerGrid
