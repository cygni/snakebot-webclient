import React from "react";
import Header from "./header/PageHeader";
import PageFooter from "./footer/PageFooter";
require("../../design/styles/stylesheet.scss");


export default (props) => {
    return (
        <div>
        <Header />

        { props.children }

        <PageFooter />
        </div>
    )
};