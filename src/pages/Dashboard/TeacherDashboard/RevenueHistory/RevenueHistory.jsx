import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { format } from "date-fns";
// import { formatDistanceToNow } from "date-fns";

const RevenueHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // loading revenue by email
  const { data: revenueHistory = [], isLoading } = useQuery({
    queryKey: ["revenue-history"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/earnings/${user?.email}`);
      return res.data;
    },
  });

  // const timeDistance = (time) => {
  //     const postedAt = formatDistanceToNow(new Date(time), { addSuffix: true });
  //     return postedAt;
  //   };

  return (
    <div className="min-h-screen py-10 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Revenue History</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all your revenue History
          </p>
        </div>
      </div>

      {/* --------- container ----- */}
      <div className="bg-secondary rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
        {isLoading ? (
          <div className="flex justify-center min-h-50 items-center">
            <span className="loading loading-spinner text-primary loading-xl"></span>
          </div>
        ) : (
          revenueHistory.map((h) => (
            <div key={h?._id} className="bg-base-100 rounded-xl p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* User Info */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Payed For (subject)</p>
                    <p className="truncate">{h?.payedSubject}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Paid Amount</p>
                    <p className="font-medium">{h?.paidAmount} BDT</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Paid By</p>
                    <p>{h?.payerEmail}</p>
                  </div>

                  <div className="">
                    <p className="text-xs text-gray-500">Paid At</p>
                    {h?.paidAt ? format(new Date(h.paidAt), "dd MMM yyyy") : ""}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RevenueHistory;
