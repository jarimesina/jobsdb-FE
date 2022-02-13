import React from 'react';

interface OptionItem{
  value: string;
  name: string;
  isDisabled?: boolean;
}

interface Props{
  formikName: string;
  optionList: OptionItem[];
  handleOnChange?: any;
}

export const JdSelect:React.FC<Props> = ({ optionList, formikName, handleOnChange }) => {
  return (
    <select className="border border-black rounded-md h-14" name={formikName} onChange={(e)=>handleOnChange(e)}>
      {optionList.map((option, idx) => <option disabled={option?.isDisabled} value={option.value} key={idx}>{option.name}</option>)}
    </select>
  );
}
