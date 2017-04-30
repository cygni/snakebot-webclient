import React from 'react';
import cygnilogo from '../../../design/images/logos/cygni_vit.svg';

function PageFooter() {
  return (
      <footer className="clear-fix">
          <a className="footer__logo" href="https://www.cygni.se">
              <img src={cygnilogo} alt="Cygni-logo" />
          </a>
          <div className="footer__info">
              <p className="footer__info-text">Jakobsbergsgatan 22, 111 44 STOCKHOLM</p>
              <span className="footer__info-text">Snake support:
                  <a className="footer__info-link" href="mailto:snake@cygni.se"> snake@cygni.se</a>
              </span>
          </div>
      </footer>
  );
}

export default PageFooter;
