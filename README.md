# create-component README

## Features

Creates a React Styled component in the selected folder.

## Build and install

- Make sure to install the "Visual Studio Code Extensions" CLI package
  `npm install -g vsce`

- Compile the exension
  `yarn run compile`

- Package the extension
  `vsce package`

- Install the VSIX (In VSCode)
  `"Install from VSIX"`

## Usage

- Right click a folder in the Explorer panel
- Select `Create Component`
- Input the name of you component (lower case with spaces it will be converted to PascalCase)

The extension will create a folder with 2 component files, the component Typescript file and a styled component file.

- `MyComponent.tsx`
- `MyComponent.styles.tsx`
