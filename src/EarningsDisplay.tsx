import React, { useReducer } from 'react';
import { TextField } from '@material-ui/core';

interface InputDataState {
  readonly workingDays: number;
  readonly workingHours: number;
  readonly hourlyRate: number;
}

const initialInputDataState: InputDataState = {
  workingDays: 0,
  workingHours: 0,
  hourlyRate: 0
};

enum InputDataActionType {
  SetWorkingDays = 'SetWorkingDays',
  SetWorkingHours = 'SetWorkingHours',
  SetHourlyRate = 'SetHourlyRate'
}

interface ActionSetWorkingDays {
  readonly type: InputDataActionType.SetWorkingDays;
  readonly payload: number;
}

interface ActionSetWorkingHours {
  readonly type: InputDataActionType.SetWorkingHours;
  readonly payload: number;
}

interface ActionSetHourlyRate {
  readonly type: InputDataActionType.SetHourlyRate;
  readonly payload: number;
}

type InputDataAction =
  | ActionSetWorkingDays
  | ActionSetWorkingHours
  | ActionSetHourlyRate;

function inputDataReducer(
  state: InputDataState,
  action: InputDataAction
): InputDataState {
  switch (action.type) {
    case InputDataActionType.SetWorkingDays:
      return { ...state, workingDays: action.payload };
    case InputDataActionType.SetWorkingHours:
      return { ...state, workingHours: action.payload };
    case InputDataActionType.SetHourlyRate:
      return { ...state, hourlyRate: action.payload };
    default:
      return state;
  }
}

export function EarningsDisplay(): React.ReactElement {
  const inputDataState = useReducer(inputDataReducer, initialInputDataState);

  inputDataState.entries();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'fit-content(50%) fit-content(50%)'
      }}
    >
      <div style={{ gridRowStart: 1, gridColumnStart: 1 }}>
        Broj radnih dana:
      </div>
      <div style={{ gridRowStart: 1, gridColumnStart: 2 }}>
        <TextField type={'number'} />
      </div>
    </div>
  );
}
