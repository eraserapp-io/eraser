import { CliUx, Command, Flags } from "@oclif/core";
import * as fs from "fs-extra";
import { Component } from "../../component.templates";
import { exec } from "child_process";
const chalk = require("chalk");
const info = chalk.blue;
const lists = chalk.green.bold;

export default class GenerateComponent extends Command {
  static description = "describe the command here";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<void> {
    let name: string = await CliUx.ux.prompt(
      chalk.yellow("Enter the name of the component")
    );

    let type: string = (
      await CliUx.ux.prompt(
        chalk.yellow(
          "Enter the type of component (atoms, molecules, organisms)"
        )
      )
    ).toLowerCase();

    while (type !== "atoms" && type !== "molecules" && type !== "organisms") {
      type = (
        await CliUx.ux.prompt(
          chalk.yellowBright(
            "Enter the type of component (atoms, molecules, organisms)"
          )
        )
      ).toLowerCase();
    }

    /**
     * Files to create...
     * /components/{TYPE}/{NAME}.tsx
     */

    /**
     * Files to modify...
     * /components/{TYPE}/index.tsx
     */

    this.log(info("Current Directory: " + process.cwd()));
    this.log(
      lists(
        "The following list of files will be created:\n",
        `- src/components/${type}/${name}/${name.toLowerCase()}.tsx\n`
      )
    );

    this.log(
      lists(
        "The following list of files will be modified:\n",
        `- src/components/${type}/index.ts\n`
      )
    );

    const pathToView = `${process.cwd()}/src/components/${type}/${name.toLowerCase()}.tsx`;

    fs.outputFile(
      pathToView,
      Component.ComponentTemplate(name),
      { flag: "w+" },
      (err) => {}
    );

    fs.appendFile(
      `${process.cwd()}/src/components/${type}/index.ts`,
      Component.ComponentExportTemplate(name),
      (err) => undefined
    );

    CliUx.ux.action.start("Waiting for format");
    exec(`prettier --write ${process.cwd()}/src/*`);
    exec(`prettier --write ${process.cwd()}/__types__/*`);
    CliUx.ux.action.stop("Generated...");
  }
}
