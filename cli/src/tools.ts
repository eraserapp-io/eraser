import * as fs from "fs-extra";

export const capitalize = (str: string): string => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export enum LineLocation {
  BEFORE = 0,
  AFTER,
}

export const insertLine = (
  line: string,
  fileName: string,
  location: LineLocation,
  referenceLine: string,
  appendData?: string,
  isRoutes?: boolean,
  name?: string
) => {
  const text = fs.readFileSync(fileName, "utf-8");
  let array = text.split("\n").map((item) => item.trim());

  if (array.includes(referenceLine.trim())) {
    let index = array.indexOf(referenceLine.trim());
    array.splice(index + location, 0, line);
  }

  if (isRoutes) {
    array = array.map((lineToSearch) => {
      let viewsIndex = lineToSearch.indexOf("} from '@views';");
      if (viewsIndex >= 0) {
        let lineToAdd: string | undefined;
        let l1 = lineToSearch.substring(0, viewsIndex);
        let l2 = lineToSearch.substring(viewsIndex);

        //line will look like: } from '@views';
        lineToAdd = l1 + `, ${capitalize(name ?? "")}` + l2;
        return lineToAdd;
      } else {
        return lineToSearch;
      }
    });
  }

  const file = fs.createWriteStream(fileName);
  file.on("error", function (err) {
    /* error handling */
  });
  array.forEach(function (v) {
    file.write(v + "\n");
  });
  file.write(appendData ?? "");

  file.end();
};
