import React from 'react';
import { Grid } from 'react-bootstrap';

import Store from '../../../baseStore/BaseStore';
import StoreWatch from '../../watch/StoreWatch';
import CreateTournamentForm from './../forms/CreateTournamentForm';
import ConfigureTournamentForm from './../forms/ConfigureTournamentForm';

function getActiveTournament() {
  const tournament = Store.getActiveTournament();
  return { tournament };
}

const propTypes = {
  tournament: React.PropTypes.object.isRequired,
};

function Settings(props) {
  let table;
  if (!props.tournament.tournamentName) {
    table = <CreateTournamentForm />;
  } else {
    table = <ConfigureTournamentForm tournamentName={props.tournament.tournamentName} />;
  }
  return (
    <Grid fluid>
      {table}
    </Grid >
  );
}

Settings.propTypes = propTypes;

export default new StoreWatch(Settings, getActiveTournament);
