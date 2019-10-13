import React from 'react';
import {NavLink} from "react-router-dom";
import './Header.scss';

const Header = (props) => {
  return <header className='header'>
    <img className='header__image' src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' width='150px' height='150px' alt='Logo'/>

    <div className='header__login-logout'>
      { props.isAuth
        ? <div>Пользователь {props.userId}<button onClick={props.logout}>Выйти</button></div>
        : <button><NavLink to={'/auth'}>Войти</NavLink></button> }
    </div>
  </header>
}

export default Header;