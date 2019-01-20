import React, { Component } from 'react';
import './field.css';
import Card from "../Card/Card";
import {shuffle} from "../../utils"

class Field extends Component {
    constructor(props){
        super(props)
        this.state={
            pictures: props.pictures,
            cards: Array(9).fill(null),
            children: [],
            seconds: '00',
            minutes: '1',
            moves: 0,
            enable: false
        }
        this.stopTimer = false
        this.secondsRemaining = 0
        this.intervalHandle = 0
        this.startCountDown = this.startCountDown.bind(this)
        this.tick = this.tick.bind(this)
    }

    componentDidMount(){
        this.startCountDown()
    }

    tick() {
        var min = Math.floor(this.secondsRemaining / 60);
        var sec = this.secondsRemaining - (min * 60);
        this.setState({
            minutes: min,
            seconds: sec
        })
        if (sec < 10) {
            this.setState({
                seconds: "0" + this.state.seconds,
            })
        }
        if (min < 10) {
            this.setState({
                value: "0" + min,
            })
        }
        if (min === 0 & sec === 0 || this.stopTimer) {
            this.gameOver()
            clearInterval(this.intervalHandle);
        }
        this.secondsRemaining--
    }

    startCountDown() {
        this.intervalHandle = setInterval(this.tick, 1000);
        let time = this.state.minutes;
        this.secondsRemaining = time * 60;
    }

    onRotation = (child) => {
        this.state.children.push(child)
        if(child.state.picture.includes("talon")){
            setTimeout(function(){
                this.explosion()
            }.bind(this), 700)
        }

        if(this.state.children.length === 2){
            this.setState({enable: true})

            let children = this.state.children
            let moves = this.state.moves

            if(this.state.children[0].state.picture !== this.state.children[1].state.picture){
                setTimeout(
                    function() {
                        children[0].state.opened = false
                        children[1].state.opened = false
                        children[0].state.enable = true
                        children[1].state.enable = true
                        moves++

                        this.setState({
                            children : [],
                            moves : moves,
                            enable : false
                        })
                    }
                        .bind(this),
                    800
                );
            }else{
                setTimeout(
                    function() {
                        children[0].state.enable = false
                        children[1].state.enable = false
                        moves++

                        this.setState({
                            children : [],
                            moves : moves,
                            enable : false
                        })
                    }
                        .bind(this),
                    800
                );
            }
        }
    }

    gameOver() {
        const modal = document.getElementById("game-modal")
        const restart = document.getElementsByClassName("game-over-window__close-button")[0]

        modal.style.display = "flex"
        restart.onclick = function() {
            location.reload()
        }
    }

    explosion() {
        var explosion_sound = document.getElementById("explosion-audio")
        explosion_sound.volume = 0.4
        explosion_sound.play()
        document.getElementsByClassName("overlay-explosion")[0].style.display = "block"
        setTimeout(() => (document.getElementsByClassName("overlay-explosion")[0].style.display = "none"), 2000)
        this.stopTimer=true
        setTimeout(this.gameOver, 1800)
    }

    render() {
        const shuffled_pictures = shuffle(this.state.pictures)

        return (
            <section id="game">
            <section className="round-info shadow">
            <h3 className="round-info__title3">TIME:</h3>
        <time className="round-info__num-text">{this.state.minutes}:{this.state.seconds}</time>
        </section>
        <section className="field shadow">
            <div className="field__blockClick" style={{display: this.state.enable ? "block" : "none"}}></div>
        {this.state.cards.map((item, index) => (
            <Card
            key={index}
            picture={require("../../../public/img/" + shuffled_pictures[index])}
            onRef={child => this.onRotation(child)}
            />
        ))}
    </section>
        <section className="round-info shadow">
            <h3 className="round-info__title3">MOVES:</h3>
        <span className="round-info__num-text">{this.state.moves}</span>
        </section>
        </section>
    );
    }
}

export default Field;