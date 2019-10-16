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
import history from './history';
import EmployeesContainer from "./components/EmployeesContainer/EmployeesContainer";

class App extends Component {

  componentDidMount(props) {
    if(this.props.isAuth === false) {

      this.props.history.push("/auth");
    }
  }

  render() {

    let url = `/${this.props.departmentName}`;

    console.log('Render');

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

            <Route path={'/departments'+ url + '/employees'}
                   render={() => <EmployeesContainer/>}/>
          </div>
        </div>
      </div>
    )
  }
};


let mapStateToProps = (state) => {
  return ({
    isAuth: state.auth.isAuth,
    departmentName: state.departmentsPage.currentUrl,
  })
}


let AppContainer = compose(
  connect(mapStateToProps, {}),
  withRouter
)(App);


const TestMO = (props) => {
  return <BrowserRouter history={history}>
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
}

export default TestMO;


