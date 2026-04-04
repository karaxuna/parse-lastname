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
   * Returns the raw matched suffix (e.g., "Jr", "jr", "JR", "JUNIOR", "III", "iii", etc.)
   * Use normalizeSuffix() to convert to standard format
   */
  suffix: string | null;
}

/**
 * Normalize a suffix string to its standard format
 * @param suffix - The suffix to normalize
 * @returns Normalized suffix ("Jr", "Sr", "I", "II", "III", "IV") or null if invalid
 */
export function normalizeSuffix(suffix: string | null | undefined): "Jr" | "Sr" | "I" | "II" | "III" | "IV" | null {
  if (!suffix || typeof suffix !== "string") {
    return null;
  }

  const trimmedSuffix = suffix.toUpperCase();

  if (trimmedSuffix === "IV") {
    return "IV";
  } else if (trimmedSuffix === "III") {
    return "III";
  } else if (trimmedSuffix === "II") {
    return "II";
  } else if (trimmedSuffix === "I") {
    return "I";
  } else if (trimmedSuffix === "JR" || trimmedSuffix === "JUNIOR") {
    return "Jr";
  } else if (trimmedSuffix === "SR" || trimmedSuffix === "SENIOR") {
    return "Sr";
  }

  return null;
}

/**
 * Check if a string is a valid suffix
 * @param suffix - The string to check
 * @returns true if the string is a recognized suffix, false otherwise
 */
export const isSuffix = (suffix: string): boolean => {
  return /^(IV|iv|III|iii|II|ii|I|i|Jr|jr|JR|junior|Junior|JUNIOR|Sr|sr|SR|senior|Senior|SENIOR)\.?$/.test(suffix);
};

/**
 * Remove suffix from last name and return both the cleaned last name and the suffix
 * @param lastName - The last name to process
 * @returns Object with cleaned lastName and suffix (or null if no suffix found)
 */
export function parseLastName(lastName: string | null | undefined): ParsedLastName {
  if (!lastName || typeof lastName !== "string") {
    return { lastName: (lastName as string) || "", suffix: null };
  }

  const trimmedName = lastName.trim();

  if (!trimmedName) {
    return { lastName: "", suffix: null };
  }

  const parts = trimmedName.split(/\s+/);
  if (parts.length > 1) {
    const potentialSuffix = parts[parts.length - 1];

    if (isSuffix(potentialSuffix)) {
      const cleanedLastName = parts.slice(0, -1).join(" ");
  
      if (cleanedLastName) {
        const suffix = potentialSuffix.replace(/\.$/, "");

        return {
          lastName: cleanedLastName,
          suffix,
        };
      }
    }
  }

  return { lastName: trimmedName, suffix: null };
}
