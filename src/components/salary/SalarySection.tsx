import React from 'react';
import { SectionContainer } from '../generic/SectionContainer';
import { GridLayout } from '../generic/GridLayout';
import { SalarySectionInputData } from '../../types/salary/salary-section-input-data';
import { SalarySectionOutputData } from '../../types/salary/salary-section-output-data';

interface SalarySectionProps {
  readonly defaultInputData: SalarySectionInputData;
  readonly onOutputDataChanged: (data: SalarySectionOutputData) => void;
}

export function SalarySection({
  defaultInputData,
  onOutputDataChanged
}: SalarySectionProps): React.ReactElement {
  return (
    <SectionContainer header={'Salary'} isDataValid={true}>
      <GridLayout columnsTemplate={'repeat(4, 200px), 1fr'}>
        <div>Content</div>
      </GridLayout>
    </SectionContainer>
  );
}
