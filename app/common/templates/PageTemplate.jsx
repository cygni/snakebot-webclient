import React from 'react';
import Header from './header/PageHeader';
import PageFooter from './footer/PageFooter';
import '../../design/styles/stylesheet.scss';

import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.object.isRequired,
};

const PageTemplate = props => (
  <div>
    <Header />
    { props.children }
    <PageFooter />
  </div>
);

PageTemplate.propTypes = propTypes;
export default PageTemplate;
