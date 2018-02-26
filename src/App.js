import React, {Component} from 'react';
import cssClasses from './App.css';
import {MuiThemeProvider} from "material-ui";
import Login from "./components/Login/Login";
import {Route, Router} from 'react-router-dom';
import {history} from './router/history';
import {guardHomePage} from "./router/guards";
import Switch from "react-router-dom/es/Switch";
import notFound from '../src/images/404-header.png';


class App extends Component {

    render() {

        return (
            <div className={cssClasses.App}>
                <MuiThemeProvider>
                    <Router history={history}>
                        <Switch>
                            <Route path="/login" render={()=> this.renderLoginComponent()} />
                            <Route path="/" exact={true} render={(props) => this.renderHomeComponent(props)}/>
                            <Route path="*" render={() => this.render404Component()}/>
                        </Switch>
                    </Router>
                </MuiThemeProvider>
            </div>
        );
    }

    renderLoginComponent() {
        return <Login onSuccess={(user) => this.onSuccessHandle(user)}/>;
    }

    renderHomeComponent(props) {
        props.user = this.user;
        return guardHomePage(props);
    }

    render404Component() {
        return <img src={notFound} alt="404 page not found" className={cssClasses.notFound}/>
    }

    onSuccessHandle(user) {
        this.user = user;
    }
}

export default App;
