import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import './Login.scss';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Необходимое поле'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type} className="login__form-control" />
      {touched && ((error && <span className="login__form-text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const LoginForm = ({handleSubmit, error, pristine, submitting, isLoading}) => {
  return (
    <form className='login__form' onSubmit={handleSubmit}>
      <Field
        name="username"
        component={renderField}
        label='E-mail'
        className='login__form-input'
      />
      <Field
        name="password"
        component={renderField}
        label='Password'
        className='login__form-input'
        type='password'
      />
      {error && <div className='login__form-error'>
        {error}
      </div>
      }
      <div>{isLoading
        ? <button>Подождите...</button>
        : <button className='login__form-submit-button' type='submit' disabled={pristine || submitting}>
          Войти
        </button>
      }
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({form: 'login', validate})(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.username, formData.password);
  }

  if (props.isAuth) {
    return <Redirect to={"/profile"}/>
  }

  return <div className='login'>
    <h2 className='login__header'>Login</h2>
    <LoginReduxForm onSubmit={onSubmit} isLoading={props.isLoading}/>
  </div>
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, {login})(Login);