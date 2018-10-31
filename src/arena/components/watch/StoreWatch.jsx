import React from 'react';
import ArenaStore from '../../../baseStore/BaseStore';

export default (InnerComponent, stateCallback) =>
  class extends React.Component {
    state = stateCallback(this.props);

    handleChange = () => {
      this.setState(stateCallback(this.props));
    };

    componentDidMount() {
      ArenaStore.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      ArenaStore.removeChangeListener(this.handleChange);
    }

    render() {
      return <InnerComponent {...this.state} {...this.props} />;
    }
  };
