const { parseLastName } = require('./index');

describe('parseLastName', () => {
  describe('Jr suffix removal', () => {
    test('should remove "Jr" from last name', () => {
      expect(parseLastName('Smith Jr')).toEqual({ lastName: 'Smith', suffix: 'Jr' });
    });

    test('should remove "Jr." with period from last name', () => {
      expect(parseLastName('Johnson Jr.')).toEqual({ lastName: 'Johnson', suffix: 'Jr' });
    });

    test('should remove "jr" lowercase from last name', () => {
      expect(parseLastName('Williams jr')).toEqual({ lastName: 'Williams', suffix: 'Jr' });
    });

    test('should remove "jr." lowercase with period', () => {
      expect(parseLastName('Brown jr.')).toEqual({ lastName: 'Brown', suffix: 'Jr' });
    });

    test('should remove "JR" uppercase from last name', () => {
      expect(parseLastName('Davis JR')).toEqual({ lastName: 'Davis', suffix: 'Jr' });
    });

    test('should remove "JR." uppercase with period', () => {
      expect(parseLastName('Miller JR.')).toEqual({ lastName: 'Miller', suffix: 'Jr' });
    });

    test('should remove "Junior" from last name', () => {
      expect(parseLastName('Wilson Junior')).toEqual({ lastName: 'Wilson', suffix: 'Jr' });
    });

    test('should remove "junior" lowercase', () => {
      expect(parseLastName('Moore junior')).toEqual({ lastName: 'Moore', suffix: 'Jr' });
    });

    test('should remove "JUNIOR" uppercase', () => {
      expect(parseLastName('Taylor JUNIOR')).toEqual({ lastName: 'Taylor', suffix: 'Jr' });
    });

    test('should handle "Jr" with extra spaces', () => {
      expect(parseLastName('Anderson  Jr  ')).toEqual({ lastName: 'Anderson', suffix: 'Jr' });
    });
  });

  describe('Sr suffix removal', () => {
    test('should remove "Sr" from last name', () => {
      expect(parseLastName('Smith Sr')).toEqual({ lastName: 'Smith', suffix: 'Sr' });
    });

    test('should remove "Sr." with period from last name', () => {
      expect(parseLastName('Johnson Sr.')).toEqual({ lastName: 'Johnson', suffix: 'Sr' });
    });

    test('should remove "sr" lowercase from last name', () => {
      expect(parseLastName('Williams sr')).toEqual({ lastName: 'Williams', suffix: 'Sr' });
    });

    test('should remove "sr." lowercase with period', () => {
      expect(parseLastName('Brown sr.')).toEqual({ lastName: 'Brown', suffix: 'Sr' });
    });

    test('should remove "SR" uppercase from last name', () => {
      expect(parseLastName('Davis SR')).toEqual({ lastName: 'Davis', suffix: 'Sr' });
    });

    test('should remove "SR." uppercase with period', () => {
      expect(parseLastName('Miller SR.')).toEqual({ lastName: 'Miller', suffix: 'Sr' });
    });

    test('should remove "Senior" from last name', () => {
      expect(parseLastName('Wilson Senior')).toEqual({ lastName: 'Wilson', suffix: 'Sr' });
    });

    test('should remove "senior" lowercase', () => {
      expect(parseLastName('Moore senior')).toEqual({ lastName: 'Moore', suffix: 'Sr' });
    });

    test('should remove "SENIOR" uppercase', () => {
      expect(parseLastName('Taylor SENIOR')).toEqual({ lastName: 'Taylor', suffix: 'Sr' });
    });
  });

  describe('Roman numeral suffix removal', () => {
    test('should remove "I" from last name', () => {
      expect(parseLastName('Kennedy I')).toEqual({ lastName: 'Kennedy', suffix: 'I' });
    });

    test('should remove "II" from last name', () => {
      expect(parseLastName('Kennedy II')).toEqual({ lastName: 'Kennedy', suffix: 'II' });
    });

    test('should remove "ii" lowercase', () => {
      expect(parseLastName('Roosevelt ii')).toEqual({ lastName: 'Roosevelt', suffix: 'II' });
    });

    test('should remove "II." with period', () => {
      expect(parseLastName('Harrison II.')).toEqual({ lastName: 'Harrison', suffix: 'II' });
    });

    test('should remove "III" from last name', () => {
      expect(parseLastName('Bush III')).toEqual({ lastName: 'Bush', suffix: 'III' });
    });

    test('should remove "iii" lowercase', () => {
      expect(parseLastName('Gates iii')).toEqual({ lastName: 'Gates', suffix: 'III' });
    });

    test('should remove "III." with period', () => {
      expect(parseLastName('Rockefeller III.')).toEqual({ lastName: 'Rockefeller', suffix: 'III' });
    });

    test('should remove "IV" from last name', () => {
      expect(parseLastName('Windsor IV')).toEqual({ lastName: 'Windsor', suffix: 'IV' });
    });

    test('should remove "iv" lowercase', () => {
      expect(parseLastName('Vanderbilt iv')).toEqual({ lastName: 'Vanderbilt', suffix: 'IV' });
    });

    test('should remove "IV." with period', () => {
      expect(parseLastName('Carnegie IV.')).toEqual({ lastName: 'Carnegie', suffix: 'IV' });
    });
  });

  describe('Jr/Sr in beginning or middle (should NOT be removed)', () => {
    test('should NOT remove "Jr" from beginning of last name', () => {
      expect(parseLastName('Jrsmith')).toEqual({ lastName: 'Jrsmith', suffix: null });
    });

    test('should NOT remove "Jr" from middle of last name', () => {
      expect(parseLastName('McJronald')).toEqual({ lastName: 'McJronald', suffix: null });
    });

    test('should NOT remove "Sr" from beginning of last name', () => {
      expect(parseLastName('Srsmith')).toEqual({ lastName: 'Srsmith', suffix: null });
    });

    test('should NOT remove "Sr" from middle of last name', () => {
      expect(parseLastName('DeSrochers')).toEqual({ lastName: 'DeSrochers', suffix: null });
    });

    test('should NOT remove "II" from middle of last name', () => {
      expect(parseLastName('ONeill')).toEqual({ lastName: 'ONeill', suffix: null });
    });

    test('should handle name with "Junior" in the middle', () => {
      expect(parseLastName('Juniorson')).toEqual({ lastName: 'Juniorson', suffix: null });
    });
  });

  describe('Names without suffixes', () => {
    test('should return name without suffix unchanged', () => {
      expect(parseLastName('Smith')).toEqual({ lastName: 'Smith', suffix: null });
    });

    test('should handle hyphenated names without suffix', () => {
      expect(parseLastName('Smith-Jones')).toEqual({ lastName: 'Smith-Jones', suffix: null });
    });

    test('should handle names with apostrophes', () => {
      expect(parseLastName("O'Brien")).toEqual({ lastName: "O'Brien", suffix: null });
    });

    test('should handle multi-word last names without suffix', () => {
      expect(parseLastName('Van Der Berg')).toEqual({ lastName: 'Van Der Berg', suffix: null });
    });

    test('should handle single letter last name', () => {
      expect(parseLastName('X')).toEqual({ lastName: 'X', suffix: null });
    });
  });

  describe('Edge cases', () => {
    test('should handle empty string', () => {
      expect(parseLastName('')).toEqual({ lastName: '', suffix: null });
    });

    test('should handle whitespace only', () => {
      expect(parseLastName('   ')).toEqual({ lastName: '', suffix: null });
    });

    test('should handle null input', () => {
      expect(parseLastName(null)).toEqual({ lastName: '', suffix: null });
    });

    test('should handle undefined input', () => {
      expect(parseLastName(undefined)).toEqual({ lastName: '', suffix: null });
    });

    test('should handle non-string input (number)', () => {
      expect(parseLastName(123)).toEqual({ lastName: 123, suffix: null });
    });

    test('should handle name with trailing spaces', () => {
      expect(parseLastName('Smith Jr   ')).toEqual({ lastName: 'Smith', suffix: 'Jr' });
    });

    test('should handle name with leading spaces', () => {
      expect(parseLastName('   Smith Jr')).toEqual({ lastName: 'Smith', suffix: 'Jr' });
    });

    test('should handle multiple spaces between name and suffix', () => {
      expect(parseLastName('Smith     Jr')).toEqual({ lastName: 'Smith', suffix: 'Jr' });
    });

    test('should not return suffix if only suffix provided', () => {
      expect(parseLastName('Jr')).toEqual({ lastName: 'Jr', suffix: null });
    });

    test('should not return suffix if only suffix with space provided', () => {
      expect(parseLastName(' Jr ')).toEqual({ lastName: 'Jr', suffix: null });
    });
  });

  describe('Complex real-world examples', () => {
    test('should handle long last names with Jr', () => {
      expect(parseLastName('Schwarzenegger Jr')).toEqual({ lastName: 'Schwarzenegger', suffix: 'Jr' });
    });

    test('should handle hyphenated last names with suffix', () => {
      expect(parseLastName('Smith-Johnson Sr')).toEqual({ lastName: 'Smith-Johnson', suffix: 'Sr' });
    });

    test('should handle last names with apostrophes and suffix', () => {
      expect(parseLastName("O'Connor III")).toEqual({ lastName: "O'Connor", suffix: 'III' });
    });

    test('should handle McNames with suffix', () => {
      expect(parseLastName('McDonald II')).toEqual({ lastName: 'McDonald', suffix: 'II' });
    });

    test('should handle names with multiple capitals and suffix', () => {
      expect(parseLastName('MacArthur IV')).toEqual({ lastName: 'MacArthur', suffix: 'IV' });
    });

    test('should handle "Van" surnames with suffix', () => {
      expect(parseLastName('Van Buren Jr')).toEqual({ lastName: 'Van Buren', suffix: 'Jr' });
    });

    test('should handle "De" surnames with suffix', () => {
      expect(parseLastName('De La Cruz Sr')).toEqual({ lastName: 'De La Cruz', suffix: 'Sr' });
    });
  });
});
