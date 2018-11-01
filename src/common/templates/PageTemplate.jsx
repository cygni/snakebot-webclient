import React from 'react';
import PropTypes from 'prop-types';
import Header from './header/PageHeader';
import PageFooter from './footer/PageFooter';
import '../../design/styles/stylesheet.scss';

export default function PageTemplate(props) {
  return (
    <>
      <Header />
      {props.children}
      <PageFooter />
    </>
  );
}

PageTemplate.propTypes = {
  children: PropTypes.object.isRequired,
};
