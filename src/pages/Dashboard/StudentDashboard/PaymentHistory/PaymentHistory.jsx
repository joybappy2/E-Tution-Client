import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // loading payment history
  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen py-10 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Payment History</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all the applications applied by Tutors
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-secondary ">
            <tr>
              <th>Payed For (subject)</th>
              <th>Transaction Id</th>
              <th>Payed For (tutor)</th>
              <th>Paid Amount</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>
                  <div className="flex justify-center min-h-50 items-center">
                    <span className="loading loading-spinner text-primary loading-xl"></span>
                  </div>
                </td>
              </tr>
            ) : isLoading ? (
              <span className="loading loading-spinner text-primary loading-xl"></span>
            ) : (
              paymentHistory.map((payment) => (
                <tr key={payment?._id} className="hover:bg-base-200">
                  {/* Profile Picture & Name */}
                  <td>{payment?.payedSubject}</td>

                  {/* Qualifications */}
                  <td>
                    <div className="text-sm opacity-90">
                      {payment?.transactionId}
                    </div>
                  </td>

                  {/* Experience */}
                  <td>{payment?.tutorEmail}</td>

                  {/* Expected Salary */}
                  <td className="font-semibold">{payment?.paidAmount} BDT</td>
                  {/* Tution Post */}
                  <td className="font-semibold">
                    {format(payment?.paidAt, "PPp")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
