// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Badge as BadgeFields } from "../../../Utils/types";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  badge: {},
  image: {
    [theme.breakpoints.only("xs")]: {
      height: 16,
    },
  },
}));

export type BadgeProps = BadgeFields & {
  className?: string;
};

const Badge: FC<BadgeProps> = (props) => {
  const classes = useStyles();

  return (
    <a
      key={props.id}
      target="_blank"
      rel="noopener noreferrer"
      href={props.url}
      className={clsx(classes.badge, props.className)}
    >
      <img src={props.source} alt={props.title} className={classes.image} />
    </a>
  );
};

export default Badge;
