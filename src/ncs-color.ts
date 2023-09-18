type Nuance = {
  blackness: number;
  chromaticness: number;
  saturation: number;
  whiteness: number;
  lightness: number;
};

type Hue = {
  red: number;
  green: number;
  blue: number;
  yellow: number;
};

type NCS = { edition: string } & Nuance & Hue;
type HueColor = keyof Hue;

function getHueColor(
  isChromatic: boolean,
  hueAmount: number,
  firstColor: HueColor,
  secondColor: HueColor
) {
  const hueColor = {
    r: 0,
    b: 0,
    y: 0,
    g: 0,
  } as { [key: string]: number };

  if (isChromatic) {
    return hueColor;
  }

  hueColor[firstColor] = 100 - hueAmount;
  hueColor[secondColor] = hueAmount;

  return hueColor;
}

function getColor(color: string): HueColor {
  if (!["r", "g", "b", "y"].includes(color.toLowerCase())) {
    throw Error("Not a color");
  }

  return color as HueColor;
}

export function parseNCS(ncsString: string): NCS {
  const regex =
    /^(?:NCS)\s?(S?)\s?(\d{2})(\d{2})-(?:(N)|(?:(Y|R|G|B)(\d{2})(Y|R|G|B)))$/g;

  const regexTest = regex.exec(ncsString);

  if (!regexTest) {
    throw Error(`Not NCS formatted ${ncsString}`);
  }

  const isChromatic = !!regexTest[4];

  const hueColor = getHueColor(
    isChromatic,
    parseInt(regexTest[6]),
    getColor(regexTest[5]),
    getColor(regexTest[7])
  );

  const blackness = parseInt(regexTest[2]);
  const chromaticness = parseInt(regexTest[3]);

  const whiteness = 100 - blackness - chromaticness;
  const lightness = (100 - blackness) / 100;
  const saturation = chromaticness / (whiteness + chromaticness);

  const ncs: NCS = {
    edition: "",
    blackness: blackness,
    whiteness: whiteness,
    lightness: lightness,
    chromaticness: chromaticness,
    saturation: saturation,
    red: 0,
    blue: 0,
    yellow: 0,
    green: 0,
    ...hueColor,
  };

  return ncs;
}
