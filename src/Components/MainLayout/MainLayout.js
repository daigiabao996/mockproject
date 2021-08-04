import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import BallotIcon from "@material-ui/icons/Ballot";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MapIcon from "@material-ui/icons/Map";
import MenuIcon from "@material-ui/icons/Menu";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { GlobalActions } from "../../Redux/rootActions";
import { checkToken } from "../../utilities/checkToken";
import SelectionLanguage from "../SelectionLanguage/SelectionLanguage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  navigation: {
    "&>a": {
      textDecoration: "none",
      width: "100%",
      "& button": {
        marginRight: "16px",
        width: "100%",
        justifyContent: "flex-start",
      },
    },
    "& a.active": {
      "& button": {
        backgroundColor: "pink",
      },
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  headerName: {
    display: "flex",
  },
  modeButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "20px",
  },
  loginButton: {
    textDecoration: "none",
  },
  logButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    flexGrow: 1,
    padding: theme.spacing(3),
    width: "100%",
  },
}));

function MainLayout(props) {
  const { window } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const globalState = useSelector((state) => state.GlobalReducer);
  const [selected, setSelected] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const history = useHistory();
  const handleChangeModeTheme = () => {
    setSelected(!selected);
    if (selected) {
      dispatch(GlobalActions.changeTheme({ theme: "light" }));
    } else {
      dispatch(GlobalActions.changeTheme({ theme: "dark" }));
    }
  };

  const handleChangeLanguage = (value) => {
    dispatch(GlobalActions.changeLanguage({ language: value }));
  };
  const handleSignOut = () => {
    localStorage.removeItem("user");
    history.push("/");
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { t } = useTranslation();
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem className={classes.navigation}>
          <NavLink exact to={"/home"}>
            <Button startIcon={<HomeOutlinedIcon />}>{t("common.home")}</Button>
          </NavLink>
        </ListItem>
        <ListItem className={classes.navigation}>
          <NavLink exact to={"/"}>
            <Button startIcon={<BallotIcon />}>{t("common.news")}</Button>
          </NavLink>
        </ListItem>
        <ListItem className={classes.navigation}>
          <NavLink exact to={"/overview"}>
            <Button startIcon={<MapIcon />}>{t("common.overview")}</Button>
          </NavLink>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <SelectionLanguage
            onChangeLanguage={handleChangeLanguage}
            currentLanguage={globalState.language}
          />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.headerName}>
            Covid-19
          </Typography>
          <Box flex="1 0 auto" />
          <ToggleButton
            value="check"
            selected={globalState.theme === "dark" ? true : false}
            onChange={handleChangeModeTheme}
            className={classes.modeButton}
          >
            {globalState.theme === "dark" ? (
              <Brightness4Icon />
            ) : (
              <Brightness7Icon />
            )}
          </ToggleButton>
          {checkToken() ? (
            <Button
              variant="contained"
              color="secondary"
              className={classes.logButton}
              onClick={handleSignOut}
            >
              {t("common.logout")}
            </Button>
          ) : (
            <Link to={"/login"} className={classes.loginButton}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.logButton}
              >
                {t("common.login")}
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default MainLayout;
