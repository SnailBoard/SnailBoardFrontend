import React, {useState} from "react";
import {Button, Form, Header, Icon, Message, Modal} from "semantic-ui-react";
import {loginRoutine} from "../routines";
import validator from 'validator';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

const LoginPage = ({loginRoutine: login, isFetching}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const onLoginClick = () => {
        if (isEmailValid && isPasswordValid) {
            const loginData = {
                "email": email,
                "password": password
            };

            console.log("Before Logging in")
            login(loginData);
            console.log("After Logging in")
        }
    }

    const onEmailChange = (e, {value}) => {
        setEmail(value);
        setEmailValid(validator.isEmail(email));
    }

    const onPasswordChange = (e, {value}) => {
        setPassword(value);
        setIsPasswordValid(password.length > 2);
    }

    return (
        <div className="mainBox">
            <Header as="h2" color="green">Log in</Header>
            <Form>
                <Form.Input
                    fluid
                    icon="at"
                    iconPosition="left"
                    placeholder="Email"
                    type="email"
                    error={!isEmailValid}
                    onChange={onEmailChange}
                    onBlur={() => setEmailValid(validator.isEmail(email))}
                />
                <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    error={!isPasswordValid}
                    onChange={onPasswordChange}
                    onBlur={() => setIsPasswordValid(password.length > 2)}
                />
                <Button type="submit"
                        loading={isFetching}
                        disabled={isFetching}
                        onClick={() => onLoginClick()}
                >
                    Login
                </Button>
            </Form>
            <Message>
                <Icon name="meh" size="big"/>
                <NavLink exact to="/register" color="black">
                    I DON`T HAVE AN ACCOUNT
                </NavLink>
            </Message>
        </div>

    )
}

const mapStateToProps = rootState => ({
        isFetching: rootState.auth.isFetching
});

const mapDispatchToProps = {
        loginRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);