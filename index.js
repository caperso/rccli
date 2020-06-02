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
  const targetPath = path.join(__dirname, componentName);
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

// new command
program
  // 定义 new 命令，且后面跟一个必选的 projectName 参数
  .command("new <projectName>")
  // 对 new 命令的描述
  .description("use create-react-app create a app")
  // 定义使用 new 命令之后可以使用的选项 -n（使用 npm 来安装依赖）
  // 在使用 create-react-app 中，我们可以可以添加 --use-npm 选项，来使用 npm 安装依赖（默认使用 yarn 安装依赖）
  // 所以，我将这个选项添加到了 rcli 中
  .option("-n, --use-npm", "Whether to use npm to download dependencies")
  // 定义执行 new 命令后调用的回调函数
  // 第一个参数便是在定义 new 命令时的必选参数 projectName
  // cmd 中包含了命令中选项的值，当我们在 new 命令中使用了 --use-npm 选项时，cmd 中的 useNpm 属性就会为 true，否则为 undefined
  .action(function (projectName, cmd) {
    const isUseNpm = cmd.useNpm ? true : false;
    // 创建 react app
    createReactApp(projectName, isUseNpm);
  });

program.parse(process.argv);
