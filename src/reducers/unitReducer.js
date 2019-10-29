import { unitActionConstants } from '../constants/client';

const initialState = {data: []};

export function units(state = initialState, action) {
  switch (action.type) {
    case unitActionConstants.UNITS_ALL_REQUEST:
        return {
            loading: true,
            data: state.data,
        };
    case unitActionConstants.UNITS_ALL_SUCCESS:
        return {
            data: state.data.concat(action.units.data),
            total: action.units.meta.totalCount
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
