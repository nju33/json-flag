#!/usr/bin/env node
import Case = require('case');
import * as chalk from 'chalk';
import * as fs from 'fs';
import * as JSON5 from 'json5';
import * as path from 'path';
import {promisify} from 'util';
import * as yargs from 'yargs';

const readFile = (filepath: string): Promise<never | string> => {
  return promisify(fs.readFile)(filepath, 'utf-8');
};

runProcess();

async function runProcess(): Promise<never | void> {
  const argv = yargs
    .option('case', {
      alias: 'c',
      default: 'kebab',
      description:
        'Specify a string case #ref » https://github.com/nbubna/Case#code-helpers',
      type: 'string',
    })
    .option('hyphen-length', {
      alias: 'h',
      default: 2,
      description: 'Number of hyphen to be added before flag',
      type: 'number',
    })
    .usage('$ json-flag [options] <jsonfilepath>\nConvert json to cli\'s flag')
    .help().argv;

  if (argv._.length === 0) {
    // tslint:disable-next-line no-console
    console.error(chalk.red('Pass a file path as an argument'));
    process.exit(1);
  }

  const [filepath] = argv._;
  const {
    case: stringCase,
    hyphenLength,
  }: {case: string; hyphenLength: number} = argv as any;
  const hyphen = Array<string>(hyphenLength)
    .fill('-')
    .join('');
  const transform = (Case as any)[stringCase].bind(Case);
  const content = await readFile(path.resolve(filepath));
  const data = JSON5.parse(content);

  const formatted: string = Object.entries(
    data,
  ).reduce((acc, [flag, value]) => {
    if (Array.isArray(value)) {
      acc += `${hyphen}${transform(flag)} ${value.join(',')}`;
    } else {
      acc += `${hyphen}${transform(flag)} ${value}`;
    }
    acc += ' ';
    return acc;
  }, '');

  process.stdout.write(formatted);
}
