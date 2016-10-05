import React from 'react';
import Header from './header/PageHeader';
import PageFooter from './footer/PageFooter';
import '../../design/styles/stylesheet.scss';

const propTypes = {
  children: React.PropTypes.object.isRequired,
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
