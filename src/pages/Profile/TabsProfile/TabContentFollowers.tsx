import useUserListInfinite from "@/API/react-query/user/useUserListInfinite";
import ButtonLoadMore from "@/components/ButtonLoadMore";
import LoadingAndEmptyState from "@/components/LoadingAndEmptyState";
import UserCard from "@/components/UserCard";
import useActiveUserId from "@/hooks/useActiveUserId";
import { Divider, Grid } from "@mui/material";

type Props = {};

export default function TabContentFollowers({}: Props) {
  const userId = useActiveUserId();
  const userList = useUserListInfinite(
    {
      page: 1,
      perPage: 5,
      followerOfUserId: userId || "",
    },
    {
      enabled: userId !== null,
    }
  );

  const items: React.ReactNode[] = [];

  userList.data?.pages?.forEach((page, pageIndex) => {
    if (page.isSuccess) {
      page.result.items.forEach((user, userIndex) => {
        const isLastItem =
          pageIndex === userList.data.pages.length - 1 &&
          userIndex === page.result.items.length - 1;

        items.push(
          <div key={user.userId}>
            <UserCard user={user} />

            {isLastItem ? null : <Divider />}
          </div>
        );
      });
    }
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {items}

        <LoadingAndEmptyState
          emptyText="No followers yet"
          isLoading={userList.isPending}
          itemsCount={items.length}
          loadingText="Loading followers..."
        />
      </Grid>

      {userList.hasNextPage ? (
        <Grid item xs={12}>
          <ButtonLoadMore
            infiniteQuery={userList}
            tableItemsCount={items.length}
          />
        </Grid>
      ) : null}
    </Grid>
  );
}
