// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import RichText from "../RichText";
import StyledLink from "../StyledLink";
import VerticalDivider from "../Divider/Vertical";
import HorizontalDivider from "../Divider/Horizontal";
import { getImageTitle, getImageUrl } from "../../API/helpers";
import { ExperienceFields } from "../../Utils/types";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: "5px",
  },
  image: {
    margin: theme.spacing(1),

    [theme.breakpoints.only("xl")]: {
      width: 175,
      height: 175,
    },

    [theme.breakpoints.only("lg")]: {
      width: 150,
      height: 150,
    },

    [theme.breakpoints.only("md")]: {
      width: 150,
      height: 150,
    },

    [theme.breakpoints.only("sm")]: {
      width: 125,
      height: 125,
    },

    [theme.breakpoints.only("xs")]: {
      width: 100,
      height: 100,
    },
  },
  info: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    margin: theme.spacing(1, 0),
  },
  description: {
    margin: theme.spacing(1),
  },
}));

type AssociatedProps = ExperienceFields & {
  className?: string;
};

const Associated: FC<AssociatedProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.container, props.className)}>
      <img
        src={getImageUrl(props.image)}
        alt={getImageTitle(props.image)}
        className={classes.image}
      />
      <VerticalDivider />
      <div className={classes.info}>
        <StyledLink
          variant="h6"
          align="center"
          to={`/experience/${props.id}`}
          className={classes.title}
        >
          {`${props.role} @ ${props.title}`}
        </StyledLink>
        <HorizontalDivider />
        <div className={classes.description}>
          <RichText richText={props.description as Document} />
        </div>
      </div>
    </div>
  );
};

export default Associated;
