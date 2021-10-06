/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

interface PropsI {
  placeholder: boolean;
}

type paramsType = {
  pageNum: string;
};

// todo: number of pages and calculation

export const getServerSideProps: GetServerSideProps<PropsI, paramsType> =
  async (ctx) => {
    const { params } = ctx;

    params?.pageNum; //

    return {
      props: {
        placeholder: true,
      },
    };
  };

const Page: NP<PropsI> = (props) => {
  //

  console.log(props);

  return <div>Hello</div>;
};

export default Page;
