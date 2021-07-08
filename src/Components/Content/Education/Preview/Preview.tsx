// React Imports
import React, { forwardRef } from "react";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import Title from "./Components/Title";
import Provider from "../Shared/Provider";
import FloatingIcons from "../../Shared/FloatingIcons";
import DynamicPaper from "../../../Atomic/DynamicPaper";
import RichText from "../../../Custom/RichText";
import MatchHighlight from "../../../Atomic/MatchHighlight";
import TagMini from "../../Tag/Mini";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";
import {
  generateEducationTimeline,
  getSingleEducation,
} from "../../../../Utils/Content/education";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2, 0),
    width: "100%",
  },
  display: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(1, 2),
  },
  description: {
    width: "100%",
    textAlign: "center",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1, 2),
  },
  timeline: {
    margin: theme.spacing(1),
  },
}));

export interface PreviewProps {
  id: string;
  search?: string;
  className?: string;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const education = getSingleEducation(props.id);
  if (!education) return null;

  return (
    <DynamicPaper
      ref={ref}
      className={clsx(classes.container, props.className)}
    >
      <div className={classes.display}>
        <Provider {...education} />
        <Title {...education} search={props.search} />
        <FloatingIcons
          linkLabel="Website"
          link={education.link}
          github={education.github}
          direction="row"
        />
      </div>
      <div className={classes.info}>
        <div className={classes.description}>
          <RichText
            richText={education.description as Document}
            toMatch={props.search}
            variant={isSizeXS ? "body2" : "body1"}
          />
        </div>
      </div>
      {education.tags.length && (
        <>
          <div className={classes.tags}>
            {education.tags.map((tag) => (
              <TagMini key={tag.id} id={tag.id} search={props.search} />
            ))}
          </div>
        </>
      )}
      <HorizontalDivider />
      <Typography
        variant={isSizeXS ? "body2" : "body1"}
        className={classes.timeline}
      >
        <MatchHighlight toMatch={props.search}>
          {generateEducationTimeline(education)}
        </MatchHighlight>
      </Typography>
    </DynamicPaper>
  );
});

export default Preview;