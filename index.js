#!/usr/bin/env node

"use strict";

const { program } = require("commander");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

//TODO
// .option(
//     "-s, --styleFileType",
//     "like scss / less / css, default using scss"
//   )
// .option("-T, --type ", "creat tsx file instead jsx")
// .option("-US, --unique-style ", "unique style wrapper class name")
// const componentTSX = generateTSX();

program
  .command("g")
  .description("generate a react component template")
  .option("-c, --component-name <componentName>", "name of your new component")
  .action(function (cmd) {
    if (!cmd.componentName) {
      console.log(chalk.red("please enter the name component"));
      process.exit(1);
    }

    createComponent(cmd.componentName, cmd.styleFileType);
  });

function createComponent(componentName, styleType) {
  const targetPath = path.resolve(process.cwd(), componentName);
  // path check
  try {
    fs.accessSync(targetPath);
    // exit when path exists
    console.log(chalk.red(`Fail: path ${targetPath} already exists`));
    process.exit(1);
  } catch {
    //  generate files
    const indexJS = generateIndexJS(componentName);
    const styleFile = generateStyleFile(styleType);
    const componentJSX = generateJSX(componentName);

    fs.mkdirSync(targetPath);
    fs.writeFileSync(path.resolve(targetPath, `index.js`), indexJS);
    fs.writeFileSync(
      path.resolve(targetPath, `${componentName}.scss`),
      styleFile
    );
    fs.writeFileSync(
      path.resolve(targetPath, `${componentName}.jsx`),
      componentJSX
    );
    console.log(chalk.green(`Success: Component was generated!`));
    process.exit(0);
  }
}

function generateIndexJS(componentName, isTS) {
  return `export {${componentName} as default} from './${componentName}.jsx'`;
}

function generateStyleFile(isUnique) {
  return ``;
}

function generateJSX(componentName) {
  const content = `import React from "react";
import "./${componentName}.scss";

export const Route = () => {
    return <div>
  
    </div>;
};
    `;
  return content;
}
