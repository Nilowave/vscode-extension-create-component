// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
const fs = require("fs");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "create-component" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "create-component.createComp",
    (event) => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInputBox().then((value) => {
        if (!value) {
          return;
        }

        const path = event.fsPath;
        const componentName = value
          .replace(/(\w)(\w*)/g, (g0, g1, g2) => {
            return g1.toUpperCase() + g2.toLowerCase();
          })
          .replace(/\s+/g, "");
        const folderPath = `${path}/${componentName}`;
        const componentPath = `${folderPath}/${componentName}.tsx`;
        const stylesPath = `${folderPath}/${componentName}.styles.tsx`;

        console.log("create component here", folderPath);

        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
          fs.writeFileSync(componentPath, componentTemplate(componentName));
          fs.writeFileSync(stylesPath, stylesTemplate(componentName));

          vscode.window.showInformationMessage(
            `New component [ ${componentName} ] created!`
          );
        } else {
          vscode.window.showErrorMessage(
            `The component [ ${componentName} ] already exists!`
          );
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

const stylesTemplate = (name: string): string => {
  return `import styled from 'styled-components';

export const Styled${name} = styled.div\`\`;
`;
};

const componentTemplate = (name: string): string => {
  return `import { ReactElement } from 'react';
import * as S from './${name}.styles';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ${name}Props {}

// eslint-disable-next-line no-empty-pattern
export const ${name} = ({}: ${name}Props): ReactElement => {
  return (
    <S.Styled${name}>
      <div>{/* logic */}</div>
    </S.Styled${name}>
  );
};
`;
};

// this method is called when your extension is deactivated
export function deactivate() {}
