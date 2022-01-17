import React from "react";
import CompanyProfile from "./CompanyProfile";

// this component checks if the user role is 1 or 2 then it renders the right component for it
export const Profile: React.FC = () => {

  // TODO: check user role to see which profile to display: company/normal user
  return (
    <CompanyProfile />
  );
}