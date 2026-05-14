import { describe, it, expect } from 'vitest';
import { MalayalamRuntime } from './index.js';

describe('MalayalamRuntime', () => {
  it('converts number to string', () => {
    expect(MalayalamRuntime.toString(42)).toBe('42');
  });

  it('converts number correctly', () => {
    expect(MalayalamRuntime.toNumber('3.14')).toBe(3.14);
    expect(MalayalamRuntime.toNumber('abc')).toBeNaN();
  });

  it('checks isFinite', () => {
    expect(MalayalamRuntime.isFinite(10)).toBe(true);
    expect(MalayalamRuntime.isFinite(Infinity)).toBe(false);
  });

  it('getLength returns correct length for strings', () => {
    expect(MalayalamRuntime.getLength('hello')).toBe(5);
    expect(MalayalamRuntime.getLength('')).toBe(0);
  });

  it('getLength returns correct length for arrays', () => {
    expect(MalayalamRuntime.getLength([1, 2, 3])).toBe(3);
    expect(MalayalamRuntime.getLength([])).toBe(0);
  });

  it('getLength returns 0 for non-iterable', () => {
    expect(MalayalamRuntime.getLength(42)).toBe(0);
    expect(MalayalamRuntime.getLength(null)).toBe(0);
  });

  it('abs returns absolute value', () => {
    expect(MalayalamRuntime.abs(-5)).toBe(5);
    expect(MalayalamRuntime.abs(5)).toBe(5);
  });

  it('sqrt returns square root', () => {
    expect(MalayalamRuntime.sqrt(9)).toBe(3);
  });

  it('floor rounds down', () => {
    expect(MalayalamRuntime.floor(4.9)).toBe(4);
  });

  it('ceil rounds up', () => {
    expect(MalayalamRuntime.ceil(4.1)).toBe(5);
  });

  it('round rounds to nearest', () => {
    expect(MalayalamRuntime.round(4.5)).toBe(5);
    expect(MalayalamRuntime.round(4.4)).toBe(4);
  });

  it('max returns maximum value', () => {
    expect(MalayalamRuntime.max(1, 2, 3)).toBe(3);
  });

  it('min returns minimum value', () => {
    expect(MalayalamRuntime.min(1, 2, 3)).toBe(1);
  });
});
