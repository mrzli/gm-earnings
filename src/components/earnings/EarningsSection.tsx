import React from 'react';
import { SectionContainer } from '../generic/SectionContainer';
import { InputAmountWithVat } from '../../types/input-amount-with-vat';
import { EarningsInputData } from '../../types/earnings-input-data';

interface EarningsSectionProps {}

enum EarningsSectionInputActionType {
  SetWorkingDays = 'SetWorkingDays',
  SetWorkingHours = 'SetWorkingHours',
  SetHourlyRate = 'SetHourlyRate'
}

interface ActionSetWorkingDays {
  readonly type: EarningsSectionInputActionType.SetWorkingDays;
  readonly payload: number;
}

interface ActionSetWorkingHours {
  readonly type: EarningsSectionInputActionType.SetWorkingHours;
  readonly payload: number;
}

interface ActionSetHourlyRate {
  readonly type: EarningsSectionInputActionType.SetHourlyRate;
  readonly payload: InputAmountWithVat;
}

type EarningsSectionInputAction =
  | ActionSetWorkingDays
  | ActionSetWorkingHours
  | ActionSetHourlyRate;

function earningsSectionInputReducer(
  state: EarningsInputData,
  action: EarningsSectionInputAction
): EarningsInputData {
  switch (action.type) {
    case EarningsSectionInputActionType.SetWorkingDays:
      return { ...state, workingDays: action.payload };
    case EarningsSectionInputActionType.SetWorkingHours:
      return { ...state, workingHours: action.payload };
    case EarningsSectionInputActionType.SetHourlyRate:
      return { ...state, hourlyRate: action.payload };
    default:
      return state;
  }
}

export function EarningsSection(
  props: EarningsSectionProps
): React.ReactElement {
  return (
    <SectionContainer header={'Earnings'}>
      <div>ddd</div>
    </SectionContainer>
  );
}
