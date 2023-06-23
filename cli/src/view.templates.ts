import { capitalize } from "./tools";

export const View = {
  ViewTemplate: (name: string) =>
    `
import React, {FunctionComponent} from "react";
import {View} from "react-native";
import {useTheme, useDimensions} from "@state"
import {${capitalize(name)}Props} from "@types"

export const ${capitalize(name)}:FunctionComponent<${capitalize(
      name
    )}Props> = ({}: ${capitalize(name)}Props) => {
const {theme} = useTheme();
const {width, height} = useDimensions();
    return <View></View>
}
`,

  ViewExportTemplate: (name: string) =>
    `\nexport * from './${capitalize(name)}'`,

  TypesExportTemplate: (name: string) =>
    `\nexport type ${capitalize(name)}Props = {};`,

  ViewTypeExportTemplate: (name: string) => `\nexport * from './${name}'`,

  TypesTypeExportTemplate: (name: string) =>
    `\nexport * from './${name}.types'`,

  RoutesNavigatorScreen: (name: string, type: string) =>
    `<${capitalize(type)}Stack.Screen name={'${capitalize(
      name
    )}'} component={${capitalize(name)}} />`,

  RoutesReferenceLine: (type: string) =>
    `</${capitalize(type)}Stack.Navigator>`,

  RouteTypesImport: (name: string) =>
    `${capitalize(name)}: ${capitalize(name)}ScreenProps`,

  RouteTypesAppendData: (name: string, type: string) => `/**
* ${capitalize(name)} screen
*/

export type ${capitalize(name)}ScreenType = NativeStackNavigationProp<
  ${capitalize(type)}StackParamList,
  '${capitalize(name)}'
>;

export type ${capitalize(name)}RouteType = RouteProp<${capitalize(
    type
  )}StackParamList, '${capitalize(name)}'>;

export type ${capitalize(name)}ScreenProps = undefined;
`,
};
