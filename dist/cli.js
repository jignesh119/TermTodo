#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import Main from "./app.js";
import chalk from "chalk";
const validColors = ["red", "blue", "green", "magenta", "cyan", "yellow", "grey"];
const cli = meow({
  importMeta: import.meta,
  help: `
		TermTodo - cli based todolist manager
		${chalk.bold("Usage:")} termtodo [options] [value]
      $ termtodo
      $ termtodo --color <color>
      $ termtodo --help
      $ termtodo --version

		${chalk.bold("Options:")}
      -c --color  \tset color of higlighting
      -h --help   \tShow this screen
      -v --version\tShow version

		${chalk.bold("Examples:")}
      $ termtodo --help
      $ todo --color magenta
	`,
  flags: {
    color: {
      type: "string",
      default: "green",
      choices: ["red", "blue", "green", "magenta", "cyan", "yellow", "grey"],
      shortFlag: "c",
      aliases: ["colors", "Color"],
      isMultiple: false
    },
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
!(cli.flags.help || cli.flags.h || cli.flags.version || cli.flags.v) && render( /*#__PURE__*/React.createElement(Main, {
  prefColor: validColors.includes(cli.flags.color) ? cli.flags.color : "green"
}));