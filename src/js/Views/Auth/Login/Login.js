import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../Input/Input';
import * as actions from '../../../store/actions/index';

import { Button, Form } from 'semantic-ui-react';

import './Login.css';

class Login extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder:'example123@gmail.com',
                    label: 'אימייל',
                    erroroutput: '!כתובת האימייל אינה תקינה'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder:'',
                    label: 'סיסמה',
                    erroroutput: '!7-15 תווים בלבד'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 15
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        loading: false
    }

    checkValidatity(value, rules) {

        let isValid = false;

        if(rules.required){
            isValid = value.trim() !== '';
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        if(rules.isEmail){
            const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            isValid = pattern.test(value) && isValid;
        }
        if(rules.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        if(rules.isName){
            const pattern =/^[A-Za-z]+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid ;
    }

    submitHandler = () => {
        this.props.onSignIn(
            this.state.controls.email.value, 
            this.state.controls.password.value
        )
    }

    inputChangedHandler = (event, inputID) => {
        const updatedLoginForm = {...this.state.controls};
        const updatedFormElement = {...updatedLoginForm[inputID]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidatity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedLoginForm[inputID] = updatedFormElement;
        let formIsValid = true;
        for(let inputID in updatedLoginForm){
            formIsValid = updatedLoginForm[inputID].valid && formIsValid;
        }
        this.setState({controls: updatedLoginForm, formIsValid: formIsValid});
    }

    render(){

        let errorMessage = this.props.error ? 
        <p>
            {this.props.error.message}    
        </p>
        :
        null;

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to = '/levels'/>
        };

        const inputs = [];
        for(let key in this.state.controls){
            inputs.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = 
        <div className='Form gradient-border'>
            <h1>התחברות</h1>
            <Form 
            loading = {this.props.loading ? true : false} 
            style ={{width: '70%', margin: 'auto'}}>
                {errorMessage}
                {inputs.map(input => (
                    <Input 
                        key = {input.id}
                        elementType={input.config.elementType} 
                        elementConfig={input.config.elementConfig} 
                        value={input.config.value}
                        invalid={!input.config.valid}
                        shouldValidate={input.config.validation}
                        touched={input.config.touched}
                        changed={(event) => this.inputChangedHandler(event, input.id)}/>
                ))}
                <Button 
                    disabled={!this.state.formIsValid}
                    onClick={this.submitHandler} 
                    type='submit'>!התחבר
                </Button>
            </Form>
            <div style= {{marginTop: '20px'}}>
                <a  href= '/signup'>להרשמה</a>
            </div>
        </div>

        return(
            <div>
                {form}
                {authRedirect}
            </div>
        )
    }  
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (email, password) => dispatch(actions.authLogin(email, password)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
