import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { CardBaseDataType } from '@/types/components/CardType'
import { useNavigate } from 'oh-router-react'

const CardSimple = (props: { cardItem: CardBaseDataType }) => {
  const { cardItem } = props
  const navigateTo = useNavigate()

  const moreFunction = (url: string) => {
    navigateTo(url)
  }

  return (
    <Card className='flex shrink' radius='sm' shadow='sm' fullWidth={true}>
      <CardHeader className='flex justify-between'>
        <div className='flex flex-row gap-x-2'>
          {cardItem.svgIcon}
          <p className='text-large font-bolb'>{cardItem.headTitle}</p>
        </div>
        <div className='flex flex-col px-2 '>
          {cardItem.headRightContent && (
            <span
              className='text-medium hover:text-primary cursor-pointer'
              onClick={() => moreFunction(cardItem.headRightContent!.moreUrl)}
            >
              {cardItem.headRightContent.headMoreText}
            </span>
          )}
        </div>
      </CardHeader>
      <CardBody className='flex -mt-4'>{cardItem.content}</CardBody>
    </Card>
  )
}

export default CardSimple
