import React from "react";
import {Link} from "react-router";
import "../../../design/styles/stylesheet.scss";

class PageFooter extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <footer>
                <p>JAKOBSBERGSGATAN 22 </p>
                <p> 111 44 STOCKHOLM</p>
                <Link to="http://www.cygni.se">
                    <img src={require('../../../design/images/cygni-logo.png')} alt="Cygni-logo"/>
                </Link>
            </footer>
        )
    }
}


export default PageFooter;