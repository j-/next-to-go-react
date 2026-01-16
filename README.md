Next to go (React)
==================

- Bootstrapped with `bun init`
- VS Code workspace extensions (recommended):
  - [ESLint][ext-eslint] (`dbaeumer.vscode-eslint`) -
    Linting and formatting on save.
  - [EditorConfig][ext-editorconfig] (`editorconfig.editorconfig`) -
    Consistent line endings and whitespace.
  - [Bun][ext-bun] (`oven.bun-vscode`) -
    Test runner and debugger.

[ext-eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[ext-editorconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[ext-bun]: https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode

Development
-----------

```sh
# Start development server. HMR and mocks enabled.
bun dev

# Start production server. HMR and mocks disabled.
bun start
```
