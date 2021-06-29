// React Imports
import React, { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import ArticleMain from "../../Components/Content/Article/Main";
import NavButton from "../../Components/NavButton";
import { analytics } from "../../Utils/Config/firebase";
import { getArticle, useSortedArticles } from "../../Utils/Content/articles";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  article: {
    margin: theme.spacing(1, 0),
  },
  topButtons: {
    display: "flex",
    width: "100%",
  },
  allArticles: {
    maxWidth: "25%",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "45%",
    },
  },
  buttons: {
    display: "flex",
    width: "100%",
    margin: theme.spacing(2, 0, 4),
  },
}));

interface Params {
  slug: string;
}

const Article: FC = () => {
  const { slug } = useParams<Params>();
  const classes = useStyles();
  const location = useLocation();
  const article = getArticle(slug, true);
  const sortedArticles = useSortedArticles();

  if (!article)
    return (
      <NotFound
        name="article"
        redirect="/articles"
        redirectName="Articles Page"
      />
    );

  analytics.logEvent("page_view", {
    page_title: article.title,
    ...(location.state as Record<string, unknown>),
  });

  const articleIndex = sortedArticles.findIndex((p) => p.id === article.id);
  const prevArticle = sortedArticles[articleIndex - 1];
  const nextArticle = sortedArticles[articleIndex + 1];

  return (
    <div className={classes.container}>
      <div className={classes.topButtons}>
        <NavButton
          to={{
            pathname: "/articles",
            state: {
              from_path: location.pathname,
              from_type: "top_nav_button",
            },
          }}
          label="All Articles"
          type="next"
          typeLabel=""
          className={classes.allArticles}
        />
      </div>
      <ArticleMain id={article.id} className={classes.article} />
      <div className={classes.buttons}>
        {prevArticle && (
          <NavButton
            to={{
              pathname: `/articles/${prevArticle.slug}`,
              state: {
                from_path: location.pathname,
                from_type: "prev_nav_button",
              },
            }}
            label={prevArticle.title}
            type="previous"
            typeLabel="Previous Article"
          />
        )}
        {nextArticle && (
          <NavButton
            to={{
              pathname: `/articles/${nextArticle.slug}`,
              state: {
                from_path: location.pathname,
                from_type: "next_nav_button",
              },
            }}
            label={nextArticle.title}
            type="next"
            typeLabel="Next Article"
          />
        )}
      </div>
    </div>
  );
};

export default Article;
