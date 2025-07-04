/**
 * Adds an opacity to a color
 * @param color The color in hex format without the alpha channel
 * @param opacity The opacity between 0 and 1
 * @returns The color in hex with the opacity applied
 */
export const addColorTransparency = (color: string, opacity: number) => {
  if (opacity < 0 || opacity > 1) {
    throw new Error('Opacity must be between 0 and 1.');
  }

  if (color.length !== 7 || !color.startsWith('#')) {
    throw new Error('Color must be in hex format without the alpha channel.');
  }

  return `${color}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')}`;
};
