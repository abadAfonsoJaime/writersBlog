import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import {
  MenuList,
  MenuItem,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Drawer
} from "@material-ui/core";

import { Menu } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    //flexGrow: 1,
    //zIndex: 1,
    //overflow: "hidden",
    //position: "relative",
    display: "flex"
    //width: "100%"
  },
  // drawer: {
  //   [theme.breakpoints.up("md")]: {
  //     width: drawerWidth
  //   }
  // },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    color: "white",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
    //minWidth: 0 So the Typography noWrap works
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

class Layout extends Component {
  state = {
    mobileOpen: false
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  render() {
    const {
      classes,
      location: { pathname },
      children,
      writers
    } = this.props;
    const { mobileOpen } = this.state;

    const drawer = (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>
        <MenuList>
          <MenuItem component={Link} to="/" selected={"/" === pathname}>
            Home
          </MenuItem>
          <MenuItem
            component={Link}
            to="/writers"
            selected={"/writers" === pathname}
          >
            Writter
          </MenuItem>
          <MenuList>
            {writers.map(({ id, name }) => {
              const to = `/writers/${id}`;
              return (
                <MenuItem
                  key={id}
                  className={classes.nested}
                  component={Link}
                  to={to}
                  selected={to === pathname}
                >
                  {name}
                </MenuItem>
              );
            })}
          </MenuList>
        </MenuList>
      </div>
    );

    return (
      <Fragment>
        <CssBaseline />

        <div className={classes.root}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Writers Blog
              </Typography>
            </Toolbar>
          </AppBar>
          {/* <nav className={classes.drawer} aria-label="Mailbox folders"> */}
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden mdUp>
            <Drawer
              //container={container}
              variant="temporary"
              //anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
          {/* </nav> */}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      </Fragment>
    );
  }
}

// The order does NOT matter
export default compose(
  withRouter,
  withStyles(styles)
)(Layout);
