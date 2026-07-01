const normalizeComponentName = (name) => {
  let cleaned = name.toLowerCase();

  // Remove anything inside parentheses
  cleaned = cleaned.replace(/\(.*?\)/g, "");

  // Remove common words
  const wordsToRemove = [
    "module",
    "sensor",
    "board",
    "display",
    "active",
    "passive",
    "compatible",
    "original",
    "kit",
    "and",
    "or",
  ];

  wordsToRemove.forEach((word) => {
    cleaned = cleaned.replace(
      new RegExp(`\\b${word}\\b`, "g"),
      ""
    );
  });

  // Remove extra spaces
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  return cleaned;
};

module.exports = normalizeComponentName;