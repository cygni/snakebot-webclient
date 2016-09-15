import React from "react";
import Header from "./header/PageHeader";
import PageFooter from "./footer/PageFooter";
import "../../design/styles/stylesheet.scss";


export default (props) => {
    return (
        <div>
        <Header />

        { props.children }

        <PageFooter />
        </div>
    )
};