// React Imports
import React, { cloneElement, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import Categories from "../Shared/Categories";
import DynamicPaper from "../../../Atomic/DynamicPaper";
import DynamicImage from "../../../Atomic/DynamicImage";
import StyledLink from "../../../Atomic/StyledLink";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";
import { useTitle } from "../../../../Context/HeadContext";
import { generateSearch } from "../../../../Utils/funcs";
import { getTag } from "../../../../Utils/Content/tags";

// Material UI Imports
import { makeStyles, Typography, useTheme } from "@material-ui/core";
import { Build, Description, School, Work } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 225,

    [theme.breakpoints.only("xs")]: {
      width: "100%",
      flex: "none",
    },
  },
  display: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iconLink: {
    margin: theme.spacing(3, 2, 2),
  },
  icon: {
    maxWidth: 215,
    height: 150,
  },
  title: {
    margin: theme.spacing(0.5, 1),
    textAlign: "center",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 1),
    margin: theme.spacing(1, "auto"),
    flex: 1,
  },
}));

export interface PreviewProps {
  id: string;
  search?: string;
  className?: string;
}

const Preview: FC<PreviewProps> = (props) => {
  const classes = useStyles();

  const theme = useTheme();
  const tag = getTag(props.id);

  const location = useLocation();
  const title = useTitle();

  if (!tag) return null;

  const isDark = theme.palette.type === "dark";
  const icon = isDark ? tag.darkIcon : tag.lightIcon;

  const generateLink = (type: string) => ({
    pathname: `/tags/${tag.slug}`,
    search: generateSearch(
      {
        from_path: location.pathname,
        from_type: type,
      },
      title
    ),
  });

  return (
    <DynamicPaper className={clsx(classes.container, props.className)}>
      <div className={classes.display}>
        <Link to={generateLink("preview_image")} className={classes.iconLink}>
          <DynamicImage
            src={`${icon.file.url}?h=200`}
            alt={icon.title}
            className={classes.icon}
          />
        </Link>
        <StyledLink
          to={generateLink("preview_title")}
          variant="h5"
          className={classes.title}
          toMatch={props.search}
        >
          {tag.title}
        </StyledLink>
      </div>
      <HorizontalDivider flexItem />
      <div className={classes.info}>
        <Related
          value={tag.experience.length}
          label="experience"
          icon={<Work />}
        />
        <Related
          value={tag.education.length}
          label="education"
          icon={<School />}
          noPlural
        />
        <Related value={tag.projects.length} label="project" icon={<Build />} />
        <Related
          value={tag.articles.length}
          label="article"
          icon={<Description />}
        />
        <Categories {...tag} search={props.search} paddingY={0.5} withClick />
      </div>
    </DynamicPaper>
  );
};

const useRelatedStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(0.5, 0),
  },
  icon: {
    marginRight: theme.spacing(0.75),
  },
}));

interface RelatedProps {
  value: number;
  label: string;
  icon: JSX.Element;
  noPlural?: boolean;
}

const Related: FC<RelatedProps> = ({
  value,
  label,
  icon,
  noPlural = false,
}) => {
  const classes = useRelatedStyles();

  const plural = value !== 1;
  const text = (
    <>
      <strong>{value}</strong> related {label}
      {plural && !noPlural ? "s" : ""}
    </>
  );

  const iconToRender = cloneElement(icon, {
    className: classes.icon,
    fontSize: "small",
    color: "disabled",
  });

  return (
    <div className={classes.container}>
      {iconToRender}
      <Typography variant="subtitle1">{text}</Typography>
    </div>
  );
};

export default Preview;
