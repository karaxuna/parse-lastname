/**
 * Result of parsing a last name
 */
export interface ParsedLastName {
  /**
   * The last name with suffix removed (if any)
   */
  lastName: string;

  /**
   * The suffix that was found and removed, or null if no suffix was found
   * Returns the raw matched suffix (e.g., 'Jr', 'jr', 'JR', 'JUNIOR', 'III', 'iii', etc.)
   * Use normalizeSuffix() to convert to standard format
   */
  suffix: string | null;
}

/**
 * Parse a last name and extract any suffix (Jr, Sr, I, II, III, IV)
 * @param lastName - The last name to process
 * @returns Object with cleaned lastName and suffix (or null if no suffix found)
 *
 * @example
 * ```typescript
 * parseLastName('Smith Jr'); // { lastName: 'Smith', suffix: 'Jr' }
 * parseLastName('Johnson III'); // { lastName: 'Johnson', suffix: 'III' }
 * parseLastName('Williams'); // { lastName: 'Williams', suffix: null }
 * ```
 */
declare function parseLastName(lastName: string | null | undefined): ParsedLastName;

/**
 * Normalize a suffix string to its standard format
 * @param suffix - The suffix to normalize
 * @returns Normalized suffix or null if invalid
 *
 * @example
 * ```typescript
 * normalizeSuffix('jr'); // 'Jr'
 * normalizeSuffix('SENIOR'); // 'Sr'
 * normalizeSuffix('iii'); // 'III'
 * normalizeSuffix('invalid'); // null
 * ```
 */
declare function normalizeSuffix(suffix: string | null | undefined): 'Jr' | 'Sr' | 'I' | 'II' | 'III' | 'IV' | null;

export { parseLastName, normalizeSuffix };
