import useUserGetProfile from "@/API/react-query/user/useUserGetProfile";

export default function useActiveUserId() {
  const userProfile = useUserGetProfile({}, { staleTime: Infinity });

  return userProfile.data?.isSuccess ? userProfile.data.result.userId : null;
}
