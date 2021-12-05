import React, { Dispatch } from "react";
import { connect } from "react-redux";
import * as AuthActions from '../../store/auth/duck/actions';
import { setToken } from '../../api/axios';
import { Cookies } from "react-cookie";
import { useHistory } from 'react-router-dom';

interface Props{
  logout: () => void;
}

const SideBar: React.FC<Props>  = ({children, logout}) => {

  const cookies = new Cookies();
  const history = useHistory();

  const items = [
    {
      routeName: 'My Profile'
    },
    {
      routeName: 'View/Find Jobs'
    },
    {
      routeName: 'Create Jobs'
    },
    {
      routeName: 'Edit Jobs'
    },
    {
      routeName: 'Log Out',
      onClick: () => {
        cookies.remove('AUTH_KEY', {path: '/'});
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
});

export default connect(mapDispatchToProps)(SideBar);