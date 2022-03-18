import { RootState } from "MyTypes";
import React from "react";
import { connect } from "react-redux";
import { selectProfile } from "../store/auth/duck/selectors";
import CompanyProfile from "./CompanyProfile";
import UserProfile from "./UserProfile";

interface Props{
  profile: any;
}

// this component checks if the user role is 1 or 2 then it renders the right component
const Profile = ({profile} : Props) => {

  if(profile?.role === 1){
    return (
      <UserProfile profile={profile} />
    );
  }

  return (
    <CompanyProfile />
  );
};

const mapStateToProps = (state: RootState) => ({
  profile: selectProfile(state),
});

// TODO: can remove this mapStateToProps
export default connect(mapStateToProps, null)(Profile);