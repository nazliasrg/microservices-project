import React from 'react'
import './Header.css'
import logo from '../../assets/img/shop.png'
import money from '../../assets/img/dollar.png'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router';

const Header = (props) => {
    const history = useHistory();
    const handleLogout = async () => {

        const r = window.confirm('Are you sure to logout?');
        if (r === true) {
            await localStorage.clear();
            await history.push({
                pathname: '/'
            });
        }
    }

    const { username, saldo } = props;

    return (
        <>
            <div className="nav-container" id="navbar2">

                <Link to={'/'} className="cursor">
                    <button type="button" className="btn" id="btnProfile" onClick={handleLogout}>Logout</button>
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
