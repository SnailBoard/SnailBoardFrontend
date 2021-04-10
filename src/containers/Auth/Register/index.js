import React, {useState} from "react";
import {Button, Form, Header, Icon, Message} from "semantic-ui-react";
import {registerRoutine} from "../routines";
import validator from 'validator';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

const RegisterPage = ({registerRoutine: register, isFetching}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [isUsernameValid, setUsernameValid] = useState(true);
    const [isFirstNameValid, setFirstNameValid] = useState(true);
    const [isEmailValid, setEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const onRegisterClick = () => {
        if (isEmailValid && isPasswordValid && isUsernameValid && isFirstNameValid) {
            const registerData = {
                "email": email,
                "password": password,
                "username": username,
                "firstName": firstName,
            };
            register(registerData);
        }
    }

    const onEmailChange = (e, {value}) => {
        setEmail(value);
        setEmailValid(validator.isEmail(value));
    }

    const onPasswordChange = (e, {value}) => {
        setPassword(value);
        setIsPasswordValid(value.length > 4);
    }

    const onUsernameChange = (e, {value}) => {
        setUsername(value);
        setUsernameValid(value.length > 2);
    }


    const onFirstNameChange = (e, {value}) => {
        setFirstName(value);
        setFirstNameValid(value.length > 2);
    }

    return (
        <div className="mainBox">
            <Header as="h2" color="green">Registration</Header>
            <Form>
                <Form.Input
                    fluid
                    icon="at"
                    iconPosition="left"
                    placeholder="Email"
                    type="email"
                    value={email}
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
                    value={password}
                    error={!isPasswordValid}
                    onChange={onPasswordChange}
                    onBlur={() => setIsPasswordValid(password.length > 4)}
                />
                <Form.Input
                    fluid
                    value={username}
                    icon="id card"
                    iconPosition="left"
                    placeholder="Username"
                    type="text"
                    error={!isUsernameValid}
                    onChange={onUsernameChange}
                    onBlur={() => setUsernameValid(username.length > 2)}
                />
                <Form.Input
                    fluid
                    value={firstName}
                    icon="id card"
                    iconPosition="left"
                    placeholder="Firstname"
                    type="text"
                    error={!isFirstNameValid}
                    onChange={onFirstNameChange}
                    onBlur={() => setFirstNameValid(firstName.length > 2)}
                />
                <Button type="submit"
                        loading={isFetching}
                        disabled={isFetching}
                        onClick={() => onRegisterClick()}
                >
                    Register
                </Button>
            </Form>
            <Message>
                <Icon name="smile" size="big"/>
                <NavLink exact to="/login" color="black">
                    I HAVE AN ACCOUNT
                </NavLink>
            </Message>
        </div>

    )
}

const mapStateToProps = rootState => (
    {
        isFetching: false
    }
);

const mapDispatchToProps =
    {
        registerRoutine
    };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);