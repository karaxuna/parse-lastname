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
   * Possible values: 'Jr', 'Sr', 'II', 'III', 'IV', or null
   */
  suffix: 'Jr' | 'Sr' | 'II' | 'III' | 'IV' | null;
}

/**
 * Parse a last name and extract any suffix (Jr, Sr, II, III, IV)
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

export { parseLastName };
