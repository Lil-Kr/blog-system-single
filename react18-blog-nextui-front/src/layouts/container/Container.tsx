import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import React from 'react'

const Container = () => {
  return (
    <div className='container flex flex-col mx-auto gap-x-4 lg:flex-row bg-violet-200'>
      <div className='siderbar-left lg:w-1/5 lg:items-end w-full flex flex-col items-center gap-y-4 bg-purple-100'>
        <Card>
          <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
            <p className='text-tiny uppercase font-bold'>Daily Mix</p>
            <small className='text-default-500'>12 Tracks</small>
            <h4 className='font-bold text-large'>Frontend Radio</h4>
          </CardHeader>
          <CardBody className='overflow-visible py-2'>
            <Image
              alt='Card background'
              className='object-cover rounded-xl'
              src='https://nextui.org/images/hero-card-complete.jpeg'
              width={270}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
            <p className='text-tiny uppercase font-bold'>Daily Mix</p>
            <small className='text-default-500'>12 Tracks</small>
            <h4 className='font-bold text-large'>Frontend Radio</h4>
          </CardHeader>
          <CardBody className='overflow-visible py-2'>
            <Image
              alt='Card background'
              className='object-cover rounded-xl'
              src='https://nextui.org/images/hero-card-complete.jpeg'
              width={270}
            />
          </CardBody>
        </Card>
      </div>
      <div className='content-right w-full flex items-start lg:w-4/5 bg-purple-300'>
        <div>
          Make beautiful websites regardless of your design experience.Make beautiful websites regardless of your design
          experience.Make beautiful websites regardless of your design experience.Make beautiful websites regardless of
          your design experience.Make beautiful websites regardless of your design experience.Make beautiful websites
          regardless of your design experience.Make beautiful websites regardless of your design experience.Make
          beautiful websites regardless of your design experience.Make beautiful websites regardless of your design
          experience.Make beautiful websites regardless of your design experience.Make beautiful websites regardless of
          your design
        </div>
      </div>
    </div>
  )
}

export default Container
