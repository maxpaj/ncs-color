import { ncsToHex } from "./ncs-color";

describe("ncs-color", () => {
  const ncs = [
    "NCS 0580-Y10R",
    "NCS S0580-Y10R",
    "NCS S0580-G10Y",
    "NCS S0580-N",
    "NCS S 9000-N",
    "NCS 4055-R95B",
  ];

  const hex = ncs.map(ncsToHex);
  console.log(hex);
});
