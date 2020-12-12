# dafny-extra-commands

This extension provides commands and related editor context-menu items to run the Dafny command-line executable in the terminal to verify the function/lemma under the cursor.

## Features

The extension adds the "Dafny: Verify Under Cursor" and  "Dafny: Verify Under Cursor with Trace" items to the context-menu of the editor.

The "Dafny: Verify Under Cursor" context-menu item executes the Dafny verifier in the terminal with the parameter `/proc` set to `:*.{identifier_under_the_cursor}`.

The "Dafny: Verify Under Cursor with Trace" context-menu item executes the Dafny verifier as above with the addition of the `/trace` option.


## Extension Settings


This extension contributes the following settings:

* `dafny-extra-commands.dafny-path`: Path to the folder containing the Dafny executable
* `dafny-extra-commands.extra-options`: Command line option to add when running the Dafny executable


## Release Notes

### 1.0.0

Initial release.

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------

