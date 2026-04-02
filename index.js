/**
 * Normalize a suffix string to its standard format
 * @param {string} suffix - The suffix to normalize
 * @returns {string|null} Normalized suffix ('Jr', 'Sr', 'I', 'II', 'III', 'IV') or null if invalid
 */
module.exports.normalizeSuffix = function (suffix) {
  if (!suffix || typeof suffix !== 'string') {
    return null;
  }

  const trimmedSuffix = suffix.toUpperCase();

  if (trimmedSuffix === 'IV') {
    return 'IV';
  } else if (trimmedSuffix === 'III') {
    return 'III';
  } else if (trimmedSuffix === 'II') {
    return 'II';
  } else if (trimmedSuffix === 'I') {
    return 'I';
  } else if (trimmedSuffix === 'JR' || trimmedSuffix === 'JUNIOR') {
    return 'Jr';
  } else if (trimmedSuffix === 'SR' || trimmedSuffix === 'SENIOR') {
    return 'Sr';
  }

  return null;
};

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

  const suffixPattern = /\s+(IV|iv|III|iii|II|ii|I|i|Jr|jr|JR|junior|Junior|JUNIOR|Sr|sr|SR|senior|Senior|SENIOR)\.?\s*$/;

  const match = trimmedName.match(suffixPattern);
  if (match) {
    const cleanedLastName = trimmedName.replace(suffixPattern, '').trim();
    if (cleanedLastName) {
      const suffix = match[1].trim();

      return {
        lastName: cleanedLastName,
        suffix,
      };
    }
  }

  return { lastName: trimmedName, suffix: null };
};
