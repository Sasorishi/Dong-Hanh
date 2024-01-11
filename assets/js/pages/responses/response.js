import React from "react";
import { useParams } from "react-router-dom";
import Success from "../../components/responses/SuccessComponent";
import Error from "../../components/responses/ErrorComponent";

const Response = () => {
  const { redirection, type } = useParams();

  return (
    <>
      {redirection === "success" ? (
        <Success response={type} />
      ) : (
        <Error response={type} />
      )}
      ;
    </>
  );
};

export default Response;
