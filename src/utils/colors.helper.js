import chroma from "chroma-js";

function generateColors(baseColors, count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const baseColorIndex = i % baseColors.length;
    const baseColor = baseColors[baseColorIndex];
    const color = chroma(baseColor)
      .brighten(i / count)
      .hex();
    colors.push(color);
  }
  return colors;
}

const generateDynamicColors = (baseColors, count, options = {}) => {
  const {
    hueShift = 0,
    lightnessRange = [0.5, 0.8],
    saturationRange = [0.5, 1],
  } = options;

  const colors = [];
  for (let i = 0; i < count-baseColors.length; i++) {
    const baseColorIndex = i % baseColors.length;
    const baseColor = baseColors[baseColorIndex];
    const color = chroma(baseColor)
      .set("hsl.h", (chroma(baseColor).get("hsl.h") + hueShift) % 360)
      .set(
        "hsl.l",
        lightnessRange[0] +
          (lightnessRange[1] - lightnessRange[0]) * (i / count)
      )
      .set(
        "hsl.s",
        saturationRange[0] +
          (saturationRange[1] - saturationRange[0]) * (i / count)
      )
      .hex();
    colors.push(color);
  }
  return baseColors.concat(colors);
};

export { generateColors, generateDynamicColors };
