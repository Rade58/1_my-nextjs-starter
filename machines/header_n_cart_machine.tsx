import { createMachine, assign, interpret } from "xstate";

/**
 * @description finite states enum
 */
export enum fse {
  header_visible = "header_visible",
  cart_visible = "cart_viible",
}

/**
 * @description EVENTS ENUM
 */
export enum EE {
  TOGGLE = "TOGGLE",

  // events not depending on finite state
}

// TO BE USED AS GENERIC TYPES INSIDE STATE MACHINE DEFINISTION

export interface MachineContextGenericI {
  random: number;
}

export type machineEventsGenericType = /* | {
      type: EE.CHECK_CURRENT_DARK_MODE;
      payload: {
        isDark: boolean;
      };
    }
  | */ {
  type: EE.TOGGLE;
};

export type machineFiniteStatesGenericType =
  | {
      value: fse.cart_visible;
      context: MachineContextGenericI;
    }
  | {
      value: fse.header_visible;
      context: MachineContextGenericI;
    };

// -----------------  MACHINE --------------------

const headerNcartMachine = createMachine<
  MachineContextGenericI,
  machineEventsGenericType,
  machineFiniteStatesGenericType
>({
  id: "main_machine",
  initial: fse.header_visible,
  context: {
    random: 666,
  },
  // ---- EVENTS RECEVIED WHEN CURRENT FINITE STATE DOESN'T MATTER -----
  on: {
    /* [EE.CHECK_CURRENT_DARK_MODE]: {
      actions: [
        assign((ctx, event) => {

          return {random:  2}
          
        }),
      ],
    }, */
  },
  // -------------------------------------------------------------------
  states: {
    [fse.header_visible]: {
      on: {
        [EE.TOGGLE]: {
          target: fse.cart_visible,
        },
      },
    },
    [fse.cart_visible]: {
      on: {
        [EE.TOGGLE]: {
          target: fse.header_visible,
        },
      },
    },
  },
});

export const headerNCartService = interpret(headerNcartMachine);

headerNCartService.onTransition((state, event) => {
  //
  console.log({ state: state.value });
  console.log("TRANSITION");
});
