import React, {Component} from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store from "./redux/redux-store";
import HeaderContainer from "./components/Header/HeaderContainer";
import './App.scss';
import DepartametsContainer from "./components/DepartametsContainer/DepartametsContainer";


class App extends Component {

  componentDidMount() {
    if(this.props.isAuth === false) {

      this.props.history.push("/auth");
    }
  }

  render() {

    return (
      <div className='app'>
        <HeaderContainer/>
        <div className='app__content'>
          <Navbar/>
          <div className='app__content-right-side'>
            <Route path='/departments'
                   render={() => <DepartametsContainer/>}/>

            <Route path='/auth'
                   render={() => <LoginPage/>}/>
          </div>
        </div>
      </div>
    )
  }
};


let mapStateToProps = (state) => {
  return ({
    isAuth: state.auth.isAuth
  })
}


let AppContainer = compose(
  connect(mapStateToProps, {}),
  withRouter
)(App);


const TestMO = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
}

export default TestMO;


