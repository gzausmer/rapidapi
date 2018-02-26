import React from 'react';
import cssClasses from './HomePage.css'
import {userService} from '../../services/user.service'
import {dragElement} from "../../utils/ui.utils/drag-service";
import thumbnail from "./userThumbnail.png"
import {RaisedButton} from "material-ui";

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.user = this.props.user;
    }

    render() {

        const username = this.user? this.user.username : "";
        return (
            <div className={ cssClasses.HomePage }>
                <canvas className={ cssClasses.canvas } id="myCanvas" width="1680" height="957"/>
                <RaisedButton className={ cssClasses.logout } label="Logout" secondary={true} onClick={() => this.logoutHandler(this.user)}/>
            <h1>Hi {username}!</h1>

                <div ref={el => this.element = el} className={ cssClasses.userThumbnail}>
                <img className={ cssClasses.userThumbnailImg} src={thumbnail} alt="..."/>
            </div>
            </div>
        )
    };

    logoutHandler = (user) => {
        const position = {top:this.element.offsetTop, left: this.element.offsetLeft};
        const modifiedUser = Object.assign({}, user, {position});
        userService.logout(modifiedUser);
    };

    componentDidMount() {

        if (this.user && this.user.position) {
            this.element.style.top = this.user.position.top+'px';
            this.element.style.left = this.user.position.left+'px';
        }
        dragElement(this.element);
    }
}

export default HomePage;