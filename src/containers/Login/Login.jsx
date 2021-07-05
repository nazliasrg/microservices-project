import React, { Component, Fragment } from 'react'
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import logoLogin from '../../assets/img/ecommerce.png'
import { Link } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    handleUsernameChange = (event) => {
        window.sessionStorage.setItem("username", event.target.value);
        this.setState({ username: event.target.value })
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    submitAction = (e) => {
        e.preventDefault();

        console.log("this.state.username")
        console.log(this.state.username)
        console.log(this.state.password)

        if ((this.state.username === "") && (this.state.password === "")) {
            alert("Username & Password are empty!");
        }
        else if (this.state.password === "") {
            alert("Password is empty!");
        }
        else if (this.state.username === "") {
            alert("Username is empty!");
        }
        else {
            alert('Welcome ' + this.state.username + '!');
            this.props.history.push({
                pathname: '/home'
            })
        }
    }
    render() {


        return (
            <Fragment>
                <div className="card shadow loginPage">
                    <div className="container containerPage">
                        <div className="row rowPage">
                            <div className="col-md-6 justify-content-center imgPage">
                                <img className="imgLogin ml-5 mt-5 pl-3" src={logoLogin} alt="" />
                            </div>
                            <div className="col-md-6">
                                <div className="getStarted mt-5 ml-4"><strong>Get's Started.</strong></div>
                                <span className="register ml-4">Don't have an account yet?</span> <strong><Link>SignUp</Link></strong>
                                <br /><br />

                                <form className="ml-4 mr-4" action="/home">
                                    <label>Username</label>
                                    <input type="text" className="form-control" id="username" onChange={this.handleUsernameChange} required />
                                    <label>Password</label>
                                    <input type="password" className="form-control" id="password" onChange={this.handlePasswordChange} required />
                                    <br />
                                    <button type="submit" className="btn btn-warning btnLogin" onClick={this.submitAction}>L&nbsp;O&nbsp;G&nbsp;I&nbsp;N</button>
                                </form>


                            </div>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Login;
