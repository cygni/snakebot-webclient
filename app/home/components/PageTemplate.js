import React from "react";
import {Grid, Row, Col} from "react-bootstrap";
import Header from "./header/PageHeader";
import Store from '../../baseStore/BaseStore';

export default (props) => {
    return (
        <div>
            <Header />
            <Grid fluid style={{paddingTop: "70px"}}>
                <Row>
                    <Col xs={18} md={12}>
                        {Store.isLoggedIn() ? <p> <span className="glyphicon glyphicon-user" aria-hidden="true"></span> User: {Store.getUser()}</p>: ""}
                        { props.children }
                    </Col>
                </Row>
            </Grid>
        </div>
    )
};