/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { GetServerSideProps, NextPage as NP } from "next";

import prisma from "@/lib/prisma";

export interface PropsI {
  products: {
    id: string;
    name: string;
    image: string;
  }[];
}

export const getServerSideProps: GetServerSideProps<PropsI> = async (ctx) => {
  // INITIAL PRODUCTS
  const products = await prisma.product.findMany({
    take: 16,
    select: {
      id: true,
      name: true,
      image: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const topRatedProducts = await prisma.product.findMany({
    take: 5,
    select: {
      name: true,
      price: true,
      image: true,
    },
    orderBy: {},
  });

  return {
    props: {
      products,
    },
  };
};

const Page: NP<PropsI> = (props) => {
  //

  return <div>{JSON.stringify(props.products, null, 2)}</div>;
};

export default Page;
