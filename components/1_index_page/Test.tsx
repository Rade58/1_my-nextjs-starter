/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const StyledTwDiv = tw.div`

  border hover:border-b-gray-900

`;

const StyledDiv = styled.div`
  background-color: blanchedalmond;
`;

const TestComponent: FC = () => {
  return (
    <section css={[tw`bg-gray-200`, tw`hover:text-blue-600`]}>
      <div
        css={css`
          border: crimson solid 1px;
          & h1 {
            font-size: 4em;
          }
          & p {
            color: #421f35;
          }
        `}
      >
        <h1>Test</h1>
        <p>Lorem ipsum</p>
        <StyledTwDiv>Hello World</StyledTwDiv>
        <StyledDiv>Hello world</StyledDiv>
      </div>
      <aside
        css={css`
          font-size: 2rem;
          & h1 {
            text-decoration-line: underline;
          }

          /*  YOU CAN PARSE TAILWIND CLASSES TO CSS */

          ${tw`border-green-500 border-4 `}
        `}
      >
        <h1>Lorem Blorem</h1>
      </aside>
      <footer
        css={css`
          font-size: 4rem;
          /* YOU CAN ALSO REFERENCE STYLES FROM YOUR THEME */

          background-color: ${theme`colors.electric`};
        `}
      >
        <h2>Hello World</h2>
      </footer>
    </section>
  );
};

export default TestComponent;
