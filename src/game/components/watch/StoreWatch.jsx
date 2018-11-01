import React from 'react';
import GameStore from '../../../baseStore/BaseStore';

export default (InnerComponent, stateCallback) =>
  class extends React.Component {
    state = stateCallback(this.props);

    handleChange = () => {
      this.setState(stateCallback(this.props));
    };

    componentDidMount() {
      GameStore.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      GameStore.removeChangeListener(this.handleChange);
    }

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  };
