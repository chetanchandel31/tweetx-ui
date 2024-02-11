import { Container } from "@mui/material";
import BtnCreatePost from "./CreatePost/BtnCreatePost";
import usePostListInfinite from "@/API/react-query/post/usePostListInfinite";

type Props = {};

export default function Feed({}: Props) {
  const postList = usePostListInfinite({
    page: 1,
    perPage: 5,
    postedByUserIds: [],
  });

  console.log(JSON.stringify(postList.data?.pages));

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <BtnCreatePost />
    </Container>
  );
}
