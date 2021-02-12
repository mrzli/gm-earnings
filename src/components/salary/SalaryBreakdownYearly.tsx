import React from 'react';
import { SalaryBreakdownYearlyData } from '../../types/salary/salary-breakdown-yearly-data';
import { GridLayout } from '../generic/GridLayout';
import { MoneyDisplayInGrid } from '../generic/MoneyDisplayInGrid';

interface SalaryBreakdownYearlyProps {
  readonly data: SalaryBreakdownYearlyData;
}

export function SalaryBreakdownYearly({
  data
}: SalaryBreakdownYearlyProps): React.ReactElement {
  return (
    <GridLayout columnsTemplate={'240px 200px'}>
      <MoneyDisplayInGrid
        label={'Health Insurance:'}
        value={data.healthInsurance}
        row={1}
        column={1}
      />
      <MoneyDisplayInGrid
        label={'Retirement Payments:'}
        value={data.retirementPayments}
        row={2}
        column={1}
      />
      <MoneyDisplayInGrid label={'Tax:'} value={data.tax} row={3} column={1} />
      <MoneyDisplayInGrid
        label={'Gross 2 Salary:'}
        value={data.gross2Salary}
        row={4}
        column={1}
      />
      <MoneyDisplayInGrid
        label={'Net Salary:'}
        value={data.netSalary}
        row={5}
        column={1}
      />
    </GridLayout>
  );
}
