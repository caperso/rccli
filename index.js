#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var uuid_1 = require("uuid");
var fileGenerator_1 = require("./src/fileGenerator");
var program = require("commander").program;
var chalk = require("chalk");
var fs = require("fs");
var path = require("path");
program
    .command("g")
    .description("Generate a react component template")
    .option("-c, --component-name <componentName>", "Name of your new component")
    .option("-m, --with-mobx", "Flag true will create a mobx wrapped component")
    .option("-t, --with-ts ", "Create tsx file instead of jsx")
    .option("-s, --style-file-type <styleFileType>", "Like scss / less / css, default using scss")
    .option("-u, --unique-class ", "Unique style wrapper class name")
    .action(function (cmd) {
    var componentName = cmd.componentName, styleFileType = cmd.styleFileType;
    if (!componentName) {
        console.log(chalk.red("Please enter the name component"));
        process.exit(1);
    }
    if (!styleFileType) {
        cmd.styleFileType = "scss";
        console.log(chalk.green("No style file extension provided, using default scss file"));
    }
    var targetPath = path.resolve(process.cwd(), componentName);
    try {
        fs.accessSync(targetPath);
        // exit when path exists
        console.log(chalk.red("Failed: path " + targetPath + " already exists"));
        process.exit(1);
    }
    catch (e) {
        createComponent(targetPath, cmd);
    }
});
/**
 * create component
 * @param {*} componentName
 * @param {*} styleType
 * @param {boolean} isMobx
 */
function createComponent(targetPath, _a) {
    var withMobx = _a.withMobx, withTs = _a.withTs, componentName = _a.componentName, styleFileType = _a.styleFileType, uniqueClass = _a.uniqueClass;
    var uid = uniqueClass ? uuid_1.v4().slice(0, 5) : undefined;
    //  generate file contents
    var indexFileContent = fileGenerator_1.generateIndexFile(componentName);
    var styleFileContent = fileGenerator_1.generateStyleFile(componentName, uid);
    var componentContent = withMobx
        ? fileGenerator_1.generateMobxComponent(componentName, styleFileType, uid)
        : fileGenerator_1.generateComponent(componentName, styleFileType, uid);
    fs.mkdirSync(targetPath);
    fs.writeFileSync(path.resolve(targetPath, "index." + (withTs ? "t" : "j") + "s"), indexFileContent);
    fs.writeFileSync(path.resolve(targetPath, componentName + "." + styleFileType), styleFileContent);
    fs.writeFileSync(path.resolve(targetPath, componentName + "." + (withTs ? "t" : "j") + "sx"), componentContent);
    console.log(chalk.green("Success: Component was generated!"));
    process.exit(0);
}
program.parse(process.argv);
