export const clamp = (
  num: number,
  min: number,
  max: number,
): number => Math.max(min, Math.min(num, max));

export const isNullOrWhitespace = (str: string): boolean => !str || !str.trim();
