// React Imports
import React, { FC } from "react";
import { ProjectFields } from "../../Utils/types";
import Info from "../../Components/Project/Info";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { getImageTitle, getImageUrl } from "../../API/helpers";

const useStyles = makeStyles((theme) => ({
  projectInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(2, 0),
  },
  projectImage: {
    width: 200,
    marginLeft: theme.spacing(1),
  },
  projectDescription: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
}));

const Display: FC<ProjectFields> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.projectInfo}>
      <img
        src={getImageUrl(props.image)}
        alt={getImageTitle(props.image)}
        className={classes.projectImage}
      />
      <div className={classes.projectDescription}>
        <Info {...props} />
      </div>
    </div>
  );
};

export default Display;
