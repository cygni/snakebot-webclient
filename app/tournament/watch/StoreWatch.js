import React from 'react'
import TournamentStore from '../stores/TournamentStore'

export default (InnerComponent, stateCallback ) => class extends React.Component {
    constructor(props) {
        super(props);
        this.state = stateCallback ();
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        TournamentStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        TournamentStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(stateCallback (this.props))
    }
    render() {
        return <InnerComponent {...this.state} {...this.props} />
    }
}
