import { describe, expect, it } from 'vitest';

import { addColorTransparency } from './color';

describe('color utils', () => {
  it('addColorTransparency', () => {
    expect(addColorTransparency('#000000', 0.5)).toBe('#00000080');
    expect(addColorTransparency('#000000', 1)).toBe('#000000ff');
    expect(addColorTransparency('#000000', 0)).toBe('#00000000');
    expect(() => addColorTransparency('#000000', -1)).toThrow();
    expect(() => addColorTransparency('#000000', 2)).toThrow();
    expect(() => addColorTransparency('rgb(0,0,0)', 1)).toThrow();
  });
});
