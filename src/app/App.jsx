import React, { Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from '../containers/Login/Login';
import Home from '../containers/Home/Home';
import History from '../containers/History/History';

function App() {
    return (
        <BrowserRouter>
            <Fragment>
                <Route path="/" exact component={Login}></Route>
                <Route path="/home" exact component={Home}></Route>
                <Route path="/history" exact component={History}></Route>
            </Fragment>
        </BrowserRouter>
    )
}

export default App;