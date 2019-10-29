import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { unitActions } from './actions/unitActions';
import { BASE_URL, PER_PAGE, AVAILABLE_BOOKING_YEARS } from './constants/client';

class Home extends React.Component {

    constructor (props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.currPage = 1;
        this.state = {
            drawerVisible: false,
            selectedYear: 0,
        }
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
        this.setState({
            drawerVisible: false
        })
        this.props.getUnits(page);
    }

    renderRating(rating) {
        return(
            <div className="rating row pl-2" title={`Rating: ${rating}`}>
                <div><img alt="1 star" className={rating>=1?'active':''} src="/star.png"/></div>
                <div><img alt="2 stars" className={rating>=2?'active':''} src="/star.png"/></div>
                <div><img alt="3 stars" className={rating>=3?'active':''} src="/star.png"/></div>
                <div><img alt="4 stars" className={rating>=4?'active':''} src="/star.png"/></div>
                <div><img alt="5 stars" className={rating>=5?'active':''} src="/star.png"/></div>
            </div>
        )
    }

    renderUnit(raw) {
        const targetId = `${raw.id}`;
        return(
            <div id={targetId} key={targetId} 
                onClick={this.handleUnitClick.bind(this, targetId)}
                className="col-md-6 col-lg-4 unit mb-5 px-3">
                <div>
                    <img alt={`${raw.name} - ${raw.region}`} className="hero mb-3" src={`${BASE_URL}${raw.pictures[0]}`}/>
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
                        {this.renderRating(raw.rating)}
                    </div>
                </div>
            </div>
        )
    }

    renderDrawer(unit) {
        return (
            <div>
                <div>
                    <img alt={`${unit.name} - ${unit.region}`} className="hero" src={`${BASE_URL}${unit.pictures[0]}`}/>
                </div>
                <div className="row p-3">
                    
                    <div className="col-8">
                        <b>{unit.name} - {unit.region}</b>
                    </div>
                    <div className="col-12 col-md-4 text-right price pl-0">
                        <b>BTC {unit.price}</b>
                    </div>
                    
                    <div className="col-12 mt-2 mb-1">
                        {this.renderRating(unit.rating)}
                    </div>
                    <div className="col-12 mt-2 small-text">
                        <i>Description:</i> {unit.description}
                    </div>
                    <div className="col-12 mt-3 small-text">
                        <b>Amenities: </b>
                        { unit.amenities.join(', ')}
                    </div>
                    <div className="col-12 mt-3">
                        <div className="row px-2">
                            { AVAILABLE_BOOKING_YEARS.map(item => {
                                let available = {disabled: 'disabled'};
                                let selectedYear = '';
                                let aria = true;
                                if(unit.availability.includes(item)){
                                    available = {};
                                    aria = false;
                                }
                                if(this.state.selectedYear === item){
                                    selectedYear = 'active';
                                }

                                return (
                                    <div key={item} className="col-3 mb-3 mx-auto">
                                        <input className={`pill btn btn-light ${selectedYear}`} 
                                            type="button"
                                            onClick={this.handleBookingSelect.bind(this, item)}
                                            {...available}
                                            aria-disabled={aria}
                                            value={item}></input>
                                    </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="col-12 text-right">
                    <input className="btn btn-dark px-4"
                        type="button"
                        onClick={this.handleBookingClick.bind(this)}
                        value="Book"></input>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { user, unitsData, unitSingle, loading } = this.props;
        const { drawerVisible } = this.state;
        const drawerStatus = drawerVisible ? 0: '';

        return (
            <div>
                <div className="row justify-content-between mt-3">
                    <div className="col-7 mt-3">
                        <h5 className="mb-2">
                            Blueground on <span className="mars light">Mars</span>
                        </h5>
                    </div>
                    <div className="col-5 text-right">
                        <span>
                            <img alt="profile-pic" className="profilePic mr-2" src={user.picture}/>
                            {user.name}
                        </span>(<Link to="/login">Logout</Link>)
                    </div>
                </div>
                
                <div id="drawer">
                    <div className="position-fixed h-100 w-sidebar" style={{right: drawerStatus}}>
                        {loading && 
                            <div className="col-12 col-md-4 my-4 mx-auto">
                                <em>Loading unit data...</em>
                            </div>
                        }
                        {unitSingle && 
                            this.renderDrawer(unitSingle)
                        }
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
                    {loading && <em>Loading units...</em>}
                </div>
            </div>
        );
    }

    handleScroll() {
        const { unitsTotal } = this.props;
        if ( window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight) {               
                if(this.currPage * PER_PAGE < unitsTotal){
                    this.loadUnits(++this.currPage);
                }
        }
    }

    handleUnitClick(targetId) {
        this.setState({
            drawerVisible: true,
            selectedYear: 0,
        })
        this.props.getUnit(targetId);
    }

    handleBookingSelect(year) {
        this.setState({
            selectedYear: year
        })
    }

    handleBookingClick(targetId) {
        const { selectedYear } = this.state;
        //this.props.bookUnit(selectedYear);
    }

}


function mapState(state) {
    const { userAuth, units } = state;
    const user = userAuth.data.user;
    const unitsTotal = units.total;
    const unitsData = units.data;
    const unitSingle = units.unitData;
    const loading = units.loading;
    return { user, unitsData, unitsTotal, unitSingle, loading};
}

const actionCreators = {
    getUnits: unitActions.getAllPaged,
    getUnit:  unitActions.getUnitById,
}

const connectedHomePage = connect(mapState, actionCreators)(Home);
export { connectedHomePage as Home };