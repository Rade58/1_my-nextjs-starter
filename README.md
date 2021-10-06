# TESTING SETUP

WE WOULD LIKE TO TEST MANY THINGS BUT WE ARE GOING TO START A LITTLE BIT SIMPLER THAN AFTER THT WE WILL GO INTO MORE ADVANCED THINGS

```
yarn add --dev @types/jest jest
```

WE ALREDY INSTALLED `ts-node` BEFORE, JUST KNO IT IS NEEDED TOO

## GENERETING JEST CONFIG

```
yarn jest --init
```

PICK TO CLEAR MOCKS BETWEEN TEST, PICK NODE, PICK BABEL WHEN PROMPTED

MEYBE WE ARE GOING TO CHANE SOME SSTUFF IN THIS FILE

## MAKE A TEST SCRIPT AND YOU CAN DEFINE EXECUTION OF THAT SCRIPT ALSO INSIDE BUILD SCRIPT

```
code package.json
```

```json
"build": "next build && yarn test",
"test": "jest --watchAll --no-cache",
```

## LETS TRY EXECUTING THIS SCRIPT DESPITE WE DON THAVE ANY TESTS

```
yarn test
```

IT CHECKED 72 FILES DIDN;T FIND ANY TEST AND IT EXITET WITH ERROR CODE 1

## LETS CREATE SOME TEST; YOU CAN CALL IT 'MOCK TEST' BECAUSE WE JUST WANT TO SEE IF TEST IS GOING TO BE PROCESSED

```
mkdir tests 
```

```
mkdir tests/api && touch tests/api/banana.test.ts
```

```ts
test("calculate something", () => {
  const foo = 8;
  const bar = 6;

  expect(foo + bar).toEqual(14);
});
```

**WE CAN START TEST SUITE**

```
yarn test
```

IT WORKS

# OK, BUT HOW TO TEST OUR API ROUTES

WE CAN'T USE supertest BUT WE CAN USE SOMETHING CALLLED [`node-mocks-http`](https://www.npmjs.com/package/node-mocks-http?activeTab=readme)

**YES, WE CAN MOCK req AN res OBJECTS BUT LETS NOT DO THAT THING**

