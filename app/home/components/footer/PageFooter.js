import React from "react";
import {Link} from "react-router";
require("../../../design/styles/stylesheet.scss");


class PageFooter extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <footer>
                    <p>JAKOBSBERGSGATAN 22 </p>
                    <p> 111 44 STOCKHOLM</p>
                    <Link to="http://www.cygni.se">
                        <img src={require('../../../design/images/cygni-logo.png')} alt="saaa"/>
                    </Link>
                </footer>
            </div>
    )
    }
    }


    export default PageFooter;