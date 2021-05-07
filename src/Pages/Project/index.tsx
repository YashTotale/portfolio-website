// React Imports
import React, { FC } from "react";
import { useParams } from "react-router";
import Display from "./Display";
import Tags from "./Tags";
import NotFound from "../NotFound";
import { useProjects } from "../../Context/DataContext";

// Material UI Imports
import {
  CircularProgress,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    padding: theme.spacing(2),
    width: "75%",
  },
  project: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1, 2, 2),
    width: "100%",
  },
  projectTitle: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  divider: {
    height: "2px",
  },
}));

interface Params {
  id: string;
}

const Project: FC = () => {
  const { id } = useParams<Params>();
  const classes = useStyles();
  const projects = useProjects();

  if (projects === null)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  const project = projects[id];

  if (!project)
    return (
      <NotFound
        name="project"
        redirect="/projects"
        redirectName="Projects Page"
      />
    );

  return (
    <Container>
      <Paper className={classes.project}>
        <Typography
          variant="h3"
          align="center"
          className={classes.projectTitle}
        >
          {project.title}
        </Typography>
        <Divider flexItem className={classes.divider} />
        <Display {...project} />
        <Divider flexItem className={classes.divider} />
        <Tags {...project} />
      </Paper>
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default Project;
