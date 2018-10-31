import React from 'react';
import TournamentStore from '../../baseStore/BaseStore';

export default (InnerComponent, stateCallback) =>
  class extends React.Component {
    state = stateCallback(this.props);

    handleChange = () => {
      this.setState(stateCallback(this.props));
    };

    componentDidMount() {
      TournamentStore.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      TournamentStore.removeChangeListener(this.handleChange);
    }

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  };
