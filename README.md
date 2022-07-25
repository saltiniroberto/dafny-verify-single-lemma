# Dafny CLI

This extension provides commands and related editor context-menu items to execute Dafny command-line executable in the terminal window.

## Commands and Editor Context-Menu Items

|Command and Context Menu Item| Description|Key Binding|
|:----------------------|:-----------|:---|
|`Dafny CLI: Verify Current Symbol`| Execute the Dafny verifier in the terminal with the parameter `/proc` set to the innermost function/method/lemma/constructor symbol enclosing the current cursor position. If no symbol is detected, then `/proc` is set to the word where the cursor is positioned. |`Ctrl + Shift + v`|
|`Dafny CLI: Verify Current Symbol with Trace`| As `Dafny CLI: Verify Current Symbol`, except that the `/trace` option is added when running the Dafny command-line executable|`Ctrl + Shift + t`|
|`Dafny CLI: Verify File`|Execute the Dafny verifier in the terminal window on the current file| `Ctrl + Shift + Alt + v`|
|`Dafny CLI: Verify File With Trace`|As `Dafny CLI: Verify File`, except that the `/trace` option is added when running the Dafny| `Ctrl + Shift + Alt + t`|
|`Dafny CLI: Repeat Last`| Runs the Dafny command-lin executable with the same options used during the last execution|`Ctrl + Shift + r`|

## Extension Settings

|Setting| Description|
|:----------------------|:-----------|
|`dafny-cli.dafny-path`|Path to the folder containing the Dafny executable|
|`dafny-cli.extra-options`| Command line options to use when running the Dafny executable|
|`dafny-cli.dafny.commandPrefix`|Prefix to the command to execute to run Dafny (useful for the environment where the Dafny executable is provided as parameter to mono)|
|`dafny-cli.dafny.commandPostfix`|Postfix to the command executed to run Dafny|

## Known Issues

- The plugin only works with workspaces created through the `File -> Open Folder ...` command.
- If either the `Dafny CLI: Verify Under Cursor` or the `Dafny CLI: Verify Under Cursor with Trace` command is executed on a constructor method, then all the constructor methods in the current file will be verified, not only the one under the cursor.

## Release Notes

### 0.4.2

- Added dependency on the extension `dafny-lang.ide-vscode` to the manifest file.

### 0.4.1

- Now, when `Verify Current Symbol` checks for the current symbols, it filters out anything that is not a function, method, lemma or constructor. This is needed to allow falling back on using the word at the cursor position when executing `Verify Current Symbol` on refined entities as the Dafny symbol provider does not list refined entities, but only their parent entity.  This improvement also helps prevent running erroneous verification commands.

### 0.4.0

- `Verify Under Cursor` command changed to `Verify Current Symbol`. Now the innermost symbol enclosing the current cursor position is preferred over the word where the cursor is positioned when setting the value for the Dafny CLI `/proc` parameter.

### 0.3.4

- Add option to specify postfix to add to command execution.

### 0.3.3

- Update Known Issues doc.

### 0.3.2

- Fix handling of identifier names including underscores
- Fix handling of constructor methods

### 0.3.1

- Publish to VSCode Marketplace

### 0.3.0

- Modify settings to allow specifying the command to use to run Dafny rather than the path to Dafny.exe

### 0.2.2

- Fix: Prefix "mono" to the Dafny executable

### 0.2.1

- Fix: Reopen the terminal in the case that it had been manually killed.

### 0.2.0

- Add commands for verifying the current file
- Rename the extension from `dafny-single-lemma-verification` to `dafny-cli` given that the scope of the extension has been broadened with this version

### 0.1.0

Initial release.

-----------------------------------------------------------------------------------------------------------
