/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState, useEffect } from "react";
import tw, { css, styled, theme } from "twin.macro";

// import { useTheme as useColorMode } from "next-themes";

import { headerNCartService } from "@/machines/header_n_cart_machine";

import NavMenu from "./navigation/NavMenu";
import ShoppingCart from "./cart/ShoppingCart";

const Header: FC = ({ children }) => {
  // const {  theme } = useColorMode();

  const [headerNCartServiceInitiallized, setHeaderAndCartServiceInitialized] =
    useState<boolean>(false);

  useEffect(() => {
    if (!headerNCartService.initialized) {
      headerNCartService.start();
      setHeaderAndCartServiceInitialized(true);
    }
  }, [headerNCartServiceInitiallized, setHeaderAndCartServiceInitialized]);

  return (
    <header tw="overflow-hidden dark:bg-gray-800 light:bg-l">
      <NavMenu />
      <ShoppingCart />
      {children}
    </header>
  );
};

export default Header;
