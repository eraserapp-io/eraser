import { capitalize } from "./tools";

export const Component = {
  ComponentTemplate: (name: string) =>
    `
import React, {FunctionComponent} from "react";
import {View} from "react-native";
import {useTheme, useDimensions} from "@state"

type ${capitalize(name)}Props = {}

export const ${capitalize(name)}:FunctionComponent<${capitalize(
      name
    )}Props> = ({}: ${capitalize(name)}Props) => {
const {theme} = useTheme();
const {width, height} = useDimensions();
    return <View></View>
}
`,
  ComponentExportTemplate: (name: string) =>
    `\nexport * from './${capitalize(name)}'`,
};
