import React from "react";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./errorMessage";
import { useMutation } from "@apollo/react-hooks";
import { useFormFields } from "./utils/useFormFields";
import Link from "next/link";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "./queries";

export interface ResetPassProps {
  resetToken: string;
}

export const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      name
      email
    }
  }
`;

type target = {
  email: string;
  name: string;
  id: string;
};

export default function ResetPass(props: ResetPassProps) {
  const [fields, handleFieldChange] = useFormFields({
    password: "",
    confirmPassword: "",
  });

  const [requestReset, { data, loading, error, called }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
      awaitRefetchQueries: true,
    }
  );

  const { password, confirmPassword } = fields;
  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await requestReset({
          variables: {
            resetToken: props.resetToken,
            password: password,
            confirmPassword: confirmPassword,
          },
        });
        setTimeout(() => {
          Router.push({
            pathname: "/signin",
          });
        }, 2000);
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset your password</h2>

        <Error error={error} />
        {!loading && !error && called && (
          <p>
            Your password has been reset successfully! Click
            <p>
              <Link href="/signin">here</Link>
            </p>
            to sign in or wait 5 seconds to be redirected.
          </p>
        )}
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={handleFieldChange}
          />
        </label>

        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={handleFieldChange}
          />
        </label>

        <button type="submit">Submit</button>
        {/* <p>
          <Link href="/requestreset">
            <a>
              You want to reset your password but don't have a token? GET ONE
              HERE
            </a>
          </Link>
        </p> */}
      </fieldset>
    </Form>
  );
}
