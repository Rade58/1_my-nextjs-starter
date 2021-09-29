/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

// import Test from "@/components/1_index_page/Test";

interface PropsI {
  placeholder: boolean;
}

type paramsType = {
  siteId: string;
};

export const getServerSideProps: GetServerSideProps<PropsI, paramsType> =
  async (ctx) => {
    const { params } = ctx;

    console.log(ctx.req.cookies);

    params?.siteId; //

    return {
      props: {
        placeholder: true,
      },
    };
  };

const Page: NP<PropsI> = (props) => {
  //

  console.log(props);

  return <div></div>;
};

export default Page;
