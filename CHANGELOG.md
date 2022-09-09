# Release Notes

## 0.5.1

- Added handling of the verification selection pattern required for Dafny versions > 3.7.1 preserving back-compatibility via configuration option.

## 0.4.3

- Moved Release Notes to the Changelog file.

## 0.4.2

- Added dependency on the extension `dafny-lang.ide-vscode` to the manifest file.

## 0.4.1

- Now, when `Verify Current Symbol` checks for the current symbols, it filters out anything that is not a function, method, lemma or constructor. This is needed to allow falling back on using the word at the cursor position when executing `Verify Current Symbol` on refined entities as the Dafny symbol provider does not list refined entities, but only their parent entity.  This improvement also helps prevent running erroneous verification commands.

## 0.4.0

- `Verify Under Cursor` command changed to `Verify Current Symbol`. Now the innermost symbol enclosing the current cursor position is preferred over the word where the cursor is positioned when setting the value for the Dafny CLI `/proc` parameter.

## 0.3.4

- Add option to specify postfix to add to command execution.

## 0.3.3

- Update Known Issues doc.

## 0.3.2

- Fix handling of identifier names including underscores
- Fix handling of constructor methods

## 0.3.1

- Publish to VSCode Marketplace

## 0.3.0

- Modify settings to allow specifying the command to use to run Dafny rather than the path to Dafny.exe

## 0.2.2

- Fix: Prefix "mono" to the Dafny executable

## 0.2.1

- Fix: Reopen the terminal in the case that it had been manually killed.

## 0.2.0

- Add commands for verifying the current file
- Rename the extension from `dafny-single-lemma-verification` to `dafny-cli` given that the scope of the extension has been broadened with this version

## 0.1.0

- Initial release.

-----------------------------------------------------------------------------------------------------------