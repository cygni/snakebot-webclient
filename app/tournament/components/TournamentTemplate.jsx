import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from '../../common/templates/header/PageHeader';

const propTypes = {
  children: React.PropTypes.array.isRequired,
};

function TournamentTemplate(props) {
  return (
    <Grid fluid>
      <Header />
      <Row>
        <Col xs={18} md={12}>
          { props.children }
        </Col>
      </Row>
    </Grid>
  );
}

TournamentTemplate.propTypes = propTypes;
export default TournamentTemplate;
