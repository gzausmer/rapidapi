import React from 'react';
import cssClasses from './Login.css'
import {RaisedButton, TextField} from "material-ui";
import {userService} from "../../services/user.service";
import {history} from "../../router/history"

class Login extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            username:'',
            password:'',
        };

    }
    render() {
        const {wrongCredentials} = this.state;
        return (
            <div className={cssClasses.Login}>
                <h1>Login</h1>
                <div className={cssClasses.textFields} onKeyPress={this.handleKeyPress}>
                    <TextField
                        name="username"
                        hintText="Enter your Username"
                        floatingLabelText="Username"
                        onChange = {this.handleChange}
                    />
                    <TextField
                        name="password"
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange = {this.handleChange}
                    />
                    { (wrongCredentials) ? <p>wrong username or password :(</p> : null }
                    <RaisedButton label="Submit" primary={true} onClick={this.handleSubmit}/>
                </div>
            </div>
        )
    }


    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        this.setState({wrongCredentials:false});
        const { username, password } = this.state;
        if (username && password) {
            userService.login(username, password).then(
                (user) => {
                    this.props.onSuccess(user);
                    history.push('/');
                },
                error => {
                    // handle other errors when moving to real BE
                    this.setState({wrongCredentials:true});
                }
            );
        }
    };
}

export default Login