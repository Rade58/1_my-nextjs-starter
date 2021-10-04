/* eslint react/react-in-jsx-scope: 0 */

/* eslint jsx-a11y/anchor-is-valid: 1 */
import tw, { css, styled, theme } from "twin.macro";

import type { NextPage as NP } from "next";
import { useState, useCallback, useEffect } from "react";

import { useRouter } from "next/router";

import type { ChangeEventHandler, FormEvent } from "react";

// import { useActor } from "@xstate/react";

// WE ARE GOING TO USE SIGNING IN WITH EMAIL LOGIC LIKE THIS
// AND WE NEED TO CHECK SESSION
import { signIn, useSession } from "next-auth/client";
//
//

import Spinner from "@/components/common/Spinner";

const SignInPage: NP = () => {
  const { push, asPath } = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) push("/");
  }, [session, push]);

  const [{ email }, setFields] = useState<{
    email: string;
  }>({
    email: "",
  });

  const [reqStatus, setReqStatus] = useState<"idle" | "pending">("idle");

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) =>
    setFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setReqStatus("pending");
      try {
        //
        // TRY SIGNING IN
        const resp = signIn("email", { email });

        console.log({ resp });
      } catch (err) {
        setReqStatus("idle");
        //

        console.error(err);
      }
    },
    [email, setReqStatus]
  );

  const buttonDisabled = !email || reqStatus === "pending" ? true : false;

  if (session) {
    return null;
  }

  return (
    <main>
      <h1>Sign In</h1>
      <section
        css={css`
          padding-top: 10vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          align-content: center;
          & div.email-field {
            margin-top: 10vh;
            display: flex;
            justify-content: center;
          }
          & button {
            margin-top: 8vh;
          }
        `}
      >
        <form onSubmit={handleSubmit}>
          <div className="email-field">
            <input
              onChange={handleChange}
              value={email}
              type="email"
              name="email"
              id="email-field"
              placeholder="Sign In/Up With Email"
            />
          </div>

          <button color="primary" type="submit" disabled={buttonDisabled}>
            {"Sign In/Up "}
            {reqStatus === "pending" ? (
              <div
                css={css`
                  display: inline-block;
                  margin-left: 8px;
                `}
              >
                <Spinner />
              </div>
            ) : (
              ""
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignInPage;
