import useUserListInfinite from "@/API/react-query/user/useUserListInfinite";
import { Container, Divider, Grid } from "@mui/material";
import UserCard from "../../components/UserCard";
import ButtonLoadMore from "@/components/ButtonLoadMore";
import LoadingAndEmptyState from "@/components/LoadingAndEmptyState";

type Props = {};

export default function Users({}: Props) {
  const userList = useUserListInfinite({
    page: 1,
    perPage: 5,
  });

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
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {items}

          <LoadingAndEmptyState
            emptyText="No users yet"
            isLoading={userList.isLoading}
            itemsCount={items.length}
            loadingText="Loading users..."
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
    </Container>
  );
}
