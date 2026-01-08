# parse-lastname

A robust utility for parsing last names and extracting common suffixes (Jr, Sr, II, III, IV).

## Installation

```bash
npm install parse-lastname
```

## Usage

```javascript
const { parseLastName } = require('parse-lastname');

// Basic usage
const result = parseLastName('Smith Jr');
console.log(result);
// Output: { lastName: 'Smith', suffix: 'Jr' }

// Without suffix
const result2 = parseLastName('Johnson');
console.log(result2);
// Output: { lastName: 'Johnson', suffix: null }
```

## API

### `parseLastName(lastName)`

Parses a last name, removes suffix, and returns both the cleaned last name and the suffix.

#### Parameters

- `lastName` (string): The last name to process

#### Returns

An object with two properties:
- `lastName` (string): The last name with suffix removed (or original if no suffix found)
- `suffix` (string|null): The suffix that was removed, normalized to standard format (Jr, Sr, II, III, IV), or null if no suffix was found

## Supported Suffixes

The function recognizes the following suffixes (case-insensitive, with or without periods):

- **Jr** - Junior (also accepts: jr, JR, Jr., junior, Junior, JUNIOR)
- **Sr** - Senior (also accepts: sr, SR, Sr., senior, Senior, SENIOR)
- **II** - The Second (also accepts: ii, II.)
- **III** - The Third (also accepts: iii, III.)
- **IV** - The Fourth (also accepts: iv, IV.)

## Features

- **Case-insensitive**: Handles uppercase, lowercase, and mixed case
- **Flexible formatting**: Works with or without periods
- **Smart matching**: Only removes suffixes at the end of the name
- **Preserves middle content**: Names like "McJronald" or "DeSrochers" remain unchanged
- **Handles spacing**: Properly trims extra spaces
- **Robust edge cases**: Handles empty strings, null, undefined, and non-string inputs

## Examples

```javascript
const parseLastName = require('parse-lastname');

// Jr variations
parseLastName('Smith Jr');
// { lastName: 'Smith', suffix: 'Jr' }

parseLastName('Johnson Jr.');
// { lastName: 'Johnson', suffix: 'Jr' }

parseLastName('Williams JUNIOR');
// { lastName: 'Williams', suffix: 'Jr' }

// Sr variations
parseLastName('Brown Sr');
// { lastName: 'Brown', suffix: 'Sr' }

parseLastName('Davis SR.');
// { lastName: 'Davis', suffix: 'Sr' }

// Roman numerals
parseLastName('Kennedy II');
// { lastName: 'Kennedy', suffix: 'II' }

parseLastName('Bush III');
// { lastName: 'Bush', suffix: 'III' }

parseLastName('Windsor IV');
// { lastName: 'Windsor', suffix: 'IV' }

// Complex names
parseLastName("O'Connor III");
// { lastName: "O'Connor", suffix: 'III' }

parseLastName('Van Buren Jr');
// { lastName: 'Van Buren', suffix: 'Jr' }

parseLastName('Smith-Johnson Sr');
// { lastName: 'Smith-Johnson', suffix: 'Sr' }

// No suffix
parseLastName('Anderson');
// { lastName: 'Anderson', suffix: null }

// Suffix in middle (not removed)
parseLastName('McJronald');
// { lastName: 'McJronald', suffix: null }

// Edge cases
parseLastName('Smith  Jr  ');
// { lastName: 'Smith', suffix: 'Jr' }

parseLastName('');
// { lastName: '', suffix: null }
```

## Testing

The package includes 56 comprehensive test cases covering:
- All suffix variations (Jr, Sr, II, III, IV)
- Case sensitivity (uppercase, lowercase, mixed)
- Period handling (with and without)
- Spacing variations
- Edge cases (empty, null, undefined, non-string)
- Position testing (beginning, middle, end)
- Complex real-world names (hyphenated, apostrophes, multi-word)

Run tests:
```bash
npm test
```

## License

ISC
