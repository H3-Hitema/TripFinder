import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()


    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />

                <input type="submit" value="Se connecter" />
            </form>
        );
    }
}

export default Login;