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
