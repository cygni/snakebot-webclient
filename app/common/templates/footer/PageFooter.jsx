import React from 'react';
import {
  Link,
} from 'react-router';
import cygnilogo from '../../../design/images/logos/cygni-logo.svg';

function PageFooter() {
  return (
    <footer>
      <p>JAKOBSBERGSGATAN 22 </p>
      <p> 111 44 STOCKHOLM</p>
      <Link to="http://www.cygni.se">
        <img src={cygnilogo} alt="Cygni-logo" />
      </Link>
    </footer>
  );
}

export default PageFooter;
