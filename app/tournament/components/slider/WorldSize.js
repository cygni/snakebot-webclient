import React from 'react'
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider'
import {Row, Col} from 'react-bootstrap'

class WorldSize extends React.Component {
    constructor(props) {
        super(props);
        this.updateWidth = this.updateWidth.bind(this);
        this.updateHeight = this.updateHeight.bind(this);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            step: 25,
            max: 100,
            min: 25
        }
    }

    updateWidth(event) {
        this.setState({
            width: event.target.value
        })
    }

    updateHeight(event) {
        this.setState({
            height: event.target.value
        })
    }


    render() {
        return (
            <Row>
                <h4>Width: {this.state.width} </h4>
                <ReactSliderNativeBootstrap value={this.state.width}
                                            handleChange={this.updateWidth}
                                            step={this.state.step} max={this.state.max} min={this.state.min}
                                            disabled="disabled"/>
                <h4>Height: {this.state.height} </h4>
                <ReactSliderNativeBootstrap value={this.state.height}
                                            handleChange={this.updateHeight}
                                            step={this.state.step} max={this.state.max} min={this.state.min}
                                            disabled="disabled"/>
            </Row>
        )
    }
}

WorldSize.PropTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
};

export default WorldSize;