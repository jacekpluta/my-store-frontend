import React from "react";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./errorMessage";
import { useMutation } from "@apollo/react-hooks";
import { useFormFields } from "./utils/useFormFields";
import Link from "next/link";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "../lib/queries";
import { FormStyles } from "./styles/FormStyles";

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

export default function ResetPass(props: ResetPassProps) {
  const [fields, handleFieldChange] = useFormFields({
    password: "",
    confirmPassword: "",
  });

  const [resetPassword, resetPasswordData] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
      awaitRefetchQueries: true,
    }
  );

  const { password, confirmPassword } = fields;
  return (
    <FormStyles>
      <fieldset
        disabled={resetPasswordData.loading}
        aria-busy={resetPasswordData.loading}
      >
        <div className="veen" style={{ background: "#D0D4D7" }}>
          <div className="wrapper" style={{ left: "20%", width: "60%" }}>
            <Form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await resetPassword({
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
              <h2 className="second">
                <span>My Shop</span>
              </h2>

              <h2>Reset your password</h2>

              <Error error={resetPasswordData.error} />
              {!resetPasswordData.loading &&
                !resetPasswordData.error &&
                resetPasswordData.called && (
                  <p>
                    Your password has been reset successfully!
                    <p>
                      <Link href="/signin">
                        Click here to sign in or wait 5 seconds to be
                        redirected.
                      </Link>
                    </p>
                  </p>
                )}

              <div className="mail">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={handleFieldChange}
                />
                <label>Password</label>
              </div>

              <div className="passwd">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={handleFieldChange}
                />
                <label>Confirm Password</label>
              </div>

              <div className="submit">
                <button className="dark">Reset password</button>
              </div>
            </Form>
          </div>
        </div>
      </fieldset>
    </FormStyles>
  );
}
