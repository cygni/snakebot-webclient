import React from 'react'
import GameStore from '../../stores/GameStore'

export default (InnerComponent, stateCallback ) => class extends React.Component {
    constructor(props) {
        super(props);
        this.state = stateCallback ();
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        GameStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        GameStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(stateCallback (this.props))
    }
    render() {
        return <InnerComponent {...this.state} {...this.props} />
    }
}
