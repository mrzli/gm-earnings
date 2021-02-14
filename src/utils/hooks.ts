import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface InputOutputDataResult<TInputData, TOutputData> {
  readonly inputData: TInputData;
  readonly setInputData: Dispatch<SetStateAction<TInputData>>;
  readonly outputData: TOutputData;
}

export function useInputOutputData<TInputData, TOutputData>(
  defaultInputData: TInputData,
  defaultOutputData: TOutputData,
  outputDataConverter: (inputData: TInputData) => TOutputData,
  onOutputDataChanged: (outputData: TOutputData) => void
): InputOutputDataResult<TInputData, TOutputData> {
  const [inputData, setInputData] = useState(defaultInputData);
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

  return {
    inputData,
    setInputData,
    outputData
  };
}
