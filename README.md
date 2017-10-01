# json-flag

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm version](https://badge.fury.io/js/json-flag.svg)](https://badge.fury.io/js/json-flag)


## Install

```bash
npm i -g json-flag
# No need to use `npx`
```

## Usage

Prepare `.json` (strictly json5). For example, create it as `example.json`,

```json
{
  "string": "foo",
  "number": 1,
  "array-string": [
    "foo",
    "bar",
    "baz"
  ],
	"object": {
		"foo": "bar"
	}
}

```

Pass this `.json` to the command. Then,

```bash
json-flag ./example.json
# --string foo --number 1 --array-string foo,bar,baz
```

## Help

```bash
json-flag --help
```
