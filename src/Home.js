import React from 'react';
import { connect } from 'react-redux';
import Collapse from 'react-bootstrap/Collapse'
import { Link } from 'react-router-dom';
import { unitActions } from './actions/unitActions';
import { PER_PAGE, AVAILABLE_BOOKING_YEARS } from './constants/client';
import { resolveImg, formatNewLines } from './helpers/utils';
import { trapFocus, resetTrapFocus } from './helpers/focus';

class Home extends React.Component {

    constructor (props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleDrawer = this.handleDrawer.bind(this);
        this.resetDrawer = this.resetDrawer.bind(this);
        this.handleSearchBox = this.handleSearchBox.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);

        this.currPage = 1;
        this.state = {
            drawerVisible: false,
            selectedYear: 0,
            slideText: false,
            searchToken: ''
        }
        this.requestStarted = 0;
    }

    componentWillMount() {
        this.loadUnits();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('click', this.handleDrawer);
        window.addEventListener('keyup', this.handleDrawer);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('click', this.handleDrawer);
        window.removeEventListener('keyup', this.handleDrawer);
    }

    componentDidUpdate(){
        document.getElementById('sheet').style.height = 
                document.body.clientHeight + 'px';
    }

    loadUnits(page) {
        this.resetDrawer();
        this.props.getUnits(page);
    }

    renderRating(rating) {
        return(
            <div className="rating row pl-2" title={`Rating: ${rating}`}>
                <div><img alt="1 star" className={rating >= 1 ? 'active':''} src="/star.png"/></div>
                <div><img alt="2 stars" className={rating >= 2 ? 'active':''} src="/star.png"/></div>
                <div><img alt="3 stars" className={rating >= 3 ? 'active':''} src="/star.png"/></div>
                <div><img alt="4 stars" className={rating >= 4 ? 'active':''} src="/star.png"/></div>
                <div><img alt="5 stars" className={rating >= 5 ? 'active':''} src="/star.png"/></div>
            </div>
        )
    }

    renderUnit(raw) {
        const {booking} = this.props;
        const targetId = `${raw.id}`;
        return(
            <div id={targetId} key={targetId} 
                onClick={this.handleUnitClick.bind(this, targetId)}
                className="col-md-6 col-lg-4 unit mb-5 px-3">
                <div>
                    <img alt={`${raw.name} - ${raw.region}`} className="hero mb-3"
                        src={resolveImg(`${raw.pictures[0]}`, 'md')}/>
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
                    <div className="col-6">
                        {this.renderRating(raw.rating)}
                    </div>
                    {booking && booking.unitId === targetId &&
                        <div className="col-6 text-right booked">
                            You just booked it!
                        </div>
                    }
                </div>
            </div>
        )
    }

    renderDrawer(unit) {
        const { drawerVisible, slideText} = this.state;
        drawerVisible && setTimeout(() => {
            trapFocus(document.getElementById('drawer'));
        }, 100);
        let description = formatNewLines(unit.description);
        return (
            <div>
                <div>
                    <img alt={`${unit.name} - ${unit.region}`} className="hero"
                        src={resolveImg(`${unit.pictures[0]}`)}/>
                </div>
                <div className="row m-0 py-3">
                    
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
                        <i>Description:</i>
                        <pre>
                            <div
                                onClick={() => this.setState({ slideText: !slideText })}
                                aria-controls="collapse-text"
                                aria-expanded={slideText}>
                                {description.substr(0, 160)}
                                {!slideText && unit.description.length > 160 && ' ...'}
                            </div>
                            <Collapse in={slideText}>
                                <div id="collapse-text">
                                    {description.substr(160)}
                                </div>
                            </Collapse>
                        </pre>
                    </div>
                    <div className="col-12 mt-0 small-text">
                        <b>Amenities: </b>
                        { unit.amenities.join(', ')}
                    </div>
                    <div className="col-12 mt-3">
                        <div className="row">
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
                        onClick={this.handleBookingClick.bind(this, unit.id)}
                        value="Book"></input>
                    </div>
                </div>
            </div>
        )
    }

    renderHeader(){
        const { user } = this.props;
        const { drawerVisible } = this.state;
        const sheetStatus = drawerVisible ? 'block': 'none';

        return (
            <div>
                <div id="sheet" style={{display: sheetStatus}}></div>
                <div className="row justify-content-between mt-3">
                    <div className="col-8 mt-3">
                        <h5 className="mb-2">
                            Blueground on <span className="mars light">Mars</span>
                        </h5>
                    </div>
                    <div className="col-4 text-right">
                        <span>
                            <img alt="profile-pic" className="profilePic mr-2" src={user.picture}/>
                            <span className="d-inline-block">
                                {user.name} <br/>
                                <Link className="small-text" to="/login">Logout</Link>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    renderSearchbox() {
        const { searchToken } = this.state;
        return (
            <div className="row mt-5">
                <form name="form" className="col-sm-12 col-lg-3" onSubmit={this.handleSearchSubmit}>
                    <div className={'form-group'}>
                        <input type="text" className="form-control" placeholder="Search..." name="search" value={searchToken} onChange={this.handleSearchBox} />
                    </div>
                </form>
            </div>
        )
    }
    
    render() {
        const { unitsData, unitSingle, loading, error } = this.props;
        const { drawerVisible } = this.state;
        const drawerStatus = drawerVisible ? 0: '';

        return (
            <div>
                {this.renderHeader()}
                {this.renderSearchbox()}
                {error &&
                    <div className="alert alert-danger position-fixed float-right" role="alert">
                        Error: {error}
                    </div>
                }
                <div id="drawer">
                    <div className="position-fixed h-100 w-sidebar" style={{right: drawerStatus}}>
                        { loading &&
                            <div className="text-center">
                                <img alt="loading" className="loading mt-5 mb-2 mx-auto d-block" src="/loading.gif"/>
                                <em>Loading unit information...</em>
                            </div>
                        }
                        { unitSingle && this.renderDrawer(unitSingle) }
                    </div>
                </div>
                <div className="row justify-content-between mt-2">
                    { unitsData && unitsData.map(raw => {
                        return (
                            this.renderUnit(raw)
                        );
                    })}
                </div>
                <div className="col-md-4 my-4 mx-auto p-4 text-center">
                    { !drawerVisible && loading &&
                        <div>
                            <img alt="loading" className="loading mb-2 mx-auto d-block" src="/loading.gif"/>
                            <em>Loading units...</em>
                        </div>
                    }
                </div>
            </div>
        );
    }

    handleSearchSubmit(e) {
        e.preventDefault();
        const { searchToken } = this.state;
        if (Date.now() - this.requestStarted < 500) return;

        this.requestStarted = Date.now();
        this.props.searchUnits(searchToken);
    }

    handleSearchBox(e) {
        const { value } = e.target;
        this.setState({ searchToken: value });
    }

    handleDrawer(e) {
        if (e.target.closest('#sheet') || e.key === "Escape") {
            this.resetDrawer();
        }
    }

    resetDrawer(){
        this.setState({
            drawerVisible: false,
            selectedYear: 0,
        })
        resetTrapFocus(document.getElementById('drawer'));
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
        if (!selectedYear)
            return;
        this.props.bookUnit(targetId, selectedYear);
        this.resetDrawer();
    }

}


function mapState(state) {
    const { userAuth, units} = state;
    const user = userAuth.data.user;
    const unitsTotal = units.total;
    const unitsData = units.data;
    const unitSingle = units.unitData;
    const loading = units.loading;
    const booking = units.booking;
    const error = units.error;
    return { user, unitsData, unitsTotal, unitSingle, booking, loading, error};
}

const actionCreators = {
    getUnits: unitActions.getAllPaged,
    getUnit:  unitActions.getUnitById,
    bookUnit: unitActions.bookUnit,
    searchUnits: unitActions.searchUnits
}

const connectedHomePage = connect(mapState, actionCreators)(Home);
export { connectedHomePage as Home };