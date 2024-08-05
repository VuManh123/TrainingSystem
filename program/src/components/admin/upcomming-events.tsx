import { Card, List } from 'antd'
import {CalendarOutlined} from '@ant-design/icons'
import React, { useState } from 'react'
import { Text } from '../text'

const UpcommingEvent = () => {
    const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <Card
        style={{height: '100%'}}
        headStyle={{padding: '8px 16px'}}
        bodyStyle={{padding: '0 1rem'}}
        title={
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
            }}>
                <CalendarOutlined></CalendarOutlined>
                <Text size='sm' style={{marginLeft: '0.7rem'}}>Upcomming Events</Text>
            </div>
        }
        >
        {isLoading ? (
            <List
                itemLayout='horizontal'
                dataSource={Array.from({length: 5}).map((_, index)=> ({
                    id: index,
                }))}></List>
            ) : (
                <List>


                </List>
            )}
      </Card>
    </div>
  )
}

export default UpcommingEvent
