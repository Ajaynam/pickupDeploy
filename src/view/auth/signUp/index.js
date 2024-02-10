import React from 'react'
import Auth from './../../../layout/authLayout/auth';
import SignUpForm from './SignUpForm';



const Register = () => {



    return (
        <Auth>
            <div className="mb-8">
                <h3 className="mb-1">Sign Up</h3>
                <p>And lets get started with your free trial</p>
            </div>
            <SignUpForm disableSubmit={false} />
        </Auth>
    )
}

export default Register