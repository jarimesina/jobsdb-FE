import React from 'react'

interface Props{
  label: string;
  formikName: string;
  onChange: () => void;
}

export const JdTextArea: React.FC<Props> = ({label, formikName, onChange}) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <textarea rows={4} className="border border-black rounded-md px-2 py-0.5 resize-none" name={formikName} onChange={onChange}/>
    </div>
  );
}