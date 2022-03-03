import React from 'react';

import { Form } from 'semantic-ui-react';
import './Input.css';

const Input = (props) => {

    let errorOutput = null;

    if(props.invalid && props.shouldValidate && props.touched) {
        errorOutput = props.elementConfig.erroroutput;
    }

    let inputElement = null;

    switch (props.elementType) {
        case('input'):
            inputElement = <Form.Input 
                            style={{marginBottom: '10px'}}
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}
                            label={props.elementConfig.label}/>
            break;
        default: return null
    }

    return (
        <div>
            <span className='Invalid'>
                {errorOutput}
            </span>
            {inputElement}
        </div>
    );
}

export default Input;