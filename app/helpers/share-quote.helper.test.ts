import { getHostname } from "./share-quote.helper";

import { faker } from "@faker-js/faker";
test("getHostname returns correct url", () => {
  const input = faker.random.alphaNumeric();
  expect(
    getHostname(
      { location: { protocol: "http:", host: "localhost:3000" } } as Window,
      input
    )
  ).toBe(`http://localhost:3000/${input}`);
});
