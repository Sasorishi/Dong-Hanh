import React from "react";
import { useParams } from "react-router-dom";
import Success from "../../components/responses/SuccessComponent";
// import Error from "../../components/responses/ErrorComponent";

const Response = () => {
  const { type } = useParams();

  return <Success response={type} />;
};

export default Response;
