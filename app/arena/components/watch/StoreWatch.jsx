import React from 'react';
import ArenaStore from '../../../baseStore/BaseStore';

export default (InnerComponent, stateCallback) => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = stateCallback();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    ArenaStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ArenaStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(stateCallback());
  }

  render() {
    return <InnerComponent {...this.state} {...this.props} />;
  }
};
