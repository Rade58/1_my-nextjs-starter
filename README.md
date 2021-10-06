# BUILD SEEDING LOGIC

DON'T FORGET TO USE UNSPLASH URL FOR PICTURES FOR PRODUCTS

CHANGE OF PLAN, WE ARE NOT GOING TO USE MOCKAROO FOR MOCK DATA

WE WILL GENERATE DATA (WE DON'T WANT TO LOAD JSON FILES AND LOOP THROUGH THEM), **WE WILL USE [faker](https://www.npmjs.com/package/faker)**

```
yarn add faker
```

```
yarn add @types/faker
```

WE WILL BE USING THIS TUTORIAL:

<https://www.youtube.com/watch?v=7RrgSh4k3nM>

WHICH IS GREAT BECAUSE IT USING FAKER; BUT MAYBE IT IS A BIT OUTDATED

SO WE ARE GOING TO FOLLOW [OFFICIAL SEEDING DOCUMENTATION](https://www.prisma.io/docs/guides/database/seed-database)(BUT THIS DOESN'T SHOW THE EXAMPLE)

I ALSO FOUND THIS EXAMPLE:

IT IS 25 DAYS OLD: (SHOULD WORK)

<https://github.com/prisma/prisma-examples/blob/latest/typescript/graphql-nextjs/prisma/seed.ts>

# FIRST WE NEED TO OVERRIDE `ts-node` BY ADDING ONE SCRIPT TO `package.json`; AND WE OLSO NEED TO ADD ANOTHER THING TO `package.json`

WE WILL ADD THIS SCRIPT TO `package.json`

```json
"ts-node": "ts-node --compiler-options \"{\\\"module\\\":\\\"commonjs\\\"}\""
```

WE DID THIS SO WE CAN USE ESM IMPORTS IN A FILE WE ARE GOING TO EED FROM

AND WE WILL WE WILL ADD THIS IN SAME FILE (`package.json`)

WE ARE NOT ADDING THIS AS A SCRIPT, I'M JUST PUTTING IN TOP LEVEL IN `package.json` FILE

YOU CAN ADD THIS JUST BEFORE SCRIPTS

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

# FIRST LET'S SKAFFOLD SEEDING FILE

```
touch prisma/seed.ts
```

```ts
import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

async function main() {
  //
  // WE ARE GOING TO PRINT SOMETHING OUT FOR NOW
  // TO SEE IF THIS IS GOING TO RUN AT ALL

  console.log("SEEDING IN HERE");
  //
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

# WE MUST START DEVELOPMENT INSTANNCE OF POSTGRES

```
yarn postgres:dev
```

WE NEED TO APPLY SCHEMA ON OUR VIRGIN DATABASE

```
yarn prisma:db:push:dev
```

APARENTLY IT WORKED BECAUSE WE HAVE SEEN TEXT PRINTED OUT

# LETS ACTUALLY TEST SEEDING BY CREATING ONE RECORD

`PaymentResult` IS SMALLEST AND DOESN'T HAVRE SOME REQUIRED FOREIGN KEYS (TRY FIRST WITH HIM)

```
code prisma/seed.ts
```

```ts
import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

async function main() {
  // I ADDED THIS
  await prisma.paymentResult.create({
    data: {
      paymentId: "666",
      paymentProvider: "PayPal",
    },
  });

  console.log("SEEDING IN HERE");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

```

OK, RUN AGAIN SEEDING SCRIPT

```
yarn prisma:seed:dev
```

TEXT WAS PRINTED IN TERMINAL

LETS OPEN A PRISMA STUDIO

```
yarn prisma:studio:dev
```

I OPENED STUDIO AND I CAN SEE THAT WE ACTUALLY CREATED ONE `PaymentResult` RECORD

# WE CAN NOW USE FAKER TO SEED MORE DATA,   BUT BEFORE THAT LETS USE FAKER AND USE THEM IN METHODS THAT WILL BE INTENDED FOR CREATING SEEDING DATA

I DID CREATED SOME HELPER METHODS; THERE ARE MORE FUNCTIONS THN HELPERS, WE GENERATE DATA WITH THEM THAT IS ACCORDING TO TYPES OF OUR RECORDS ("TYPESCRIPTY FRIENDLY" TO TYPES OF OUR GENERATED PRISMA CLIENT)

```
mkdir lib/prisma/seed && lib/prisma/seed/index.ts
```

```ts
import type { Profile, Product, Review } from "@prisma/client";
// WE ONLY USE THIS TO CREATE THINGS QUICKLY (TELLING YOU BECAUSE
// NORMALLY FOR MOST RECORDS IDS ARE AUTO-GENERATED)
import cuid from "cuid";
//
import faker from "faker";

const unsplashTemplate = (name: string) => {
  const arr = name.split(" ");
  const prodName = arr[arr.length - 1];

  return `https://source.unsplash.com/800x600/?${prodName}`;
};

export const generateProfilesData = (numberOfProfiles: number) => {
  const profilesData: Profile[] = [];
  const profileIds: string[] = [];

  for (let i = 0; i < numberOfProfiles; i++) {
    const id = cuid();

    profileIds.push(id);

    profilesData.push({
      id,
      city: faker.address.city(),
      country: faker.address.country(),
      nick: null,
      postalCode: faker.address.zipCode(),
      streetAddress: `${faker.address.streetName()}, number: ${Math.round(
        Math.random() * 100
      )}`,
      role: "USER",
      userId: null,
      createdAt: faker.date.past(),
      updatedAt: faker.date.future(),
    });
  }

  return { profilesData, profileIds };
};

export const generateProductData = (numberOfProducts: number) => {
  const productsData: Product[] = [];
  const productIds: string[] = [];

  for (let i = 0; i < numberOfProducts; i++) {
    // WE WILL DO THAT EVERY OTHER PRODUCT IS OUT OF STOCK

    const countInStock = !(i % 2)
      ? 0
      : parseInt(`${Math.random() * 10}`) * parseInt(`${Math.random() * 10}`);

    const productName = faker.commerce.productName();

    const id = cuid();

    productIds.push(id);

    productsData.push({
      id,
      name: productName,
      image: unsplashTemplate(productName),
      countInStock,
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      brand: faker.company.companyName(),
      price: faker.commerce.price(),
      adminId: null,
      createdAt: faker.date.past(),
      updatedAt: faker.date.future(),
    });
  }

  return { productsData, productIds };
};

// FOR Reviews WE WOULD NEED EXISTING PRODUCTS
// AND EXISTING PROFILES

export const generateReviewsData = (
  prdoductIds: string[],
  profileIds: string[]
) => {
  const reviewsData: Review[] = [];

  // LETS SAY EVERY PRODUCT SHOUD HAVE 4 REVIEEWS

  for (let i = 0; i < prdoductIds.length; i++) {
    let profileNo = 0;
    let back = false;

    const profileId = profileIds[profileNo];

    for (let j = 0; j < 5; j++) {
      //
      //
      reviewsData.push({
        id: cuid(),
        productId: prdoductIds[i],
        profileId,
        comment: faker.lorem.sentences(),
        rating: Math.round(Math.random() * 5.1) || 1,
        createdAt: faker.date.past(),
        updatedAt: faker.date.future(),
      });

      if (back) {
        profileNo--;
      } else {
        profileNo++;
      }

      if (profileNo === profileIds.length) {
        back = true;
      }
      if (profileNo < 0) {
        back = false;
      }
    }
  }

  return reviewsData;
};
```

# LETS DEFINE SEEDING NOW

```
code prisma/seed.ts
```

```ts
/// # THIS FILE IS ALSO GOING TO BE RUN IF YOU DO MIGRATES
// I USE IT TO SEED MY DEVELOPMENT DATBASE
import { PrismaClient } from "@prisma/client";

// WE WILL USE THESE FUNCTIONS
import {
  generateProductData,
  generateProfilesData,
  generateReviewsData,
  // THIS KIND A SHORT HAND IMPORT WONT WORK
  // } from "@/lib/prisma/seed";
  // WE WILL USE THIS
} from "../lib/prisma/seed";

const prisma = new PrismaClient();

async function main() {
  // WE CAN CREATE BUNCH OF USERS AND BUNCH OF PROFILES
  // WE CAN CREATE ONE SUPERADMIN PROFILE
  // CREATE COUPLE OF ADMIN USERS (WE DON'T NEED THIS NOW (WE ARE GOING TO DO THIS LATER))
  // WE CAN CREATE BUNCH OF PRODUCTS
  // AND WE CAN CREATE COUPLE OF REVIEWS FOR EACH PRODUCT
  //
  // CREATING ONE SUPERADMIN
  await prisma.profile.create({
    data: {
      nick: "pneuma",
      role: "SUPERADMIN",
    },
  });

  // LETS NOT CREATE User RECORDS, WE ONLY NEED Profile RECORDS
  // SINCE WE ONLY WANT BUNCH OF Profiles AND ALSO BUNCH OF
  // Products AND WE WANT Reviews
  // BECAUSE WE WANT TO SEE BUNCH OF PRODUCTS WHERE BUNCH OF PROFILES LEFT A REVIEW

  const profileData = generateProfilesData(30);
  const productData = generateProductData(60);
  const reviewsData = generateReviewsData(
    productData.productIds,
    profileData.profileIds
  );

  // console.log({ reviewsData });

  // SEEDING PROFILES
  await prisma.profile.createMany({
    data: profileData.profilesData,
  });

  // SEEDING PRODUCTS
  await prisma.product.createMany({
    data: productData.productsData,
  });

  // SEEDING REVIEWS
  await prisma.review.createMany({
    data: reviewsData,
  });

  //

  console.log("SEEDED SOME DATA");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

# LETS RUN SEEDING

DONT FORGET TO START YOUR DEVELOPMENT DATABASE

```
yarn postgres:dev
```

YOU CAN PUSH SCHEMA BECAUSE WE CHANGED IT A BIT DURING DEVELOPMENT

```
yarn prisma:db:push:dev
```

NOW WE SEED

```
yarn prisma:seed:dev
```

I WOULD SAY THAT THIS WAS PRETTY QUICK

LETS OPEN STUDIO TO SEE IF RECORDS ARE CREATED

```
yarn prisma:studio:dev
```

YES WE HAVE ALL DATA, AND FOREIGN KEYS ARE THERE, SO OUR RELATIONS ARE GOOD (Review HAS ONE FOR Profile AND ONE FOR Product)

**SO THAT IS IT FOR SEEDING**

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
