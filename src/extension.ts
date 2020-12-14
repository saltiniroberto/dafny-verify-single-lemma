// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from "fs";   
import * as path from 'path';

const terminal = vscode.window.createTerminal(`Dafny Terminal`);

var last_command:string = ""

function execDafny(onword:boolean, trace:boolean)
{
	// The code you place here will be executed every time your command is executed

	// Display a message box to the user
	let editor = vscode.window.activeTextEditor;
	if(editor != null)
	{
		let conf = vscode.workspace.getConfiguration('dafny-cli')

		let dPath: string | undefined = conf.get("dafny.basePath");

		if(dPath == undefined)
		{
			vscode.window.showErrorMessage("Dafny CLI: Dafny path is not set.");
			return;
		}

		let dafny_path = path.join(dPath,"Dafny.exe")

		if(!fs.existsSync(dafny_path))
		{
			vscode.window.showErrorMessage("Dafny CLI: Dafny.exe executable cannot be found at the path indicated in the settings.");
			return;			
		}

		let extra_options = conf.get("dafny.extraOptions")

		if(trace)
		{
			extra_options = extra_options + " /trace"
		}
		
		var currentlyOpenTabfilePath = vscode.window.activeTextEditor?.document.uri.fsPath as string;

		var rel_path = path.relative(vscode.workspace.rootPath as string, currentlyOpenTabfilePath)


		var procOption = ""
		if(onword)
		{
			let cursorPosition = editor.selection.start;
			let wordRange = editor.document.getWordRangeAtPosition(cursorPosition);
	
			if(wordRange == undefined)
			{
				vscode.window.showErrorMessage("Dafny CLI: No word under the cursor.");
				return;
			}
	
			let highlight = editor.document.getText(wordRange);

			procOption = `/proc:'*.${highlight}'`;
		}
		
		last_command = `'${dafny_path}' /compile:0  ${extra_options} ${procOption} '${rel_path}'`
		vscode.commands.executeCommand('setContext', 'dafny-cli:last-command-exists', true);

		terminal.sendText(last_command);
		terminal.show();

		// vscode.window.showInformationMessage();
	}	
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dafny-cli" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable1 = vscode.commands.registerCommand('dafny-cli', () => {
		execDafny(true, false);
	});

	let disposable2 = vscode.commands.registerCommand('dafny-cli.trace', () => {
		execDafny(true, true);
	});	

	let disposable3 = vscode.commands.registerCommand('dafny-cli.repeat.last', () => {
		if(last_command != null)
		{
			terminal.sendText(last_command);
			terminal.show();
		}


	});	

	let disposable4 = vscode.commands.registerCommand('dafny-cli.verify-file', () => {
		execDafny(false, false);
	});		

	let disposable5 = vscode.commands.registerCommand('dafny-cli.verify-file-with-trace', () => {
		execDafny(false, true);
	});		

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
	context.subscriptions.push(disposable4);
	context.subscriptions.push(disposable5);

	vscode.commands.executeCommand('setContext', 'dafny-cli:last-command-exists', false);
}

// this method is called when your extension is deactivated
export function deactivate() {}
