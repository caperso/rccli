#!/usr/bin/env node

"use strict";

import { v4 as uuid } from "uuid";
import {
  generateComponent,
  generateIndexFile,
  generateMobxComponent,
  generateStyleFile
} from "./fileGenerator";

const { program } = require("commander");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

interface CMD {
  componentName: string;
  withMobx: boolean;
  withTs: boolean;
  styleFileType: string;
  uniqueClass: boolean;
}

program
  .command("g")
  .description("Generate a react component template")
  .option("-c, --component-name <componentName>", "Name of your new component")
  .option("-m, --with-mobx", "Flag true this a mobx component")
  .option("-t, --with-ts ", "Creat tsx file instead of jsx")
  .option(
    "-s, --style-file-type <styleFileType>",
    "Like scss / less / css, default using scss"
  )
  .option("-u, --unique-class ", "Unique style wrapper class name")

  .action(function (cmd: CMD) {
    const { componentName, styleFileType } = cmd;

    if (!componentName) {
      console.log(chalk.red("Please enter the name component"));
      process.exit(1);
    }
    if (!styleFileType) {
      cmd.styleFileType = "scss";
      console.log(
        chalk.green("No style file extension provided, using default scss file")
      );
    }

    const targetPath = path.resolve(process.cwd(), componentName);
    try {
      fs.accessSync(targetPath);
      // exit when path exists
      console.log(chalk.red(`Failed: path ${targetPath} already exists`));
      process.exit(1);
    } catch (e) {
      createComponent(targetPath, cmd);
    }
  });

/**
 * create component
 * @param {*} componentName
 * @param {*} styleType
 * @param {boolean} isMobx
 */
function createComponent(
  targetPath: string,
  { withMobx, withTs, componentName, styleFileType, uniqueClass }: CMD
) {
  const uid = uniqueClass ? uuid().slice(0, 5) : undefined;
  //  generate file contents
  const indexFileContent = generateIndexFile(componentName);
  const styleFileContent = generateStyleFile(componentName, uid);
  const componentContent = withMobx
    ? generateMobxComponent(componentName, styleFileType, uid)
    : generateComponent(componentName, styleFileType, uid);

  fs.mkdirSync(targetPath);
  fs.writeFileSync(
    path.resolve(targetPath, `index.${withTs ? "t" : "j"}s`),
    indexFileContent
  );
  fs.writeFileSync(
    path.resolve(targetPath, `${componentName}.${styleFileType}`),
    styleFileContent
  );
  fs.writeFileSync(
    path.resolve(targetPath, `${componentName}.${withTs ? "t" : "j"}sx`),
    componentContent
  );
  console.log(chalk.green(`Success: Component was generated!`));
  process.exit(0);
}

program.parse(process.argv);
