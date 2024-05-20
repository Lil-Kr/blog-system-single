import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import React from 'react'

let tabs = [
  {
    id: 'photos',
    label: 'Photos',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 'music',
    label: 'Music',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  },
  {
    id: 'videos',
    label: 'Videos',
    content:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
]

const TabsBase = () => {
  return (
    <div className='flex w-full flex-col'>
      <Tabs aria-label='Dynamic tabs' items={tabs} color='primary' variant='light'>
        {item => (
          <Tab key={item.id} title={item.label}>
            <Card>
              <CardBody>{item.content}</CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  )
}

export default TabsBase
