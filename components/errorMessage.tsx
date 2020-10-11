import styled from "styled-components";
import React, { useState } from "react";
import PropTypes from "prop-types";

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid black;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const DisplayError = ({ error }: any): any | typeof ErrorStyles => {
  if (!error || !error.message) return <p></p>;

  const [errorMessage, setErrorMessage] = useState(error.message);

  if (errorMessage.includes("Details: Field name = email"))
    setErrorMessage("Account with that e-mail address already exists");

  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Error!</strong>
        {errorMessage.replace("GraphQL error: ", "")}
      </p>
    </ErrorStyles>
  );
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
