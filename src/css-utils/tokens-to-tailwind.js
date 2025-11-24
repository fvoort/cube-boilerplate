const slugify = require('slugify');

/**
 * Converts human readable tokens into tailwind config friendly ones
 * Supports infinitely nested token structures
 *
 * @param {array} tokens {name: string, value: any, items?: array}
 * @param {string} prefix - Internal parameter for recursion
 * @return {object} {key, value}
 */
const tokensToTailwind = (tokens, prefix = '') => {
  const nameSlug = text => slugify(text, {lower: true});
  let response = {};

  tokens.forEach(({name, value, items}) => {
    // Build the key, adding prefix if we're in a nested structure
    const key = prefix ? `${prefix}-${nameSlug(name)}` : nameSlug(name);

    // If this token has nested items, recurse into them
    if (items && Array.isArray(items)) {
      // Recursively process nested items with the current key as prefix
      Object.assign(response, tokensToTailwind(items, key));
    }
    // Otherwise, it's a leaf node with a value
    else if (value !== undefined) {
      response[key] = value;
    }
  });

  return response;
};

module.exports = tokensToTailwind;
