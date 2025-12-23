import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useVstatus = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const { data: vStatus = "not-verified" } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/verification-status/${user?.email}`);
      return res.data;
    },
  });
  return vStatus.vStatus;
};

export default useVstatus;
