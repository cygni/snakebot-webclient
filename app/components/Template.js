import React from 'react'
import { Grid, Row, Col} from 'react-bootstrap'
import Sidebar from './sidebar/Sidebar'
import SidebarRight from './sidebar/SidebarRight'
import Header from './header/Header'

export default (props) => {
    return (
        <Grid fluid>
            <Header />
            <Row>
                <Col xs={3} md={2}>
                    <Sidebar />
                </Col>
                <Col xs={12} md={8}>
                    { props.children }
                </Col>
                <Col xs={3} md={2}>
                    <SidebarRight />
                </Col>
            </Row>
        </Grid>
    )
}