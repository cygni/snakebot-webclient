import React from 'react';
import Header from './header/PageHeader.jsx';
import PageFooter from './footer/PageFooter.jsx';
import '../../design/styles/stylesheet.scss';


const propTypes = {
  children: React.PropTypes.object.isRequired,
};

function PageTemplate(props) {
  return (
    <div>
      <Header />

      { props.children }

      <PageFooter />
    </div>
  );
}

PageTemplate.propTypes = propTypes;
export default PageTemplate;
