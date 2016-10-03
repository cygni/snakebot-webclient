import React from 'react';
import {
  Link,
} from 'react-router';
import cygnilogo from '../../../design/images/logos/cygni_vit.svg';

function PageFooter() {
  return (
    <footer className="clear=fix">
      <Link to="http://www.cygni.se">
        <img src={cygnilogo} alt="Cygni-logo" />
      </Link>
      <span>Jakobsbergsgatan 22, 111 44 STOCKHOLM</span>
    </footer>
  );
}

export default PageFooter;
