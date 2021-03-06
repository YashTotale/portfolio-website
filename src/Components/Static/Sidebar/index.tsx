// React Imports
import React, { FC } from "react";
import Contents from "./Contents";
import { SIDEBAR_WIDTH } from "../../../Utils/constants";

// Redux Imports
import { useSelector } from "react-redux";
import { getIsSidebarOpen, toggleSidebar } from "../../../Redux";
import { useAppDispatch } from "../../../Store";

// Material UI Imports
import { Drawer, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: SIDEBAR_WIDTH,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
  },
}));

const Sidebar: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const isSidebarOpen = useSelector(getIsSidebarOpen);
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <nav className={classes.drawer}>
      {isSmall ? (
        <Drawer
          variant="temporary"
          anchor="left"
          open={isSidebarOpen}
          onClose={() => dispatch(toggleSidebar(false))}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Contents />
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          anchor="left"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Contents />
        </Drawer>
      )}
    </nav>
  );
};

export default Sidebar;
