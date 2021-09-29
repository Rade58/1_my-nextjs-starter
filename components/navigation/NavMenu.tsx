/* eslint jsx-a11y/anchor-is-valid: 1 */
import { useState, useEffect } from "react";
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";
import Link from "next/link";

import { motion } from "framer-motion";

import { useActor } from "@xstate/react";

import isSSR from "@/util/isSSR";

import { EE, headerNCartService } from "@/machines/header_n_cart_machine";

import Switcher from "../color_mode/Switcher";

const Nav: FC = () => {
  const [headerNCartState, dispatchToHeaderNcart] =
    useActor(headerNCartService);

  const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false);

  const [contentScaledTo0, setContentScaledTo0] = useState<boolean>(false);

  const paths = [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/shop",
      name: "Shop",
    },
    {
      href: "/contact",
      name: "Contact",
    },
    {
      href: "/about",
      name: "About",
    },
  ];

  const toggleMobileMenu = () => {
    // console.log(isSSR());

    if (isSSR()) return;
    setMobileMenuOpened((prev) => !prev);
  };

  useEffect(() => {
    if (mobileMenuOpened) {
      setTimeout(() => {
        setContentScaledTo0(false);
      }, 100);
    } /*  else {
      setTimeout(() => {
        setContentScaledTo0(true);
      }, 100);
    } */
  }, [mobileMenuOpened, setContentScaledTo0]);

  // I NEED EFFECT BECAUSE OF FRMER MOTION COMPONENT
  // AND SSR (THEY DON'T GO TOGETER NICE (MOUNTED IT FIRST))
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  // console.log({ mobileMenuOpened });

  return (
    <nav
      css={[
        css`
          transition-property: background;
          transition-duration: 0.4s;

          & button {
            cursor: pointer;
          }

          & a {
            cursor: pointer;
          }
        `,
        tw`shadow`,
      ]}
    >
      <div tw="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div tw="flex items-center justify-between">
          <div>
            <Link href="/">
              <a tw="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
                Brand
              </a>
            </Link>
          </div>

          {/* <!-- Mobile menu button --> */}
          <div tw="flex md:hidden">
            <button
              onClick={() => {
                setContentScaledTo0(true);

                setTimeout(() => {
                  toggleMobileMenu();
                }, 50);
              }}
              type="button"
              tw="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg
                viewBox="0 0 24 24"
                css={[
                  tw`w-6 h-6 fill-current`,
                  css`
                    &:hover path {
                      fill: #473d74;
                    }
                  `,
                ]}
              >
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
        <div tw="items-center md:flex">
          {mounted && (
            <motion.div
              animate={{
                scale: contentScaledTo0 ? 0 : 1,
                x: contentScaledTo0 ? -200 : 0,
              }}
              initial={{
                scale: 0,
                x: -200,
              }}
              transition={{ duration: 0.3 }}
              css={css`
                /* only for transition to work */
                /* we will use max height because percents don't work */
                max-height: 180px;
                /*  */
                height: auto;

                & a {
                  display: block;
                  width: 100%;
                }

                & .mobile-theme-switcher {
                  /* border: crimson solid 1px; */
                  width: fit-content;
                  ${tw`mr-auto mt-4 mb-4 ml-2.5`}
                }

                transition-property: max-height;
                transition-duration: 0.2s;
                transition-timing-function: ease-out;
              `}
              tw="transform-gpu flex-col overflow-hidden sm:flex xl:hidden lg:hidden md:hidden"
              style={{ maxHeight: mobileMenuOpened ? "180px" : "0px" }}
            >
              <div
                css={css`
                  display: flex;
                  width: 98vw;
                `}
                className="mobile-theme-switcher"
              >
                <Switcher />
              </div>
              {paths.map(({ href, name }, i) => {
                return (
                  <Link href={href} key={`${i}-`}>
                    <a tw="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                      {name}
                    </a>
                  </Link>
                );
              })}
            </motion.div>
          )}
          <div
            css={css`
              & .theme-switcher {
                /* border: crimson solid 1px; */
                margin-right: 10px;
                padding-right: 20px;
              }
            `}
            tw="flex-row hidden xl:flex lg:flex md:flex md:mx-6 sm:hidden"
          >
            <div className="theme-switcher">
              <Switcher />
            </div>
            {paths.map(({ href, name }, i) => {
              return (
                <Link href={href} key={`${i}-`}>
                  <a tw="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
                    {name}
                  </a>
                </Link>
              );
            })}
          </div>

          <div tw="flex justify-center md:block">
            <button
              onClick={() =>
                dispatchToHeaderNcart({
                  type: EE.TOGGLE,
                })
              }
              tw="relative text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg
                tw="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* IF THERE I SOMETHING IN THE CART USE THIS */}
              {/* <span tw="absolute top-0 left-0 p-1 text-xs text-white bg-indigo-500 rounded-full"></span> */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
