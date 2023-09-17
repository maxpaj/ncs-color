type Saturation = {
  s: number;
  c: number;
};

type Hue = {
  r: number;
  g: number;
  b: number;
  y: number;
};

type NCS = Saturation & Hue;

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

export function ncsToHex(ncsString: string): NCS {
  const regex =
    /^(?:NCS)\s?(S?)\s?(\d{2})(\d{2})-(?:(N)|(?:(|Y|R|G|B)(\d{2})(Y|R|G|B)))$/g;

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

  const ncs: NCS = {
    s: parseInt(regexTest[2]),
    c: parseInt(regexTest[3]),
    r: 0,
    b: 0,
    y: 0,
    g: 0,
    ...hueColor,
  };

  return ncs;
}
