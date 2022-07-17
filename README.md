# Dafny CLI

This extension provides commands and related editor context-menu items to execute Dafny command-line executable in the terminal window.

## Commands and Editor Context-Menu Items

|Command and Context Menu Item| Description|Key Binding|
|:----------------------|:-----------|:---|
|`Dafny CLI: Verify Under Cursor`| Execute the Dafny verifier in the terminal with the parameter `/proc` set to `:*.<word_under_the_cursor}>`|`Ctrl + Shift + v`|
|`Dafny CLI: Verify Under Cursor with Trace`| As `Dafny CLI: Verify Under Cursor`, except that the `/trace` option is added when running the Dafny command-line executable|`Ctrl + Shift + t`|
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

## Possible Improvements

- Rather than executing the Dafny command-line executable on the word under the cursor, execute it on the function/method/lemma that the cursor is in the scope of.

## Release Notes

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
