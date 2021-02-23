import React from 'react';
import { SectionContainer } from '../generic/layout/SectionContainer';
import { GridLayout } from '../generic/layout/GridLayout';
import { MoneyDisplayInGrid } from '../generic/displays/MoneyDisplayInGrid';
import { SavingsData } from '../../types/savings/savings-data';

interface SavingsSectionProps {
  readonly data: SavingsData;
}

export function SavingsSection({
  data
}: SavingsSectionProps): React.ReactElement {
  return (
    <SectionContainer header={'Savings'} isDataValid={true}>
      <GridLayout columnsTemplate={'repeat(5, 200px) 1fr'}>
        <MoneyDisplayInGrid
          label={'Total Savings'}
          value={data.totalSavings}
          row={1}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Savings per Month'}
          value={data.savingsPerMonth}
          row={1}
          column={2}
        />
      </GridLayout>
    </SectionContainer>
  );
}
