import React from 'react';
import {Row, Col, Input, ListGroup, ListGroupItem} from 'react-bootstrap';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

const ConfigureTournamentForm = React.createClass({
    mixins: [LinkedStateMixin],

    getInitialState() {
        return {

        }
    },

    // createTournamentTable() {
    //     Action.createTournamentTable(this.state.tempGameName);
    // },

    settingsLinkState(name) {
        return {
            value: this.state[name],
            requestChange: (newValue) => {
                this.setState({[name]: newValue});
            }
        }
    },

    handleRadioOnChange(booleanName, name) {
        this.setState({[name]: booleanName});
    },

    render() {
        return (
            <div>
               helleo
            </div>
        )
    }
});

export default ConfigureTournamentForm;
