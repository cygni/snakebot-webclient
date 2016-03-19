import React from 'react'

class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.type && this.props.type) {
            return nextProps.type != this.props.type || this.props.gradient != nextProps.gradient;
        }
        return false;
    }

    render() {
        var styles = {
            empty: {
                padding: 0,
                margin: 0,
                borderLeft: "1px solid rgba(255,255,255,0.2)",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                width: this.props.width,
                height: this.props.height,
                display: 'inline-block'
            },
            food: {
                padding: 0,
                margin: 0,
                background: "green",
                width: this.props.width,
                height: this.props.height,
                display: 'inline-block'
            },
            obstacle: {
                background: "black",
                padding: 0,
                margin: 0,
                width: this.props.width,
                height: this.props.height,
                display: 'inline-block'
            },
            snakebody: {
                background: this.props.color,
                opacity: this.props.gradient,
                borderLeft: "1px solid white",
                borderRight: "1px solid white",
                padding: 0,
                margin: 0,
                width: this.props.width,
                height: this.props.height,
                display: 'inline-block'
            },
            snakehead: {
                padding: 0,
                margin: 0,
                background: this.props.color,
                width: this.props.width,
                height: this.props.height,
                display: 'inline-block'
            }
        };

        var tile = {};
        {
                (() => {
                    switch (this.props.type) {
                        case "empty":
                            tile = styles.empty;
                            break;
                        case "food":
                            tile = styles.food;
                            break;
                        case "obstacle":
                            tile = styles.obstacle;
                            break;
                        case "snakebody":
                            tile = styles.snakebody;
                            break;
                        case "snakehead":
                            tile = styles.snakehead;
                            break;
                    }
                })()
        }

        return (
            <div style={tile} />
        )
    }
}

Tile.PropTypes = {
    type: React.PropTypes.object.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
    gradient: React.PropTypes.number.isRequired,
    tail: React.PropTypes.bool.isRequired
};

export default Tile