// React Imports
import React, { FC } from "react";
import { useClosableSnackbar } from "../../../../Hooks";
import MatchHighlight from "../../../Atomic/MatchHighlight";
import { ResolvedTag } from "../../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getTagsCategoryFilter,
  setTagsCategoryFilter,
} from "../../../../Redux";
import { useAppDispatch } from "../../../../Store";

// Material UI Imports
import { Chip, makeStyles, Theme, Tooltip } from "@material-ui/core";

interface StyleProps {
  paddingX: number;
  paddingY: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  categories: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: ({ paddingX, paddingY }) => theme.spacing(paddingY, paddingX),
  },
}));

type CategoriesProps = ResolvedTag & {
  search?: string;
  withClick?: boolean;
  paddingX?: number;
  paddingY?: number;
};

const Categories: FC<CategoriesProps> = (props) => {
  const classes = useStyles({
    paddingX: props.paddingX ?? 0,
    paddingY: props.paddingY ?? 0,
  });

  if (!props.categories) return null;

  return (
    <div className={classes.categories}>
      {props.categories.map((category, i) => (
        <Category
          key={i}
          category={category}
          search={props.search}
          withClick={props.withClick}
        />
      ))}
    </div>
  );
};

const useCategoryStyles = makeStyles((theme) => ({
  category: {
    margin: theme.spacing(0.5),
  },
}));

interface CategoryProps {
  category: string;
  search?: string;
  withClick?: boolean;
}

const Category: FC<CategoryProps> = (props) => {
  const classes = useCategoryStyles();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useClosableSnackbar();

  const categoryFilter = useSelector(getTagsCategoryFilter);
  const alreadyFiltered =
    categoryFilter.length === 1 && categoryFilter[0] === props.category;

  const onFilter = () => {
    dispatch(setTagsCategoryFilter([props.category]));
    enqueueSnackbar(`Filtered Tags by ${props.category}`, {
      variant: "success",
    });
  };

  const onUnfilter = () => {
    dispatch(setTagsCategoryFilter([]));
    enqueueSnackbar(`Removed ${props.category} filter`, {
      variant: "success",
    });
  };

  const chip = (
    <Chip
      label={
        <MatchHighlight toMatch={props.search}>{props.category}</MatchHighlight>
      }
      onClick={
        props.withClick ? (alreadyFiltered ? onUnfilter : onFilter) : undefined
      }
      className={classes.category}
    />
  );

  if (!props.withClick) return chip;

  return (
    <Tooltip
      title={
        alreadyFiltered
          ? `Remove ${props.category} filter`
          : `Filter by ${props.category}`
      }
    >
      {chip}
    </Tooltip>
  );
};

export default Categories;
