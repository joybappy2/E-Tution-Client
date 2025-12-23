import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/verify-payment?session_id=${sessionId}`)
        .then(() => {});
    }
  }, [sessionId, axiosSecure]);

  return <div>Payment is Successful.</div>;
};

export default PaymentSuccess;
