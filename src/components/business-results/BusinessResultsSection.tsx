import React from 'react';
import { SectionContainer } from '../generic/SectionContainer';
import { GridLayout } from '../generic/GridLayout';
import { BusinessResultsData } from '../../types/business-results/business-results-data';
import { MoneyDisplayInGrid } from '../generic/MoneyDisplayInGrid';
import { DividerInGrid } from '../generic/DividerInGrid';

interface BusinessResultsSectionProps {
  readonly data: BusinessResultsData;
}

export function BusinessResultsSection({
  data
}: BusinessResultsSectionProps): React.ReactElement {
  return (
    <SectionContainer header={'Business Results'} isDataValid={true}>
      <GridLayout columnsTemplate={'repeat(5, 200px) 1fr'}>
        <MoneyDisplayInGrid
          label={'Total Earnings'}
          value={data.totalEarnings}
          row={1}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Total VAT'}
          value={data.totalVat}
          row={1}
          column={2}
        />
        <MoneyDisplayInGrid
          label={'Generic Business Expenses'}
          value={data.genericBusinessExpenses}
          row={2}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Business Expenses VAT'}
          value={data.businessExpensesVat}
          row={2}
          column={2}
        />
        <MoneyDisplayInGrid
          label={'Salary Expenses'}
          value={data.salaryExpenses}
          row={2}
          column={3}
        />
        <MoneyDisplayInGrid
          label={'Bank Expenses'}
          value={data.bankExpenses}
          row={2}
          column={4}
        />
        <MoneyDisplayInGrid
          label={'Total Business Expenses'}
          value={data.totalBusinessExpenses}
          row={2}
          column={5}
        />
        <DividerInGrid row={4} span={6} />
        <MoneyDisplayInGrid
          label={'Business Net Earnings'}
          value={data.businessNetEarnings}
          row={5}
          column={1}
        />
        <MoneyDisplayInGrid
          label={'Remaining VAT'}
          value={data.businessRemainingVat}
          row={5}
          column={2}
        />
        <MoneyDisplayInGrid
          label={'Personal Salary Income p/y'}
          value={data.personalSalaryIncome}
          row={5}
          column={3}
        />
      </GridLayout>
    </SectionContainer>
  );
}
