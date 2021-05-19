import { FirebaseReducer } from "react-redux-firebase";
import { RootState } from "../Store";

/**
 * Firebase
 */

export const getUser = (state: RootState): FirebaseReducer.AuthState =>
  state.firebase.auth;

/**
 * Display Slice
 */

export {
  // -> Slice
  default as displaySlice,
  // -> Selectors
  getIsDarkMode,
  getIsSidebarOpen,
  // -> Actions
  toggleDarkMode,
  toggleSidebar,
  // -> Reducer
  displayReducer,
  // -> State
  initialDisplayState,
} from "./display.slice";

export type { DisplayState } from "./display.slice";

/**
 * Popup Slice
 */

export {
  // -> Slice
  default as popupSlice,
  // -> Selectors
  getPopupOpen,
  getPopupType,
  // -> Actions
  togglePopup,
  setPopupType,
  // -> Reducer
  popupReducer,
  // -> State
  initialPopupState,
} from "./popup.slice";

export type { PopupState } from "./popup.slice";

/**
 * Search Slice
 */

export {
  // -> Slice
  default as searchSlice,
  // -> Selectors
  getProjectsSearch,
  getExperienceSearch,
  // -> Actions
  setProjectsSearch,
  setExperienceSearch,
  // -> Reducer
  searchReducer,
  // -> State
  initialSearchState,
} from "./search.slice";

export type { SearchState } from "./search.slice";

/**
 * Sort Slice
 */

export {
  // -> Slice
  default as sortSlice,
  // -> Selectors
  getProjectsSort,
  getExperienceSort,
  // -> Actions
  setProjectsSort,
  setExperienceSort,
  // -> Reducer
  sortReducer,
  // -> State
  initialSortState,
} from "./sort.slice";

export type { SortState } from "./sort.slice";
