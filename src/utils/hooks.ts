import { useEffect, useState } from 'react';

export function useUpdateOutputData<TInputData, TOutputData>(
  inputData: TInputData,
  defaultOutputData: TOutputData,
  outputDataConverter: (inputData: TInputData) => TOutputData,
  onOutputDataChanged: (outputData: TOutputData) => void
): TOutputData {
  const [outputData, setOutputData] = useState(defaultOutputData);

  useEffect(
    () => {
      const newOutputData = outputDataConverter(inputData);
      setOutputData(newOutputData);
      onOutputDataChanged(newOutputData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputData]
  );

  return outputData;
}
