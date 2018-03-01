import React from 'react';
import cssClasses from './HomePage.css'
import {userService} from '../../services/user.service'
import {dragElement} from "../../utils/ui.utils/drag.service";
import thumbnail from "./userThumbnail.png"
import {RaisedButton} from "material-ui";
import {Component} from 'react';
import {bubbleService} from "../../utils/ui.utils/bubble.service";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.user = this.props.user || JSON.parse(localStorage.getItem('user'));
    }

    render() {

        const username = this.user? this.user.username : "";
        return (
            <div className={ cssClasses.HomePage }>
                <canvas className={ cssClasses.canvas } id="myCanvas" width="1680" height="957"/>
                <RaisedButton className={ cssClasses.logout } label="Logout" secondary={true} onClick={() => this.logoutHandler()}/>
            <h1>Hi {username}!</h1>

                <div ref={el => this.element = el} className={ cssClasses.userThumbnail}>
                <img className={ cssClasses.userThumbnailImg} src={thumbnail} alt="..."/>
            </div>
            </div>
        )
    };

    logoutHandler = () => {
        bubbleService.stopAnimation();
        userService.logout();
    };

    setUserPosition = () => {
        const position = {top:this.element.offsetTop, left: this.element.offsetLeft};
        const modifiedUser = Object.assign({}, this.user, {position});
        userService.persistUserPosition(modifiedUser);
    };

    componentDidMount() {

        if (this.user && this.user.position) {
            this.element.style.top = this.user.position.top+'px';
            this.element.style.left = this.user.position.left+'px';
        }
        const canvas = document.querySelector("#myCanvas");
        const context = canvas.getContext("2d");
        dragElement(this.element, this.setUserPosition, canvas, context);
    }
}

export default HomePage;