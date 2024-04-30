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

export {generateColors};
