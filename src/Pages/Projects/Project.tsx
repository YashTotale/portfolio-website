//React Imports
import React, { FC } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { getImageTitle, getImageUrl } from "../../API/helpers";
import { ProjectFields, TagFields } from "../../Utils/types";

//Material UI Imports
import {
  Avatar,
  Chip,
  Divider,
  makeStyles,
  Paper,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface StyleProps {
  isSingle: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  project: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 550,
    margin: theme.spacing(0, 2),
    marginRight: ({ isSingle }) =>
      isSingle ? 550 + 3 * theme.spacing(2) : theme.spacing(2),
    padding: theme.spacing(1),
  },
  projectTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  projectImage: {
    margin: theme.spacing(2, 0),
  },
  projectTitle: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    textAlign: "center",
    width: 550 - theme.spacing(4),
  },
  projectInfo: {
    flexGrow: 1,
    width: "100%",
  },
  projectDivider: {
    height: "1px",
  },
  projectTags: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(1),
  },
}));

type ProjectProps = ProjectFields & {
  isSingle?: boolean;
};

const Project: FC<ProjectProps> = ({
  title,
  description,
  image,
  tags,
  isSingle = false,
}) => {
  const classes = useStyles({ isSingle });

  return (
    <Paper className={classes.project} elevation={10}>
      <div className={classes.projectTop}>
        <img
          src={getImageUrl(image)}
          alt={getImageTitle(image)}
          width={175}
          className={classes.projectImage}
        />
        <Typography
          variant="h4"
          color="primary"
          className={classes.projectTitle}
        >
          {title}
        </Typography>
      </div>
      <div className={classes.projectInfo}>
        {documentToReactComponents(description as Document)}
      </div>
      <Divider flexItem className={classes.projectDivider} />
      <div className={classes.projectTags}>
        {tags.map((tag) => (
          <TagChip key={tag.sys.id} id={tag.sys.id} {...tag.fields} />
        ))}
      </div>
    </Paper>
  );
};

const useTagsStyles = makeStyles((theme) => ({
  projectTag: {
    margin: theme.spacing(0.3),
    "& .MuiChip-avatarColorSecondary": {
      backgroundColor: "inherit",
    },
  },
}));

type TagProps = TagFields & {
  id: string;
};

const TagChip: FC<TagProps> = ({ title, id, lightIcon, darkIcon }) => {
  const theme = useTheme();
  const classes = useTagsStyles();

  const isDark = theme.palette.type === "dark";

  return (
    <Chip
      clickable
      size="medium"
      label={title}
      className={classes.projectTag}
      avatar={
        <Avatar
          src={isDark ? getImageUrl(darkIcon) : getImageUrl(lightIcon)}
          alt={isDark ? getImageTitle(darkIcon) : getImageTitle(lightIcon)}
        />
      }
      component={Link}
      to={`/tags/${id}`}
      color="secondary"
      variant="outlined"
    />
  );
};

export default Project;
