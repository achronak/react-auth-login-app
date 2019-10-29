import { unitActionConstants } from '../constants/client';


export function units(state = {}, action) {
  switch (action.type) {
    case unitActionConstants.UNITS_ALL_REQUEST:
        return {
            loading: true
        };
    case unitActionConstants.UNITS_ALL_SUCCESS:
        return {
            data: action.units.data
        };
    case unitActionConstants.UNITS_ALL_FAILURE:
        return { 
            error: action.error
        };

    case unitActionConstants.UNIT_ID_REQUEST:
      return {
        data: action.units
      };
    default:
      return state
  }
}
