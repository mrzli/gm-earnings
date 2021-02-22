import { ExchangeRates } from '../generic/exchange-rates';

export interface GeneralSectionOutputData {
  readonly isValid: boolean;
  readonly exchangeRates: ExchangeRates;
  readonly surtaxPercent: string;
}
