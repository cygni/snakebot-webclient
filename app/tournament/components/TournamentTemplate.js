import React from 'react'
import { Grid, Row, Col} from 'react-bootstrap'
import Header from './header/TournamentHeader'

export default (props) => {
    return (
        <Grid fluid>
            <Header />
            <Row>
                <Col xs={18} md={12}>
                    { props.children }
                </Col>

            </Row>
        </Grid>
    )
};