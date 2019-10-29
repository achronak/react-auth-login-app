import { unitActionConstants } from '../constants/client';
import { unitService } from '../services/unitService';
import { history } from '../helpers/utils';

export const unitActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch({ type: unitActionConstants.UNITS_ALL_REQUEST });

        unitService.getAll()
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
