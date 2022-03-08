import { Box, AppBar, CssBaseline, Toolbar, Typography, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@mui/material";
import * as React from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@material-ui/icons/Menu';
import { connect } from "react-redux";
import { RootState } from "MyTypes";
import { selectProfile } from "../../store/auth/duck/selectors";
import { ReactNode, useMemo } from "react";
import { useHistory } from 'react-router-dom';
import CustomIcon from "./CustomIcon";
import * as Muicon from "@material-ui/icons";

const drawerWidth = 240;

interface Props {
  window?: any;
  profile: any;
  children: ReactNode;
}

const NewNavigation = ({window, profile, children} : Props) => {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const history = useHistory();

  // TODO: improve these arrays. they're hurting my eyes
  const sideBarItems = useMemo(()=>{
    if(profile?.role === 1){
      return [
        {
          routeName: 'My Profile',
          onClick: () => {
            history.push('/myProfile');
          },
          icon: Muicon.Person,
        },
        {
          routeName: 'My Saved Jobs',
          onClick: () => {
            history.push('/mySavedJobs');
          },
          icon: Muicon.Inbox,
        },
        {
          routeName: 'Applied Jobs',
          // icon: Muicon.Inbox,
        },
        {
          routeName: 'Find Jobs',
          onClick: () => {
            history.push('/');
          },
          // icon: Muicon.Inbox,
        },
        {
          routeName: 'Create Jobs',
          onClick: () => {
            history.push('/createJob');
          },
          // icon: Muicon.Inbox,
        },
        {
          routeName: 'Edit My Jobs',
          onClick: () => {
            history.push('/editJobs');
          },
          // icon: Inbox,
        },
        {
          routeName: 'Log Out',
          onClick: () => {
            // logout();
            // cookies.remove('AUTH_KEY', {path: '/'});
            // localStorage.removeItem('AUTH_KEY');
            // setToken('');
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
        },
        icon: Muicon.Person,
      },
      {
        routeName: 'Find Jobs',
        onClick: () => {
          history.push('/');
        },
        icon: Muicon.Work,
      },
      {
        routeName: 'Create Jobs',
        onClick: () => {
          history.push('/createJob');
        },
        icon: Muicon.Create,
      },
      {
        routeName: 'Edit My Jobs',
        onClick: () => {
          history.push('/editJobs');
        },
        icon: Muicon.Edit,
      },
      {
        routeName: 'Log Out',
        onClick: () => {
          // logout();
          // cookies.remove('AUTH_KEY', {path: '/'});
          // localStorage.removeItem('AUTH_KEY');
          // setToken('');
          history.push('/login');
        },
        icon: Muicon.ExitToApp,
      }
    ];
  }, [profile?.role]);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {sideBarItems.map((item, index) => (
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
        <Toolbar>
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
            Responsive drawer
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
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
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

export default connect(mapStateToProps, null)(NewNavigation);
