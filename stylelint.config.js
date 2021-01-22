module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "at-rule-no-unknown": [true, { ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen"] }],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "rule-empty-line-before": ['never'],
    "at-rule-empty-line-before": null,
  },
};