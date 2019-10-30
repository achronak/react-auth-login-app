import { unitActionConstants } from '../constants/client';

const initialState = {data: []};

export function units(state = initialState, action) {
  switch (action.type) {
    case unitActionConstants.UNITS_ALL_REQUEST:
      return {
          loading: true,
          data: state.data,
          booking: state.booking
      };
    case unitActionConstants.UNITS_ALL_SUCCESS:
      return {
          data: state.data.concat(action.units.data),
          total: action.units.meta.totalCount,
          booking: state.booking
      };
    case unitActionConstants.UNITS_ALL_FAILURE:
      return { 
          error: action.error,
          data: state.data,
          total: state.total
      };
    
    case unitActionConstants.UNIT_ID_REQUEST:
      return {
        loading: true,
        data: state.data,
        total: state.total,
        booking: state.booking
      };
    case unitActionConstants.UNIT_ID_SUCCESS:
      return {
        data: state.data,
        total: state.total,
        unitData: action.units,
        booking: state.booking
      };
    case unitActionConstants.UNIT_ID_FAILURE:
      return { 
          error: action.error,
          data: state.data,
          total: state.total,
          unitData: state.unitData,
      };

    case unitActionConstants.UNITS_BOOK_REQUEST:
      return {
        data: state.data,
        total: state.total,
        unitData: state.unitData
      };
    case unitActionConstants.UNITS_BOOK_SUCCESS:
      return {
        data: state.data,
        total: state.total,
        unitData: state.unitData,
        booking: action.bookingReference
      };
    case unitActionConstants.UNITS_BOOK_FAILURE:
      return { 
          error: action.error,
          data: state.data,
          total: state.total,
          unitData: state.unitData,
      };
    default:
      return state
  }
}
