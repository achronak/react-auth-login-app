import React from 'react';
import { connect } from 'react-redux';

import { userActions } from './actions/userActions';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.props.logout();

        this.state = {
            email: '',
            password: '',
            submitted: false,
            regexError: false
        };
        this.emailRegex = RegExp('^[a-zA-Z]{2,8}@[0-9]{4}.[a-zA-Z]{2}$');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        
        if(e.target.name === 'email' && !this.emailRegex.test(e.target.value)){
            this.setState({ regexError: true });
        } else {
            this.setState({ regexError: false });
        }
        
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password, regexError } = this.state;
        if (email && password && !regexError) {
            this.props.login(email, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted, regexError} = this.state;
        return (
            <div className="loginbox col-xl-5 col-md-6 mt-5 mx-auto p-4">
                <h5 className="mb-5 mt-2">
                    Blueground on <span className="mars">Mars</span>
                </h5>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <input type="text" className="form-control" placeholder="Colonist ID" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block">Colonist ID is required</div>
                        }
                        {email && regexError && 
                            <div className="help-block">Invalid Colonist ID</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="submit-btn form-group mb-0">
                        <button className="btn btn-light float-right px-4">Sign in</button>
                        {loggingIn &&
                            <img alt="please wait..." src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.userAuth;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.authLogin,
    logout: userActions.logout
};

const connectedLoginScreen = connect(mapState, actionCreators)(LoginScreen);
export { connectedLoginScreen as LoginScreen };
