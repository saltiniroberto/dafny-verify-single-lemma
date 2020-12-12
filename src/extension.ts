// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from "fs";   
const path = require("path")

const terminal = vscode.window.createTerminal(`Dafny Terminal`);

function execDafny(trace:boolean)
{
	// The code you place here will be executed every time your command is executed

	// Display a message box to the user
	let editor = vscode.window.activeTextEditor;
	if(editor != null)
	{
		let cursorPosition = editor.selection.start;
		let wordRange = editor.document.getWordRangeAtPosition(cursorPosition);
		let highlight = editor.document.getText(wordRange);
		// highlight will now contain the currently highlighted word

		let conf = vscode.workspace.getConfiguration('dafny-extra-commands')

		let dPath = conf.get("path")
		let extra_options = conf.get("extra-options")

		if(trace)
		{
			extra_options = extra_options + " /trace"
		}
		
		var currentlyOpenTabfilePath = vscode.window.activeTextEditor?.document.uri.fsPath;

		var rel_path = path.relative(vscode.workspace.rootPath, currentlyOpenTabfilePath)
					
		terminal.sendText(`'${dPath}/dafny' /compile:0  ${extra_options}  /proc:*.${highlight} '${rel_path}'` );
		terminal.show();

		// vscode.window.showInformationMessage();
	}	
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dafny-extra-commands" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable1 = vscode.commands.registerCommand('dafny.verify.single.function', () => {
		execDafny(false);
	});

	let disposable2 = vscode.commands.registerCommand('dafny.verify.single.function.trace', () => {
		execDafny(true);
		
	});	

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {}
