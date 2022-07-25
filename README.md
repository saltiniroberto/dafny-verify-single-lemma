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
