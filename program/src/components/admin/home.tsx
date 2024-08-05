import {Col, Row} from 'antd'
import React from 'react'
import UpcommingEvent from './upcomming-events'
import DashboardChart from './dashboard-chart'

export const BodyHome = () => {
    return (
        <div>
            <Row
                gutter={[32,32]}
                style={{
                    marginTop: '32px',
                    marginLeft: '20px',
                }}
                >
                <Col
                    xs={24}
                    sm={28}
                    xl={8}
                    style={{
                        height: '460px'
                    }}
                >
                    <UpcommingEvent />
                </Col>
                <Col
                    xs={24}
                    sm={28}
                    xl={8}
                    style={{
                        height: '460px'
                    }}
                >
                    <DashboardChart />
                </Col>
            </Row>
        </div>
    )
}