import { unitActionConstants } from '../constants/client';
import { unitService } from '../services/unitService';

export const unitActions = {
    getAllPaged,
    getUnitById,
    bookUnit,
    searchUnits
};

function getAllPaged(page) {
    return dispatch => {
        dispatch({ type: unitActionConstants.UNITS_ALL_REQUEST });

        unitService.getAllPaged(page)
            .then(
                units => dispatch(
                    { type: unitActionConstants.UNITS_ALL_SUCCESS, units }
                ),
                error => dispatch(
                    { type: unitActionConstants.UNITS_ALL_FAILURE, error }
                )
            );
    };
}


function getUnitById(id) {
    return dispatch => {
        dispatch({ type: unitActionConstants.UNIT_ID_REQUEST });

        unitService.getById(id)
            .then(
                units => dispatch(
                    { type: unitActionConstants.UNIT_ID_SUCCESS, units }
                ),
                error => dispatch(
                    { type: unitActionConstants.UNIT_ID_FAILURE, error }
                )
            );
    };
}

function bookUnit(unitId, year) {
    return dispatch => {
        dispatch({ type: unitActionConstants.UNITS_BOOK_REQUEST });

        unitService.book(unitId, year)
            .then(
                bookingReference => dispatch(
                    { type: unitActionConstants.UNITS_BOOK_SUCCESS, bookingReference }
                ),
                error => dispatch(
                    { type: unitActionConstants.UNITS_BOOK_FAILURE, error }
                )
            );
    };
}


function searchUnits(str) {
    return dispatch => {
        dispatch({ type: unitActionConstants.UNITS_SEARCH_REQUEST });

        unitService.search(str)
            .then(
                units => dispatch(
                    { type: unitActionConstants.UNITS_SEARCH_SUCCESS, units }
                ),
                error => dispatch(
                    { type: unitActionConstants.UNITS_SEARCH_FAILURE, error }
                )
            );
    };
}