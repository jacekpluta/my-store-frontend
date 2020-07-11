import React from "react";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "./errorMessage";
import { useMutation } from "@apollo/react-hooks";
import { useFormFields } from "../lib/useFormFields";

import Link from "next/link";

export interface RequestResetProps {}

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

type target = {
  email: string;
  name: string;
  password: string;
};

export default function RequestReset(props: RequestResetProps) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
  });

  const [requestReset, { data, loading, error, called }] = useMutation(
    REQUEST_RESET_MUTATION
  );

  const { email } = fields;
  return (
    <Form
      method="post"
      onSubmit={async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        await requestReset({
          variables: {
            email: email,
          },
        });
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Request reset token to change your email</h2>

        <Error error={error} />
        {!loading && !error && called && (
          <p>Reset link has been send to your email!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={handleFieldChange}
          />
        </label>

        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
}
