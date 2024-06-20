import React, { useEffect, useState } from 'react'
import { Button, Pagination } from '@nextui-org/react'
import { PaginationType } from '@/types/base/response'

export type btnStatueProp = {
  prevBtn: boolean
  nextBtn: boolean
}

const PaginationBase = (props: {
  pageChange: Function
  pagination: PaginationType
  btnDisable: btnStatueProp
  setBtnDisable: React.Dispatch<React.SetStateAction<btnStatueProp>>
}) => {
  const { pageChange, pagination, btnDisable, setBtnDisable } = props
  const { currentPageNum, pageSize, total, totalPage } = pagination

  const handlePageChange = (currentPageNum: number, pageSize: number) => {
    if (currentPageNum === 1) {
      setBtnDisable({ prevBtn: true, nextBtn: false })
    } else {
      setBtnDisable({ ...btnDisable, prevBtn: false })
    }

    if (currentPageNum === totalPage) {
      setBtnDisable({ prevBtn: false, nextBtn: true })
    }
    pageChange(currentPageNum, pageSize)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row gap-x-6'>
        <Button
          className='border-1 border-borderColor hover:border-borderColor'
          size='md'
          isDisabled={btnDisable.prevBtn}
          variant='ghost'
          color='primary'
          onPress={() => handlePageChange(currentPageNum > 1 ? currentPageNum - 1 : currentPageNum, pageSize)}
        >
          {`Prev Page`}
        </Button>
        <Button
          className='border-1 border-borderColor hover:border-borderColor'
          isDisabled={btnDisable.nextBtn}
          size='md'
          variant='ghost'
          color='primary'
          onPress={() => handlePageChange(currentPageNum < totalPage ? currentPageNum + 1 : currentPageNum, pageSize)}
        >
          {`Next Page`}
        </Button>
      </div>
    </div>
  )
}

export default PaginationBase
