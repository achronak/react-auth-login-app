import { unitActionConstants } from '../constants/client';
import { unitService } from '../services/unitService';
import { history } from '../helpers/utils';

export const unitActions = {
    getAllPaged
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
