import React, { Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from '../containers/Login/Login';
import Home from '../containers/Home/Home';

function App() {
    return (
        <BrowserRouter>
            <Fragment>
                <Route path="/" exact component={Login}></Route>
                <Route path="/home" exact component={Home}></Route>
            </Fragment>
        </BrowserRouter>
    )
}

export default App;