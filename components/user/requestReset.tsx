import React, { useState } from "react";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "../errorMessage";
import { useMutation } from "@apollo/react-hooks";
import { useFormFields } from "../utils/useFormFields";
import { FormStyles } from "../styles/FormStyles";

export interface RequestResetProps {}

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

export default function RequestReset(props: RequestResetProps) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
  });

  const [requestReset, requestResetData] = useMutation(REQUEST_RESET_MUTATION);

  const { email } = fields;
  return (
    <FormStyles>
      <fieldset
        disabled={requestResetData.loading}
        aria-busy={requestResetData.loading}
      >
        <div className="veen" style={{ background: "#D0D4D7" }}>
          <div className="wrapper" style={{ left: "20%", width: "60%" }}>
            <Form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await requestReset({
                  variables: {
                    email: email,
                  },
                });
              }}
              data-test="form"
            >
              <h2 className="second">
                <span>My Shop</span>
              </h2>

              <h3>Request reset token</h3>
              <Error error={requestResetData.error} />
              {!requestResetData.loading &&
                !requestResetData.error &&
                requestResetData.called && (
                  <p>Reset link has been send to your email!</p>
                )}

              <div className="mail">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={handleFieldChange}
                />
                <label>E-mail</label>
              </div>

              <div className="submit">
                <button className="dark">Register</button>
              </div>
            </Form>
          </div>
        </div>
      </fieldset>
    </FormStyles>
  );
}
