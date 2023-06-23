import { CliUx, Command, Flags } from "@oclif/core";
import * as fs from "fs-extra";
import { Component } from "../../../component.templates";
import { exec } from "child_process";
const chalk = require("chalk");
const info = chalk.blue;
const lists = chalk.green.bold;

export default class GenerateToolHelper extends Command {
  static description = "describe the command here";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<void> {
    let name: string = await CliUx.ux.prompt(
      chalk.yellow("Enter the name of the helper function")
    );

    let desc: string = (
      await CliUx.ux.prompt(chalk.yellow("Enter the description of function"))
    ).toLowerCase();

    let props: string = (
      await CliUx.ux.prompt(
        chalk.yellow(
          "Enter the props of function (comma seperated i.e prop1,prop2,prop3)"
        )
      )
    ).toLowerCase();

    /**
     * Files to create or modify...
     * /tools/helpers/{NAME}.helpers.ts
     */

    /**
     * Files to modify...
     * /components/{TYPE}/index.tsx
     */

    this.log(info("Current Directory: " + process.cwd()));
    // this.log(
    //   lists(
    //     "The following list of files will be created:\n",
    //     `- src/components/${type}/${name}/${name.toLowerCase()}.tsx\n`
    //   )
    // );
    //
    // this.log(
    //   lists(
    //     "The following list of files will be modified:\n",
    //     `- src/components/${type}/index.ts\n`
    //   )
    // );

    const pathToHelper = `${process.cwd()}/src/tools/helpers/${name.toLowerCase()}.helpers.ts`;

    if (fs.existsSync(pathToHelper)) {
      fs.appendFile(
        pathToHelper,
        Component.ComponentExportTemplate(name),
        (err) => undefined
      );
    } else {
      fs.outputFile(
        pathToHelper,
        Component.ComponentTemplate(name),
        { flag: "w+" },
        (err) => {}
      );
    }

    CliUx.ux.action.start("Waiting for format");
    exec(`prettier --write ${process.cwd()}/src/*`);
    exec(`prettier --write ${process.cwd()}/__types__/*`);
    CliUx.ux.action.stop("Generated...");
  }
}
