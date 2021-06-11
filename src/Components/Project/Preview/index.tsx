//React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import FloatingIcons from "./FloatingIcons";
import TagChip from "../../Tag/Chip";
import Title from "./Title";
import RichText from "../../RichText";
import MatchHighlight from "../../MatchHighlight";
import DynamicImage from "../../DynamicImage";
import DynamicPaper from "../../DynamicPaper";
import HorizontalDivider from "../../Divider/Horizontal";
import { ResolvedProject } from "../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getProjectsSearch } from "../../../Redux";

//Material UI Imports
import {
  makeStyles,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

export const PROJECT_WIDTHS = {
  xl: 550,
  lg: 472,
  md: 432,
  sm: 450,
  xs: 300,
};

interface StyleProps {
  pushLeft: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  project: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2),

    [theme.breakpoints.only("xl")]: {
      width: PROJECT_WIDTHS.xl,
      marginRight: ({ pushLeft }) =>
        pushLeft ? PROJECT_WIDTHS.xl + 3 * theme.spacing(2) : theme.spacing(2),
    },

    [theme.breakpoints.only("lg")]: {
      width: PROJECT_WIDTHS.lg,
      marginRight: ({ pushLeft }) =>
        pushLeft ? PROJECT_WIDTHS.lg + 3 * theme.spacing(2) : theme.spacing(2),
    },

    [theme.breakpoints.only("md")]: {
      width: PROJECT_WIDTHS.md,
      marginRight: ({ pushLeft }) =>
        pushLeft ? PROJECT_WIDTHS.md + 3 * theme.spacing(2) : theme.spacing(2),
    },

    [theme.breakpoints.only("sm")]: {
      width: PROJECT_WIDTHS.sm,
    },

    [theme.breakpoints.only("xs")]: {
      width: PROJECT_WIDTHS.xs,
    },
  },
  projectTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  projectImage: {
    margin: theme.spacing(2, 0),

    [theme.breakpoints.only("xl")]: {
      width: 200,
    },

    [theme.breakpoints.only("lg")]: {
      width: 175,
    },

    [theme.breakpoints.only("md")]: {
      width: 175,
    },

    [theme.breakpoints.only("sm")]: {
      width: 150,
    },

    [theme.breakpoints.only("xs")]: {
      width: 125,
    },
  },
  projectDescription: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(2, 1),
  },
  projectTags: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(1),
  },
  projectTimeline: {
    margin: theme.spacing(1, 0),
  },
}));

export type ProjectProps = ResolvedProject & {
  pushLeft?: boolean;
};

const Project: FC<ProjectProps> = (props) => {
  const { id, title, image, tags, start, end, pushLeft = false } = props;
  const classes = useStyles({ pushLeft });
  const theme = useTheme();
  const search = useSelector(getProjectsSearch);
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <DynamicPaper className={classes.project}>
      <Paper className={classes.projectTop} elevation={3}>
        <FloatingIcons {...props} />
        <DynamicImage
          src={`${image.file.url}?w=200`}
          alt={image.title}
          className={classes.projectImage}
        />
        <Title title={title} id={id} />
      </Paper>
      <div className={classes.projectDescription}>
        <RichText richText={props.description as Document} toMatch={search} />
      </div>
      <HorizontalDivider />
      <div className={classes.projectTags}>
        {tags.map((tag) => (
          <TagChip key={tag.id} id={tag.id} />
        ))}
      </div>
      <HorizontalDivider />
      <Typography
        className={classes.projectTimeline}
        variant={isSizeXS ? "body2" : "body1"}
      >
        <MatchHighlight toMatch={search}>{start}</MatchHighlight> -{" "}
        <MatchHighlight toMatch={search}>{end ?? "Present"}</MatchHighlight>
      </Typography>
    </DynamicPaper>
  );
};

export default Project;