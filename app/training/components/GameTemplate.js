import React from "react";
import {Grid} from "react-bootstrap";
import Header from "../../common/templates/header/PageHeader";

export default (props) => {
    return (
        <div>
            <Header />
            <Grid fluid style={{paddingTop: "70px"}}>
                        { props.children }
            </Grid>
        </div>
    )
}