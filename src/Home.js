import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { unitActions } from './actions/unitActions';
import { BASE_URL, PER_PAGE } from './constants/client';

class Home extends React.Component {

    constructor (props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.currPage = 1;
    }
    componentWillMount() {
        this.loadUnits();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        
    }


    loadUnits(page) {
        this.props.getUnits(page);
    }

    renderUnit(raw) {
        const targetId = `unit-${raw.id}`;
        return(
            <div id={targetId} key={targetId}
                className="col-md-6 col-lg-4 unit mb-5 px-3">
                <div>
                    <img className="mb-3" src={`${BASE_URL}${raw.pictures[0]}`}/>
                </div>
                <div className="row">
                    <div className="col-12">
                        <b>{raw.name} - {raw.region}</b>
                    </div>
                    <div className="col-12 text-truncate">
                        {raw.description}
                    </div>
                    <div className="col-12">
                        {raw.cancellation}
                    </div>
                    <div className="col-12">
                        <b>BTC {raw.price}</b>
                    </div>
                    <div className="col-12">
                        {raw.rating}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { user, units } = this.props;
        const unitsData = units && units.data;
        return (
            <div>
                <div className="row justify-content-between mt-4">
                    <div className="col-6 ">
                        <h5 className="mb-5">
                            TEST TEST 
                        </h5>
                    </div>
                    <div className="col-5 text-right">
                        <h6>
                            <img className="profilePic mr-2" src={user.picture}/>
                            {user.name}
                        </h6>(<Link to="/login">Logout</Link>)
                    </div>
                </div>
                <div className="row justify-content-between mt-5">
                    { unitsData && unitsData.map(raw => {
                        return (
                            this.renderUnit(raw)
                        );
                    })}
                </div>
                <div className="col-md-3 my-4 mx-auto p-4">
                    {units.loading && <em>Loading units...</em>}
                </div>
            </div>
        );
    }

    handleScroll(e) {
        const { unitsTotal } = this.props;
        if ( window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight) {               
                if(this.currPage * PER_PAGE < unitsTotal){
                    this.loadUnits(++this.currPage);
                }
        }
    }

}



function mapState(state) {
    const { userAuth, units } = state;
    const user = userAuth.data.user;
    const unitsTotal = units.total;
    return { user, units, unitsTotal };
}

const actionCreators = {
    getUnits: unitActions.getAllPaged,
}

const connectedHomePage = connect(mapState, actionCreators)(Home);
export { connectedHomePage as Home };