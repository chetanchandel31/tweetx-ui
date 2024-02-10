import useAppQueryParams, {
  ENUM_TAB_PROFILE_PAGE,
  TAB_PROFILE_PAGE,
} from "@/hooks/useAppQueryParams";
import useIsMdDown from "@/hooks/useIsMdDown";
import getUrlWithQueryParams from "@/utils/getUrlWithQueryParams";
import {
  PeopleRounded,
  PersonAddRounded,
  WysiwygRounded,
} from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {};

type TypeProfileTab =
  (typeof ENUM_TAB_PROFILE_PAGE)[keyof typeof ENUM_TAB_PROFILE_PAGE];

const tabs: {
  tab: TypeProfileTab;
  title: string;
  icon: React.ReactNode;
}[] = [
  {
    icon: <WysiwygRounded />,
    tab: "posts",
    title: "Posts",
  },
  {
    icon: <PeopleRounded />,
    tab: "followers",
    title: "Followers",
  },
  {
    icon: <PersonAddRounded />,
    tab: "following",
    title: "Following",
  },
];

export default function TabsProfile({}: Props) {
  const [queryParams] = useAppQueryParams();

  const isMdDown = useIsMdDown();

  const getTabUrl = (tab: TypeProfileTab) =>
    getUrlWithQueryParams({
      [TAB_PROFILE_PAGE]: tab,
    });

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Grid container wrap="wrap">
          {tabs.map((tab) => (
            <Grid item xs={4} key={tab.tab}>
              <Button
                size={isMdDown ? "small" : "medium"}
                startIcon={tab.icon}
                component={Link}
                to={getTabUrl(tab.tab)}
                color="inherit"
                fullWidth
                sx={{
                  borderTop:
                    queryParams["tab-profile-page"] === tab.tab
                      ? `solid 2px`
                      : `solid 2px transparent`,
                  borderRadius: 0,
                }}
              >
                {tab.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        content
      </Grid>
    </Grid>
  );
}
