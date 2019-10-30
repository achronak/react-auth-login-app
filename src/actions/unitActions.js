import { unitActionConstants } from '../constants/client';
import { unitService } from '../services/unitService';

export const unitActions = {
    getAllPaged,
    getUnitById
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
                    { type: unitActionConstants.GETALL_FAILURE, error }
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