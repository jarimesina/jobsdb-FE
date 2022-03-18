import { Box, AppBar, CssBaseline, Toolbar, Typography, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@mui/material";
import React, {Dispatch, ReactNode, useEffect, useMemo} from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@material-ui/icons/Menu';
import { connect } from "react-redux";
import { RootState } from "MyTypes";
import { selectProfile } from "../../store/auth/duck/selectors";
import { useHistory } from 'react-router-dom';
import CustomIcon from "./CustomIcon";
import * as Muicon from "@material-ui/icons";
import { setToken } from '../../api/axios';
import * as AuthActions from '../../store/auth/duck/actions';

const drawerWidth = 240;

interface Props {
  window?: any;
  profile: any;
  children: ReactNode;
  fetchProfile: () => void;
  logout: () => void;
}

// TODO: call fetchProfile here to get the state
const NewNavigation = ({window, profile, children, fetchProfile, logout} : Props) => {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("AUTH_KEY");
    setToken(token);
    // TODO: fix issue when person tries to make a new company e.g. make a new company then user won't see his profile
    if(token && fetchProfile){
      fetchProfile();
    }
  }, [localStorage.getItem("AUTH_KEY"), fetchProfile]);

  // TODO: fix issue with navigation always changing
  // TODO: improve these arrays. they're hurting my eyes
  const SIDEBAR_ITEMS = [
    {
      routeName: 'My Profile',
      onClick: () => {
        history.push('/myProfile');
      },
      route: '/myProfile',
      icon: Muicon.Person,
    },
    {
      routeName: 'My Saved Jobs',
      onClick: () => {
        history.push('/mySavedJobs');
      },
      route: '/mySavedJobs',
      icon: Muicon.Save,
    },
    {
      routeName: 'Applied Jobs',
      onClick: () => {
        history.push('/myAppliedJobs');
      },
      route: '/myAppliedJobs',
      icon: Muicon.Email,
    },
    {
      routeName: 'Find Jobs',
      onClick: () => {
        history.push('/');
      },
      icon: Muicon.Work,
      route: '/',
    },
    {
      routeName: 'Log Out',
      onClick: () => {
        logout();
        // cookies.remove('AUTH_KEY', {path: '/'});
        localStorage.removeItem('AUTH_KEY');
        setToken('');
        history.push('/login');
      },
      icon: Muicon.ExitToApp,
    }
  ];

  const ADMIN_SIDEBAR_ITEMS = [
    {
      routeName: 'My Profile',
      onClick: () => {
        history.push('/myProfile');
      },
      route: '/myProfile',
      icon: Muicon.Person,
    },
    {
      routeName: 'Find Jobs',
      onClick: () => {
        history.push('/');
      },
      icon: Muicon.Work,
      route: '/',
    },
    {
      routeName: 'Create Jobs',
      onClick: () => {
        history.push('/createJob');
      },
      icon: Muicon.Create,
      route: '/',
    },
    {
      routeName: 'Edit My Jobs',
      onClick: () => {
        history.push('/editJobs');
      },
      icon: Muicon.Create,
      route: '/editJobs',
    },
    {
      routeName: 'Log Out',
      onClick: () => {
        logout();
        // cookies.remove('AUTH_KEY', {path: '/'});
        localStorage.removeItem('AUTH_KEY');
        setToken('');
        history.push('/login');
      },
      icon: Muicon.ExitToApp,
    }
  ];

  const TEMP = profile?.role === 1 ? SIDEBAR_ITEMS : ADMIN_SIDEBAR_ITEMS;

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {TEMP.map((item, index) => (
          <ListItem button key={`${item.routeName}-${index}`} onClick={item.onClick}>
            <ListItemIcon>
              <CustomIcon variation={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.routeName} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ background: '#8b5cf6' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            JOBSDB
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

const mapStateToProps = (state: RootState) => ({
  profile: selectProfile(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  logout: () => dispatch(AuthActions.logout()),
  fetchProfile: () => dispatch(AuthActions.fetchProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewNavigation);
