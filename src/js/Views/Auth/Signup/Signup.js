import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../Input/Input';

import * as actions from '../../../store/actions/index';
import { Button, Form } from 'semantic-ui-react';

import './Signup.css';

class Signup extends Component {

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
                    placeholder:'בחר סיסמה',
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
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'',
                    label: 'שם פרטי',
                    erroroutput: '!שם אינו תקין'
                },
                value: '',
                validation: {
                    required: true,
                    isName: true
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'',
                    label: 'שם משפחה',
                    erroroutput: '!שם אינו תקין'
                },
                value: '',
                validation: {
                    required: true,
                    isName: true
                },
                valid: false,
                touched: false
            },
            age: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'הגיל שלך',
                    label: 'גיל',
                    erroroutput: '!גיל אינו תקין'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 1, 
                    maxLength: 2
                },
                valid: false,
                touched: false
            }
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
        this.props.onSignUp(
            this.state.controls.email.value, 
            this.state.controls.password.value, 
            this.state.controls.firstName.value, 
            this.state.controls.lastName.value, 
            this.state.controls.age.value, 
        )
    }

    inputChangedHandler = (event, inputID) => {
        const updatedSignupForm = {...this.state.controls};
        const updatedFormElement = {...updatedSignupForm[inputID]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidatity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedSignupForm[inputID] = updatedFormElement;
        let formIsValid = true;
        for(let inputID in updatedSignupForm){
            formIsValid = updatedSignupForm[inputID].valid && formIsValid;
        }
        this.setState({controls: updatedSignupForm, formIsValid: formIsValid});
    }

    render(){

        const signupRedirect = this.props.newUserCreated ?
        <Redirect to='login'/>
        :
        null

        const errorMessage = this.props.error ? 
        <p>
            {this.props.error.message}    
        </p>
        :
        null;

        const inputs = [];
        for(let key in this.state.controls){
            inputs.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = 
        <div className='Form gradient-border'>
            <h1>הרשמה</h1>
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
                    type='submit'>!הירשם 
                </Button>
            </Form>
            <div style= {{marginTop: '20px'}}>
                <a  href= '/login'>להתחברות</a>
            </div>
        </div>

        return(
            <div>
                {signupRedirect}
                {form}
            </div>
        )
    }  
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        newUserCreated: state.auth.newUserCreated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (email, password, firstName, lastName , age) => dispatch(actions.authSignUp(email, password,firstName, lastName , age)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);
