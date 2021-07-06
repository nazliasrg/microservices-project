import React from 'react'
import './Header.css'
import logo from '../../assets/img/shop.png'
import money from '../../assets/img/dollar.png'
import { Link } from 'react-router-dom'

const Header = (props) => {
    const { username, customer, saldo } = props;

    return (
        <>
            <div className="nav-container" id="navbar2">

                <Link to={'/'} className="cursor">
                    <button type="button" className="btn" id="btnProfile">Logout</button>
                </Link>

                <div className="logo1">
                    <img src={logo} alt="logo library" className="logo" />
                </div>

                <Link to={'#'} className="akun" id="profileLink">
                    <button type="button" className="btn" id="btnProfile">{username} &nbsp; | &nbsp;&nbsp;
                        <img src={money} alt="" style={{ width: "3%" }} /> &nbsp;
                        <b>Rp {saldo}</b></button>
                </Link>
            </div>

        </>
    )
}

export default Header;
