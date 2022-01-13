import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import * as AuthActions from '../../store/auth/duck/actions';
import { setToken } from '../../api/axios';
import { Cookies } from "react-cookie";
import { useHistory } from 'react-router-dom';

interface Props{
  logout: () => void;
  fetchProfile: () => void;
}

const SideBar: React.FC<Props>  = ({children, logout, fetchProfile}) => {

  const cookies = new Cookies();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("AUTH_KEY");
    setToken(token);
    if(token && fetchProfile){
      fetchProfile();
    }
  }, [localStorage.getItem("AUTH_KEY"), fetchProfile]);

  const items = [
    {
      routeName: 'My Profile',
      onClick: () => {
        history.push('/myProfile');
      }
    },
    {
      routeName: 'My Saved Jobs',

    },
    {
      routeName: 'Applied Jobs',

    },
    {
      routeName: 'Find Jobs',
      onClick: () => {
        history.push('/');
      }
    },
    {
      routeName: 'Create Jobs',
      onClick: () => {
        history.push('/createJob');
      }
    },
    {
      routeName: 'Edit My Jobs',
      onClick: () => {
        history.push('/editJobs');
      }
    },
    {
      routeName: 'Log Out',
      onClick: () => {
        logout();
        cookies.remove('AUTH_KEY', {path: '/'});
        localStorage.removeItem('AUTH_KEY');
        setToken('');
        // window.location.reload();
        history.push('/register');
      }
    }
  ]
  return (
  <div className="flex flex-row" style={{ minHeight: '100vh'}}>
    <div className="w-1/6 bg-purple-500 h-screen" style={{ height: 'auto'}}>
      <ul className="text-white">
        {
          items.map((item, index)=> (
            <li key={index} className="ml-4 mt-4 hover: cursor-pointer" onClick={item.onClick}>{item.routeName}</li>
          ))
        }
      </ul>
    </div>
    <div className="w-5/6">
      {children}
    </div>
  </div>);
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  logout: () => dispatch(AuthActions.logout()),
  fetchProfile: () => dispatch(AuthActions.fetchProfile()),
});

export default connect(null, mapDispatchToProps)(SideBar);