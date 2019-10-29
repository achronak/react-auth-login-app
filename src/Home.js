import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    componentDidMount() {

    }

    render() {
        const { user } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.name}!</h1>
                <p>You're logged in</p>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { data } = state.userAuth;
    return data;
}

const actionCreators = {
    
}

const connectedHomePage = connect(mapState, actionCreators)(Home);
export { connectedHomePage as Home };