HOPEFULLY MENTIONED PACKAGE CAN WORK WELL, I AM CONCERNED BECAUSE I'M USING next-connect BUT MAYEBE THAT DOESN'T MATTER (**IT DOESN'T WORK next-connect**)

```
yarn add --dev node-mocks-http
```

# LETS NOW CREATE SOME API ROUTE

**I FOUND OUT EARLIER THAT next-connect DOESN'T WORK**

```
touch pages/api/EXAMPLE/[someId].ts
```

```ts
import type { NextApiRequest, NextApiResponse } from "next";

import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>();


// THIS WON-T WORK

handler.get(async (req, res) => {
  const { someId } = req.query;

  res.statusCode = 200;

  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify({ message: `Hello ${someId}` }));
});

// export default handler;

// THIS WILL WORK

export default function handleAnimal(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { someId },
  } = req;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: `Hello ${someId}` }));
}

```

## LETS WRITE TEST FOR UPPER ROUTE; AND PAY ATTENTION THAT YOU CAN'T PUT YOUR TEST FILES INSIDE `pages` BECAUSE YOU WILL CREATE MESS, YOU KNOW WHY; ALSO WE CANT USE `[]` IN TEST FILE NAMINGS

**SO BESICALLY WE WILL CREATE __tests__ FOLDER**

```
mkdir -p __tests__/api/EXAMPLE && touch __tests__/api/EXAMPLE/someId.test.ts
```

```ts
import { createMocks } from "node-mocks-http";

// WE NEED TO IMPORT HANDLER
import someHandler from "../../../pages/api/EXAMPLE/[someId]";

describe("/api/[someId] should establish World Piece", () => {
  it("returns object with a message field", async () => {
    // CREATING MOCK REQUEST AND RESPONSE
    const a = createMocks({
      method: "GET",
      query: {
        someId: "here-she-comes",
      },
    });

    // WE CALL OUR HANDLER WITH req AND res

    await someHandler(a.req, a.res);

    console.log(JSON.stringify({ a }, null, 2));

    // OUR EXPECTTION
    // CHECK DOCK FOR THE METHODS YOU CAN USE ON req AND res
    // https://github.com/howardabrams/node-mocks-http

    expect(a.res._getStatusCode()).toBe(200);
    expect(a.res._getJSONData()).toBeDefined();
    expect(a.res._getJSONData()).toHaveProperty("message");
    expect(a.res._getJSONData()).toEqual({ message: "Hello here-she-comes" });
  });
});
```

```
yarn test
```

IT WORKED

# I THINK I'M NOT GOING TO TEST SERVERLESS API ROUTES

LOOKS PRETTY PAINFULL BECAUSE I LIKE next-connect

ALSO I'LL PUT ON HOLD CREATING TEST DATABSE ENVIROMENT WITH DOCKER (FOR PRISMA AND POSTGRES); ALSO LOOKS A BIT LIKE A OVERKILL

<!-- ## STYLING

USING TAILWIND TOGETHER WITH EMOTION (**TWIN MACRO BY ben-rogerson**)

twin.macro with emotion (explained)

<https://github.com/ben-rogerson/twin.examples/tree/master/next-emotion>


typescript emotion example (very nice, has more stuff) (maybe is missing something but it is a good starter to build upon):

<https://github.com/ben-rogerson/twin.examples/tree/master/next-emotion-typescript>

**THESE ARE THE DOCS FOR TWIN MACRO**

<https://github.com/ben-rogerson/twin.macro/tree/master/docs>

**MUST READ**: (UNDER RESOURCS)

<https://github.com/ben-rogerson/twin.macro#resources>

MOST IMPORTAT THING (AT LEAST FOR ME): USE `css={[tw``]}` FOR DYNAMIC STYLES, AND USE `tw=""` OTHERVISE

## ANIMATIONS AND TRANSITIONS

FRAMER MOTION (SOMETIMES I DON'T LIKE HOW IT WORKS BECAUSE IT TENDS TO RANDOMLY SETS display PROPERTY) (IF YOU ARE ANIMATING SIZES)

## COLOR MODE

next-themes

# STATE MANGEMENT

xstate @xstate/react

# AUTHENTICATION

next-auth

# DATABASES

PRODUCTION: `PostgreSQL 13.3` ON `Supabase`

DEVELOPMENT: `PostgreSQL 13.3` SPINNED UP WITH DOCKER

ORM: Prisma

Redis 5.0.8:

PRODUCTION: `Upstash`

DEVELOPMENT: `Another Docker Container`

# EXPIRATION SERVICE, MAYBE ALSO, "SPECIAL CART SERVICE"

USING `BullMQ`


 -->

 <!-- 

## IDEAS

`WE SHOULD BUILD ECHO API (LIKE A STREAMING SERVER BUT MANUAL)`

WE SHOULD PUT CART IN A DETABSE, INSTEAD OF LOCAL STORAGE (BECAUSE IF WE USE THIS SERVER SIDE WE CAN EXPIRE CART, WE CAN DESTROY CART OBJECT)

MAYBE CART SHOULD BE KEPT IN REDIS, AND EXPIRE AFTER 3 HOURS IF LEFT TO BE STALE

WE NEED A STEP TO CHECK IF MAYBE SOMEONE BOUGHT SOMETHING AND STUFF IN CART IS MISSING (WHEN THAT HAPPENS USER SHOULD BE GIVEN THE INFO THAT "SOMEONE BOUGHT PRODUCT AS HE WAS FILLING CART", HE SHOULDN'T HAV ANY OPTIONS TO DO, JUST INFO AND WE LOWER HIS PRODUCT COUNT, OR IF THERE IS NONE WE REMOVE THE PRODUCT)
(LOW COUNT PRODUCTS SHOULD BE MARKED AS `HOT` OR WE SHOULD HAVE INFO: "HURRY UP, ONLY 10 LEFT IN STOCK") 

ORDER MARKED AS EXPIRED

CHECKING STOCK

CHECKING STOCK EVERY TIME USERS ADD TO CART

WHEN SEEDING YOU SHOULD SHOW ONE PRODUCT NOT IN STOCK AND THEN ONE PRODUCT IN STOCK AND SO ON AND SO ON (FOR EASIER DEVELOPMENT)


ADD TWO SCRIPTS FOR STARTING DEV DATBASES

AND OTHER FOR KILLING DATBASES, BECAUSE WE CAN KILL CONTAINER BY NAME, NOT JUST BY HIS ID 

FOR IMAGE UPLOAD USE CLOUDINARY


IMPLEMENT FAVORITE PRODUCTS OR WISHLIST 


 -->
