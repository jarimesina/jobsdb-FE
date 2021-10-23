import React from 'react'

interface Props{
  label: string;
  formikName: string;
  onChange: () => void;
  type?: string;
}

export const JdInput: React.FC<Props> = ({label, formikName, onChange, type="text"}) => {
  return (
    <>
      <label>{label}</label>
      <input type={type} className="border border-black rounded-md px-2 py-0.5" name={formikName} onChange={onChange}/>
    </>
  );
}