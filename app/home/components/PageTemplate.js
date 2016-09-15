import React from "react";
import {Grid, Row, Col} from "react-bootstrap";
import Header from "./header/PageHeader";
import PageFooter from "./footer/PageFooter"

export default (props) => {
    return (
        <div>
            <Header />
            <Grid fluid style={{paddingTop: "70px"}}>
                <Row>
                    <Col xs={18} md={12}>
                        { props.children }
                    </Col>
                </Row>

            </Grid>
            <PageFooter />
        </div>
    )
};