import { unitActionConstants } from '../constants/client';

const initialState = {data: []};

export function units(state = initialState, action) {
  switch (action.type) {
    case unitActionConstants.UNITS_ALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case unitActionConstants.UNITS_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.concat(action.units.data),
        total: action.units.meta.totalCount,  
      };
    case unitActionConstants.UNITS_ALL_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    
    case unitActionConstants.UNIT_ID_REQUEST:
      return {
        ...state,
        loading: true,
        unitData: null
      };
    case unitActionConstants.UNIT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        unitData: action.units,
      };
    case unitActionConstants.UNIT_ID_FAILURE:
      return { 
        ...state,
        error: action.error,
      };

    case unitActionConstants.UNITS_BOOK_REQUEST:
      return {
        ...state,
        booking: null,
        error: null
      };
    case unitActionConstants.UNITS_BOOK_SUCCESS:
      return {
        ...state,
        booking: action.bookingReference,
      };
    case unitActionConstants.UNITS_BOOK_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state
  }
}
