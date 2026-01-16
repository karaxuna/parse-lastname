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

  // Single regex pattern to match all suffixes
  const suffixPattern = /\s+(IV|iv|III|iii|II|ii|I|i|Jr|jr|JR|junior|Junior|JUNIOR|Sr|sr|SR|senior|Senior|SENIOR)\.?\s*$/;

  const match = trimmedName.match(suffixPattern);
  if (match) {
    const cleanedLastName = trimmedName.replace(suffixPattern, '').trim();
    // Only return if there's a valid last name remaining
    if (cleanedLastName) {
      // Normalize the suffix
      const matchedSuffix = match[1].toUpperCase();
      let normalizedSuffix;

      if (matchedSuffix === 'IV') {
        normalizedSuffix = 'IV';
      } else if (matchedSuffix === 'III') {
        normalizedSuffix = 'III';
      } else if (matchedSuffix === 'II') {
        normalizedSuffix = 'II';
      } else if (matchedSuffix === 'I') {
        normalizedSuffix = 'I';
      } else if (matchedSuffix === 'JR' || matchedSuffix === 'JUNIOR') {
        normalizedSuffix = 'Jr';
      } else if (matchedSuffix === 'SR' || matchedSuffix === 'SENIOR') {
        normalizedSuffix = 'Sr';
      }

      return { lastName: cleanedLastName, suffix: normalizedSuffix };
    }
  }

  // No suffix found
  return { lastName: trimmedName, suffix: null };
};
