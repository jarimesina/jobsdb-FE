import React from 'react';

interface OptionItem{
  value: string;
  name: string;
}

interface Props{
  formikName: string;
  optionList: OptionItem[];
  handleOnChange?: any;
}

export const JdSelect:React.FC<Props> = ({ optionList, formikName, handleOnChange }) => {
  return (
    <select className="border border-black rounded-md h-7" name={formikName} onChange={(e)=>handleOnChange(e)}>
      {optionList.map((option, idx) => <option value={option.value} key={idx}>{option.name}</option>)}
    </select>
  );
}
