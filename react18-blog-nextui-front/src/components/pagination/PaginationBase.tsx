import React from 'react'
import { Button } from '@heroui/react'
import { PaginationType } from '@/types/base/response'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
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
          className='border-1 border-borderColor hover:border-borderColor font-bold'
          size='md'
          isDisabled={btnDisable.prevBtn}
          variant='ghost'
          color='primary'
          onPress={() => handlePageChange(currentPageNum > 1 ? currentPageNum - 1 : currentPageNum, pageSize)}
        >
          <span>{t('blogcontent.prev')}</span>
        </Button>
        <Button
          className='border-1 border-borderColor hover:border-borderColor font-bold'
          isDisabled={btnDisable.nextBtn}
          size='md'
          variant='ghost'
          color='primary'
          onPress={() => handlePageChange(currentPageNum < totalPage ? currentPageNum + 1 : currentPageNum, pageSize)}
        >
          <span>{t('blogcontent.next')}</span>
        </Button>
      </div>
    </div>
  )
}

export default PaginationBase
