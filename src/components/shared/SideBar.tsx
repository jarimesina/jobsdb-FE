import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import * as AuthActions from '../../store/auth/duck/actions';
import { setToken } from '../../api/axios';
import { Cookies } from "react-cookie";
import { useHistory } from 'react-router-dom';
import { RootState } from "MyTypes";
import { selectProfile } from "../../store/auth/duck/selectors";
import { useMemo } from "react";

interface Props{
  logout: () => void;
  fetchProfile: () => void;
  profile: any;
}

const SideBar: React.FC<Props>  = ({children, logout, fetchProfile, profile}) => {

  const cookies = new Cookies();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("AUTH_KEY");
    setToken(token);
    if(token && fetchProfile){
      fetchProfile();
    }
  }, [localStorage.getItem("AUTH_KEY"), fetchProfile]);

  const sideBarItems = useMemo(()=>{
    if(profile?.role === 1){
      return [
        {
          routeName: 'My Profile',
          onClick: () => {
            history.push('/myProfile');
          }
        },
        {
          routeName: 'My Saved Jobs',
          onClick: () => {
            history.push('/mySavedJobs');
          }
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
            history.push('/login');
          }
        }
      ];
    }
    return [
      {
        routeName: 'My Profile',
        onClick: () => {
          history.push('/myProfile');
        }
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
          history.push('/login');
        }
      }
    ];
  }, [profile?.role]);

  return (
    <div className="flex flex-row" style={{ minHeight: '100vh'}}>
      <div className="w-1/6 bg-purple-500 h-screen" style={{ height: 'auto'}}>
        {profile?.first_name && profile?.last_name ? (
          <div className="ml-4 mb-10 text-white">
            Hello {profile?.first_name} {profile?.last_name}!
          </div>
        ) : (
          <div className="ml-4 mb-10 mt-10 text-white">
            Hello user!
          </div>
        )}
        <ul className="text-white">
          {
            sideBarItems.map((item, index)=> (
              <div key={`${item.routeName}-${index}`}>
                {/* TODO: add icons here and add some highlight on selected icons */}
                {/* TODO: implement smooth scrolling */}
                <li className="ml-4 mt-4 hover: cursor-pointer" onClick={item.onClick}>{item.routeName}</li>
              </div>
            ))
          }
        </ul>
      </div>
      <div className="w-5/6 bg-gray-300">
        {profile && children}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  profile: selectProfile(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  logout: () => dispatch(AuthActions.logout()),
  fetchProfile: () => dispatch(AuthActions.fetchProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);