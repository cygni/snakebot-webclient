import React from 'react';
import {
  Link,
} from 'react-router';
import '../../../design/styles/stylesheet.scss';

const cygniLogo = require('../../../design/images/cygni-logo.png');

function PageFooter() {
  return (
    <footer>
      <p>JAKOBSBERGSGATAN 22 </p>
      <p> 111 44 STOCKHOLM</p>
      <Link to="http://www.cygni.se">
        <img src={cygniLogo} alt="Cygni-logo" />
      </Link>
    </footer>
  );
}

export default PageFooter;
