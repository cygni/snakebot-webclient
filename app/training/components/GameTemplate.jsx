import React from 'react';
import { Grid } from 'react-bootstrap';
import Header from '../../common/templates/header/PageHeader.jsx';

const propTypes = {
  children: React.PropTypes.object.isRequired,
};

const GameTemplate = props => (
  <div>
    <Header />
    <Grid fluid style={{ paddingTop: '70px' }}>
      { props.children }
    </Grid>
  </div>
);

GameTemplate.propTypes = propTypes;
export default GameTemplate;
