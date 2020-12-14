# dafny-single-lemma-verification

This extension provides commands and related editor context-menu items to run the Dafny command-line executable in the terminal to verify the word under the cursor.

## Commands and Editor Context-Menu Items

|Command and Context Menu Item| Description|Key Binding|
|:----------------------|:-----------|:---|
|`Dafny SLV: Verify Under Cursor`| Executes the Dafny verifier in the terminal with the parameter `/proc` set to `:*.<word_under_the_cursor}>`|`Ctrl + Shift + v`|
|`Dafny SLV: Verify Under Cursor with Trace`| As `Dafny SLV: Verify Under Cursor`, except that the `/trace` option is added when running the Dafny command-line executable|`Ctrl + Shift + t`|
|`Dafny SLV: Repeat Last`| Runs the Dafny command-lin executable with the same options used during the last execution|`Ctrl + Shift + r`|


## Extension Settings

|Setting| Description|
|:----------------------|:-----------|
|`dafny-single-lemma-verification.dafny-path`|Path to the folder containing the Dafny executable|
|`dafny-single-lemma-verification.extra-options`| Command line options to use when running the Dafny executable|

# Improvements

- Rather than executing the Dafny command-line executable on the word under the cursor, execute it on the function/method/lemma that the cursor is in the scope of.

## Release Notes

### 0.8.0

Initial release.


-----------------------------------------------------------------------------------------------------------

