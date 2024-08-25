#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import Main from "./app.js";
import chalk from "chalk";
const cli = meow({
  importMeta: import.meta,
  help: `
		TermTodo - cli todos manager
		${chalk.bold("Usage:")} termtodo [options] [value]
      $ termtodo
      $ termtodo --help
      $ termtodo --version

		${chalk.bold("Options:")}
      -h --help   \tShow this screen
      -v --version\tShow version

		${chalk.bold("Examples:")}
      $ termtodo --help
	`,
  flags: {
    help: {
      type: "boolean",
      default: false,
      shortFlag: "h"
    },
    version: {
      type: "boolean",
      default: false,
      shortFlag: "v"
    }
  },
  description: false
});
!(cli.flags.help || cli.flags.h || cli.flags.version || cli.flags.v) && render( /*#__PURE__*/React.createElement(Main, null));