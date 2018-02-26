import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {initApiService} from "./services/api.service";
import {userService} from "./services/user.service";

// set up mock user
userService.setMockUser();

//init API listener:
initApiService();

// render app:
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
