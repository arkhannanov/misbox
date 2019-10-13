import React from 'react';
import {NavLink, Redirect} from "react-router-dom";
import './Navbar.scss';
import {connect} from "react-redux";

const Navbar = (props) => {
    if (!props.isAuth) {
        return <Redirect to={"/auth"}/>
    }
    return (
        <nav className='navbar'>
            <div className='navbar__departments'>
                <NavLink to="/departments">Departmets</NavLink>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(Navbar);