/** @jsxRuntime classic */
/** @jsx jsx */
// import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
// import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { useSession } from "next-auth/client";

const AccesibleSvg: FunctionComponent = () => {
  const [session, loading] = useSession();

  session?.expires;
  session?.profile;
  session?.user;
  session?.userId;

  return (
    <svg
      /* NO NEED FOR px ON width AND height */
      width=""
      height=""
      aria-labelledby="your title id goes here"
      id="svg"
      role="presentation" /* or role="imge"*/
      lang="en"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 380 210"
    >
      <title id="reference this id by aria-labelledby">
        Your Title Goes here
      </title>
    </svg>
  );
};

export default AccesibleSvg;
