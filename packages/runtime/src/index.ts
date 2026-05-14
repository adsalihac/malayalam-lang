export class MalayalamRuntime {
  /**
   * Print/display output - corresponds to കാണിക്കുക
   */
  static print(...args: unknown[]): void {
    console.log(...args);
  }

  /**
   * Convert to string
   */
  static toString(value: unknown): string {
    return String(value);
  }

  /**
   * Convert to number
   */
  static toNumber(value: unknown): number {
    return Number(value);
  }

  /**
   * Type of value
   */
  static typeof(value: unknown): string {
    return typeof value;
  }

  /**
   * Parse integer
   */
  static parseInt(value: string, radix?: number): number {
    return parseInt(value, radix);
  }

  /**
   * Parse float
   */
  static parseFloat(value: string): number {
    return parseFloat(value);
  }

  /**
   * Check if value is NaN
   */
  static isNaN(value: unknown): boolean {
    return Number.isNaN(value);
  }

  /**
   * Check if value is finite
   */
  static isFinite(value: unknown): boolean {
    return Number.isFinite(value as number);
  }

  /**
   * Get length of array or string
   */
  static getLength(value: unknown): number {
    if (
      typeof value === 'string' ||
      Array.isArray(value) ||
      (typeof value === 'object' && value !== null && 'length' in value)
    ) {
      return (value as { length: number }).length;
    }
    return 0;
  }

  /**
   * Create array
   */
  static array(...items: unknown[]): unknown[] {
    return items;
  }

  /**
   * Get absolute value
   */
  static abs(value: number): number {
    return Math.abs(value);
  }

  /**
   * Get maximum value
   */
  static max(...values: number[]): number {
    return Math.max(...values);
  }

  /**
   * Get minimum value
   */
  static min(...values: number[]): number {
    return Math.min(...values);
  }

  /**
   * Round number
   */
  static round(value: number): number {
    return Math.round(value);
  }

  /**
   * Floor (round down)
   */
  static floor(value: number): number {
    return Math.floor(value);
  }

  /**
   * Ceiling (round up)
   */
  static ceil(value: number): number {
    return Math.ceil(value);
  }

  /**
   * Power
   */
  static pow(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }

  /**
   * Square root
   */
  static sqrt(value: number): number {
    return Math.sqrt(value);
  }

  /**
   * String concatenation
   */
  static concat(...values: unknown[]): string {
    return values.map(String).join('');
  }

  /**
   * String to uppercase
   */
  static toUpperCase(value: string): string {
    return value.toUpperCase();
  }

  /**
   * String to lowercase
   */
  static toLowerCase(value: string): string {
    return value.toLowerCase();
  }

  /**
   * String substring
   */
  static substring(
    value: string,
    start: number,
    end?: number
  ): string {
    return value.substring(start, end);
  }

  /**
   * String character at index
   */
  static charAt(value: string, index: number): string {
    return value.charAt(index);
  }

  /**
   * String index of
   */
  static indexOf(value: string, search: string): number {
    return value.indexOf(search);
  }

  /**
   * String replace
   */
  static replace(value: string, search: string, replacement: string): string {
    return value.replace(search, replacement);
  }

  /**
   * String split
   */
  static split(value: string, separator: string): string[] {
    return value.split(separator);
  }

  /**
   * String trim
   */
  static trim(value: string): string {
    return value.trim();
  }
}

export default MalayalamRuntime;
