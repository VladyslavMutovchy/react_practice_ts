// actions/actionAbout.ts

import { Dispatch } from 'redux';

export const SET_DATA = 'SET_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';

interface SetDataAction {
  type: typeof SET_DATA;
  payload: string;
}

interface ClearDataAction {
  type: typeof CLEAR_DATA;
}

export const setData = (data: string) => (dispatch: Dispatch<SetDataAction>) => {
  dispatch({
    type: SET_DATA,
    payload: data,
  });
};

export const clearData = () => (dispatch: Dispatch<ClearDataAction>) => {
  dispatch({
    type: CLEAR_DATA,
  });
};

export type DataActionTypes = SetDataAction | ClearDataAction;
