import React from 'react';
import cygnilogo from '../../../design/images/logos/cygni_vit.svg';

function PageFooter() {
  return (
    <footer className="clear-fix">
      <a href="https://www.cygni.se">
        <img src={cygnilogo} alt="Cygni-logo" />
      </a>
      <p>Jakobsbergsgatan 22, 111 44 STOCKHOLM</p>
    </footer>
  );
}

export default PageFooter;
