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
                <Col xs={15} md={10}>
                    { props.children }
                </Col>

            </Row>
        </Grid>
    )
}