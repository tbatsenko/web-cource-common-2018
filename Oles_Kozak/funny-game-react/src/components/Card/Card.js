import React, { Component } from 'react';
import './card.css';

class Card extends Component {
    constructor(props){
        super(props)
        this.state={
            index: props.index,
            opened: false,
            picture: props.picture,
            onRef: props.onRef,
            enable: true,
        }
    }

    onClick = () => {
        this.state.opened = !this.state.opened;
        this.state.enable = false
        if(this.state.opened){
            this.state.onRef(this)
        }
        this.setState(this.state)
    }

    render() {
        return (
            <div className="card">
                <div className="card__sides" onClick={() => this.onClick()} style={{transform: this.state.opened ? `rotateY( 180deg )` : `rotateY( 0deg )`, pointerEvents: this.state.enable ? "all" : "none" }}>
                    <div className="card__front">
                    </div>
                    <img src={this.state.picture} className="card__back"/>
                </div>
            </div>
        );
    }
}

export default Card;