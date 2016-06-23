import React from "react";
import {Grid, Row, Col} from "react-bootstrap";
import Sidebar from "./sidebar/Sidebar";
import Header from "../../home/components/header/PageHeader";
import Store from "../../baseStore/BaseStore";

export default (props) => {
    return (
        <div>
            <Header />
            <Grid fluid style={{paddingTop: "70px"}}>
                {Store.isLoggedIn() ? <p> <span className="glyphicon glyphicon-user" aria-hidden="true"></span> {Store.getUser()}</p>: ""}
                <Row>
                    <Col xs={3} md={2}>
                        <Sidebar />
                    </Col>
                    <Col xs={15} md={10}>
                        { props.children }
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}