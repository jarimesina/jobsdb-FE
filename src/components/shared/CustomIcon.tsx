import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

interface Props {
  variation: typeof SvgIcon;
  otherProps?: any;
}

const CustomIcon = ({variation, otherProps} : Props) => {
  
  console.log('variation', variation);
  const IconName = variation;

  if(!IconName){
    return null;
  }
  return <IconName {...otherProps} />;
};

export default CustomIcon;