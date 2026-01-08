/**
 * Remove suffix from last name and return both the cleaned last name and the suffix
 * @param {string} lastName - The last name to process
 * @returns {{lastName: string, suffix: string|null}} Object with cleaned lastName and suffix (or null if no suffix found)
 */
module.exports.parseLastName = function parseLastName(lastName) {
  if (!lastName || typeof lastName !== 'string') {
    return { lastName: lastName || '', suffix: null };
  }

  const trimmedName = lastName.trim();

  if (!trimmedName) {
    return { lastName: '', suffix: null };
  }

  // Define suffix patterns (case-insensitive)
  // Match suffixes at the end of the string, potentially with periods and spaces
  const suffixPatterns = [
    // Roman numerals (must come first to match longer ones first)
    { pattern: /\s+(IV|iv)\.?\s*$/, suffix: 'IV' },
    { pattern: /\s+(III|iii)\.?\s*$/, suffix: 'III' },
    { pattern: /\s+(II|ii)\.?\s*$/, suffix: 'II' },
    // Jr and Sr
    { pattern: /\s+(Jr|jr|JR|junior|Junior|JUNIOR)\.?\s*$/, suffix: 'Jr' },
    { pattern: /\s+(Sr|sr|SR|senior|Senior|SENIOR)\.?\s*$/, suffix: 'Sr' },
  ];

  // Try to match each suffix pattern
  for (const { pattern, suffix } of suffixPatterns) {
    const match = trimmedName.match(pattern);
    if (match) {
      const cleanedLastName = trimmedName.replace(pattern, '').trim();
      // Only return if there's a valid last name remaining
      if (cleanedLastName) {
        return { lastName: cleanedLastName, suffix };
      }
    }
  }

  // No suffix found
  return { lastName: trimmedName, suffix: null };
};
