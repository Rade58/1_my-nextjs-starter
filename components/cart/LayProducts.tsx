/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const LayProducts: FC = () => {
  return (
    <section tw=" overflow-y-auto">
      <div tw="dark:bg-gray-800 mx-auto flex flex-col max-w-3xl p-6 space-y-4 sm:p-10  dark:text-gray-100">
        <h2 tw="text-xl font-semibold">Your cart</h2>
        <ul
          tw="flex flex-col divide-gray-700"
          css={css`
            /* & li::before {
              content: "";
              display: flex;
              position: absolute;
              width: 100%;
              height: 4px;
              margin-bottom: 12px;
              border-bottom: ${theme`colors.y`} solid 1px;
              align-self: flex-end;
              justify-self: flex-start;
            } */

            & li {
              /* background-color: ${theme`colors.l`}; */
              border-bottom: #12151d solid 2px !important;
            }
          `}
        >
          <li tw="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div tw="flex w-full space-x-2 sm:space-x-4">
              <img
                tw="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80"
                alt="Polaroid camera"
              />
              <div tw="flex flex-col justify-between w-full pb-4">
                <div tw="flex justify-between w-full pb-2 space-x-2">
                  <div tw="space-y-1">
                    <h3 tw="text-lg font-semibold leading-snug sm:pr-8">
                      Polaroid camera
                    </h3>
                    <p tw="text-sm dark:text-gray-700">Classic</p>
                  </div>
                  <div tw="text-right">
                    <p tw="text-lg font-semibold">59.99€</p>
                    <p tw="text-sm line-through dark:text-gray-600">75.50€</p>
                  </div>
                </div>
                <div tw="flex text-sm divide-x">
                  <button
                    type="button"
                    tw="flex items-center px-2 py-1 pl-0 space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      tw="w-4 h-4 fill-current"
                    >
                      <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                      <rect width="32" height="200" x="168" y="216"></rect>
                      <rect width="32" height="200" x="240" y="216"></rect>
                      <rect width="32" height="200" x="312" y="216"></rect>
                      <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                    </svg>
                    <span>Remove</span>
                  </button>
                  <button
                    type="button"
                    tw="flex items-center px-2 py-1 space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      tw="w-4 h-4 fill-current"
                    >
                      <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                    </svg>
                    <span>Add to favorites</span>
                  </button>
                </div>
                <div
                  tw="h-8 w-28"
                  css={css`
                    & input:focus,
                    & button:focus {
                      outline: none !important;
                    }

                    & input[type="number"]::-webkit-inner-spin-button,
                    & input[type="number"]::-webkit-outer-spin-button {
                      -webkit-appearance: none;
                      margin: 0;
                    }
                  `}
                >
                  <label
                    htmlFor="custom-input-number"
                    tw="w-full text-gray-700 text-sm font-semibold"
                  >
                    Count:
                  </label>
                  <div tw="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1">
                    <button
                      data-action="decrement"
                      tw=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                    >
                      <span tw="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input
                      type="number"
                      tw=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-sm hover:text-black focus:text-black  md:text-base cursor-default flex items-center text-gray-700  outline-none"
                      name="custom-input-number"
                      value="0"
                    ></input>
                    <button
                      data-action="increment"
                      tw="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                    >
                      <span tw="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li tw="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div tw="flex w-full space-x-2 sm:space-x-4">
              <img
                tw="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                src="https://images.unsplash.com/photo-1504274066651-8d31a536b11a?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=675&amp;q=80"
                alt="Replica headphones"
              />
              <div tw="flex flex-col justify-between w-full pb-4">
                <div tw="flex justify-between w-full pb-2 space-x-2">
                  <div tw="space-y-1">
                    <h3 tw="text-lg font-semibold leading-snug sm:pr-8">
                      Replica headphones
                    </h3>
                    <p tw="text-sm dark:text-gray-400">White</p>
                  </div>
                  <div tw="text-right">
                    <p tw="text-lg font-semibold">99.95€</p>
                    <p tw="text-sm line-through dark:text-gray-600">150€</p>
                  </div>
                </div>
                <div tw="flex text-sm divide-x">
                  <button
                    type="button"
                    tw="flex items-center px-2 py-1 pl-0 space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      tw="w-4 h-4 fill-current"
                    >
                      <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                      <rect width="32" height="200" x="168" y="216"></rect>
                      <rect width="32" height="200" x="240" y="216"></rect>
                      <rect width="32" height="200" x="312" y="216"></rect>
                      <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                    </svg>
                    <span>Remove</span>
                  </button>
                  <button
                    type="button"
                    tw="flex items-center px-2 py-1 space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      tw="w-4 h-4 fill-current"
                    >
                      <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                    </svg>
                    <span>Add to favorites</span>
                  </button>
                </div>
                <div
                  tw="h-8 w-28"
                  css={css`
                    & input:focus,
                    & button:focus {
                      outline: none !important;
                    }

                    & input[type="number"]::-webkit-inner-spin-button,
                    & input[type="number"]::-webkit-outer-spin-button {
                      -webkit-appearance: none;
                      margin: 0;
                    }
                  `}
                >
                  <label
                    htmlFor="custom-input-number"
                    tw="w-full text-gray-700 text-sm font-semibold"
                  >
                    Count
                  </label>
                  <div tw="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1">
                    <button
                      data-action="decrement"
                      tw=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                    >
                      <span tw="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input
                      type="number"
                      tw=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-sm hover:text-black focus:text-black  md:text-base cursor-default flex items-center text-gray-700  outline-none"
                      name="custom-input-number"
                      value="0"
                    ></input>
                    <button
                      data-action="increment"
                      tw="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                    >
                      <span tw="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li tw="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div tw="flex w-full space-x-2 sm:space-x-4">
              <img
                tw="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80"
                alt="Set of travel chargers"
              />
              <div tw="flex flex-col justify-between w-full pb-4">
                <div tw="flex justify-between w-full pb-2 space-x-2">
                  <div tw="space-y-1">
                    <h3 tw="text-lg font-semibold leading-snug sm:pr-8">
                      Set of travel chargers
                    </h3>
                    <p tw="text-sm dark:text-gray-400">Black</p>
                  </div>
                  <div tw="text-right">
                    <p tw="text-lg font-semibold">8.99€</p>
                    <p tw="text-sm line-through dark:text-gray-600">15.99€</p>
                  </div>
                </div>
                <div tw="flex text-sm divide-x">
                  <button
                    type="button"
                    tw="flex items-center px-2 py-1 pl-0 space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      tw="w-4 h-4 fill-current"
                    >
                      <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                      <rect width="32" height="200" x="168" y="216"></rect>
                      <rect width="32" height="200" x="240" y="216"></rect>
                      <rect width="32" height="200" x="312" y="216"></rect>
                      <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                    </svg>
                    <span>Remove</span>
                  </button>
                  <button
                    type="button"
                    tw="flex items-center px-2 py-1 space-x-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      tw="w-4 h-4 fill-current"
                    >
                      <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                    </svg>
                    <span>Add to favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div tw="space-y-1 text-right">
          <p>
            Total amount:
            <span tw="font-semibold">357 €</span>
          </p>
          <p tw="text-sm dark:text-gray-400">
            Not including taxes and shipping costs
          </p>
        </div>
        <div tw="flex justify-end space-x-4">
          <button
            type="button"
            tw="px-6 py-2 border rounded-md dark:border-gray-800"
          >
            Back
            <span tw="sr-only sm:not-sr-only">to shop</span>
          </button>
          <button
            type="button"
            tw="px-6 py-2 border rounded-md dark:bg-gray-400 dark:text-gray-900 dark:border-gray-400"
          >
            <span tw="sr-only sm:not-sr-only">Continue to</span>Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default LayProducts;

const a = () => {
  return (
    // custom-number-input
    <div
      tw="h-8 w-28"
      css={css`
        & input:focus,
        & button:focus {
          outline: none !important;
        }

        & input[type="number"]::-webkit-inner-spin-button,
        & input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}
    >
      <label
        htmlFor="custom-input-number"
        tw="w-full text-gray-700 text-sm font-semibold"
      >
        Count
      </label>
      <div tw="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1">
        <button
          data-action="decrement"
          tw=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span tw="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          tw=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-sm hover:text-black focus:text-black  md:text-base cursor-default flex items-center text-gray-700  outline-none"
          name="custom-input-number"
          value="0"
        ></input>
        <button
          data-action="increment"
          tw="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        >
          <span tw="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
};

{
  /* <style>
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-number-input input:focus {
    outline: none !important;
  }

  .custom-number-input button:focus {
    outline: none !important;
  }
</style> */
}
{
  /* 
<script>
  function decrement(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value--;
    target.value = value;
  }

  function increment(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value++;
    target.value = value;
  }

  const decrementButtons = document.querySelectorAll(
    `button[data-action="decrement"]`
  );

  const incrementButtons = document.querySelectorAll(
    `button[data-action="increment"]`
  );

  decrementButtons.forEach(btn => {
    btn.addEventListener("click", decrement);
  });

  incrementButtons.forEach(btn => {
    btn.addEventListener("click", increment);
  });
</script> */
}
