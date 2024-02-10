import {
  StringParam,
  createEnumParam,
  useQueryParams,
  withDefault,
} from "use-query-params";

export const TAB_PROFILE_PAGE = "tab-profile-page";
export const ENUM_TAB_PROFILE_PAGE = {
  POSTS: "posts",
  FOLLOWERS: "followers",
  FOLLOWING: "following",
} as const;
const _TabProfilePageParams = createEnumParam([
  ENUM_TAB_PROFILE_PAGE.POSTS,
  ENUM_TAB_PROFILE_PAGE.FOLLOWERS,
  ENUM_TAB_PROFILE_PAGE.FOLLOWING,
]);
export const TabProfilePageParams = withDefault(
  _TabProfilePageParams,
  ENUM_TAB_PROFILE_PAGE.POSTS
);

export default function useAppQueryParams() {
  return useQueryParams({
    "expanded-habit-id": StringParam,
    "calendar-date": StringParam,

    [TAB_PROFILE_PAGE]: TabProfilePageParams,
  });
}
