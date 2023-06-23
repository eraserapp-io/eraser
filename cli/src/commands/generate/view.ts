import { Command, CliUx } from "@oclif/core";
import * as fs from "fs-extra";
import { capitalize, insertLine, LineLocation } from "../../tools";
import { View } from "../../view.templates";
const { exec } = require("child_process");

const chalk = require("chalk");
const info = chalk.blue;
const lists = chalk.green.bold;

export default class GenerateView extends Command {
  static description = "generate a given view with correct tests";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {};

  public async run(): Promise<void> {
    let name: string = await CliUx.ux.prompt(
      chalk.yellow("Enter the name of the view")
    );
    let type: string = (
      await CliUx.ux.prompt(chalk.yellow("Enter the type of view (auth, app)"))
    ).toLowerCase();

    while (type !== "app" && type !== "auth") {
      type = (
        await CliUx.ux.prompt(
          chalk.yellowBright("Enter the type of view (auth, app): ")
        )
      ).toLowerCase();
    }

    /**
     * Files to create...
     * /views/{TYPE}/{NAME}/index.tsx
     * /views/{TYPE}/{NAME}/{Name}.tsx
     * __types__/views/{TYPE}/{name}.types.ts
     */

    /**
     * Files to modify...
     * /views/{TYPE}/index.tsx
     * /routes/{TYPE}/index.tsx
     * __types__/views/{TYPE}/index.tsx
     */

    this.log(info("Current Directory: " + process.cwd()));
    this.log(
      lists(
        "The following list of files will be created:\n",
        `- src/views/${type}/${name}/${capitalize(name)}/index.ts\n`,
        `- src/views/${type}/${name}/${capitalize(name)}.tsx\n`,
        `- __types__/views/${type}/${name}.types.ts\n`
      )
    );

    this.log(
      lists(
        "The following list of files will be modified:\n",
        `- src/views/${type}/index.ts\n`,
        `- src/routes/${type}/index.tsx\n`,
        `- __types__/views/${type}/index.ts\n`,
        `- __types__/routes/${type}.types.ts\n`
      )
    );

    const pathToView = `${process.cwd()}/src/views/${type}/${name}/${capitalize(
      name
    )}.tsx`;

    fs.outputFile(
      pathToView,
      View.ViewTemplate(name),
      { flag: "w+" },
      (err) => {}
    );
    fs.outputFile(
      `${process.cwd()}/src/views/${type}/${name}/index.ts`,
      View.ViewExportTemplate(name),
      { flag: "w+" },
      (err) => {}
    );
    fs.outputFile(
      `${process.cwd()}/__types__/views/${type}/${name}.types.ts`,
      View.TypesExportTemplate(name),
      (err) => undefined
    );

    fs.appendFile(
      `${process.cwd()}/src/views/${type}/index.ts`,
      View.ViewTypeExportTemplate(name),
      (err) => undefined
    );
    fs.appendFile(
      `${process.cwd()}/__types__/views/${type}/index.ts`,
      View.TypesTypeExportTemplate(name),
      (err) => undefined
    );

    insertLine(
      View.RoutesNavigatorScreen(name, type),
      `${process.cwd()}/src/routes/${type}/index.tsx`,
      LineLocation.BEFORE,
      View.RoutesReferenceLine(type),
      undefined,
      true,
      name
    );
    insertLine(
      View.RouteTypesImport(name),
      `${process.cwd()}/__types__/routes/${type}.types.ts`,
      LineLocation.AFTER,
      `export type ${capitalize(type)}StackParamList = {`,
      View.RouteTypesAppendData(name, type)
    );

    CliUx.ux.action.start("Waiting for format");
    exec(`prettier --write ${process.cwd()}/src/*`);
    exec(`prettier --write ${process.cwd()}/__types__/*`);
    CliUx.ux.action.stop("Generated...");
  }
}
