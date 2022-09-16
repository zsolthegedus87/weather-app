module.exports = {
	plugins: ["stylelint-order"],
	rules: {
		"at-rule-empty-line-before": [
			"always",
			{
				except: [
					"blockless-after-blockless",
					"first-nested",
					"blockless-after-same-name-blockless",
				],
				ignore: ["after-comment"],
				ignoreAtRules: ["font-face", "keyframes"],
			},
		],
		"at-rule-disallowed-list": ["extend"],
		"at-rule-no-vendor-prefix": true,
		"block-closing-brace-newline-after": "always",
		"block-closing-brace-newline-before": "always",
		"block-no-empty": true,
		"block-opening-brace-newline-after": "always-multi-line",
		"block-opening-brace-newline-before": "always-single-line",
		"block-opening-brace-space-before": "always",
		"color-hex-case": "lower",
		"color-hex-length": "short",
		"declaration-bang-space-after": "never",
		"declaration-bang-space-before": "always",
		"declaration-block-no-duplicate-properties": true,
		"declaration-block-no-shorthand-property-overrides": true,
		"declaration-block-semicolon-newline-after": "always",
		"declaration-block-semicolon-newline-before": "never-multi-line",
		"declaration-block-semicolon-space-after": "always-single-line",
		"declaration-block-semicolon-space-before": "never",
		"declaration-block-single-line-max-declarations": 1,
		"declaration-block-trailing-semicolon": "always",
		"declaration-colon-space-after": "always",
		"declaration-colon-space-before": "never",
		"declaration-no-important": true,
		"font-family-name-quotes": "always-unless-keyword",
		"indentation": "tab",
		"length-zero-no-unit": true,
		"max-empty-lines": 2,
		"max-nesting-depth": 2,
		"media-feature-colon-space-after": "always",
		"media-feature-colon-space-before": "never",
		"media-feature-name-no-vendor-prefix": true,
		"media-feature-range-operator-space-after": "always",
		"media-feature-range-operator-space-before": "always",
		"no-duplicate-selectors": true,
		"no-eol-whitespace": true,
		"no-extra-semicolons": true,
		"no-invalid-double-slash-comments": true,
		"no-missing-end-of-source-newline": true,
		"number-leading-zero": "never",
		"number-max-precision": 6,
		"number-no-trailing-zeros": true,
		"order/properties-alphabetical-order": true,
		"property-no-vendor-prefix": true,
		"selector-combinator-space-after": "always",
		"selector-combinator-space-before": "always",
		"selector-list-comma-newline-after": "always",
		"selector-list-comma-newline-before": "never-multi-line",
		"selector-no-vendor-prefix": true,
		"selector-pseudo-class-case": "lower",
		"selector-pseudo-element-case": "lower",
		"selector-pseudo-element-colon-notation": "double",
		"unit-case": "lower",
		"unit-allowed-list": [
			"px",
			"em",
			"rem",
			"fr",
			"%",
			"pt",
			"vh",
			"vw",
			"vmin",
			"vmax",
			"deg",
			"s",
			"ms",
		],
	}
};
