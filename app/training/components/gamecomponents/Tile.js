import React from 'react'

var borders = new Map([["horizontal", "none solid none solid"],
                       ["vertical", "solid none solid none"],
                       ["endTop", "solid solid none solid"],
                       ["endLeft", "solid none solid solid"],
                       ["endRight","solid solid solid none"],
                       ["endBottom", "none solid solid solid"],
                       ["leftBotCorner", "none none solid solid"],
                       ["rightBotCorner", "none solid solid none"],
                       ["leftTopCorner", "solid none none solid"],
                       ["rightTopCorner", "solid solid none none"],
                       ["single", "solid"],
                       ["none", "none"]]);

class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.type && this.props.type) {
            return nextProps.type != this.props.type || this.props.tileType != nextProps.tileType;
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
                padding: 0,
                margin: 0,
                width: this.props.width,
                height: this.props.height,
                borderColor: "black",
                borderWidth: 3,
                borderStyle: borders.get(this.props.tileType),
                display: 'inline-block'
            },
            snakehead: {
                padding: 0,
                margin: 0,
                background: this.props.color,
                width: this.props.width,
                height: this.props.height,
                borderColor: "black",
                borderWidth: 3,
                borderStyle: "solid",
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
    tail: React.PropTypes.bool.isRequired,
    tileType: React.PropTypes.string.isRequired
};

export default Tile
