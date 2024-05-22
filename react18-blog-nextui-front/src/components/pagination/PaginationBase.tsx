import React from 'react'
import { Button, Pagination } from '@nextui-org/react'

const PaginationBase = () => {
  const [currentPage, setCurrentPage] = React.useState(1)
  return (
    <div className='flex flex-col'>
      {/* <p className='text-small text-default-500'>Selected Page: {currentPage}</p> */}
      {/* <Pagination total={10} color='secondary' page={currentPage} onChange={setCurrentPage} /> */}
      <div className='flex flex-row gap-x-6'>
        <Button
          className='border-1 border-borderColor hover:border-borderColor'
          size='md'
          isDisabled={false}
          variant='ghost'
          color='primary'
          onPress={() => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </Button>
        <Button
          className='border-1 border-borderColor hover:border-borderColor'
          isDisabled={false}
          size='md'
          variant='ghost'
          color='primary'
          onPress={() => setCurrentPage(prev => (prev < 10 ? prev + 1 : prev))}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default PaginationBase
