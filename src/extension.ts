// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from "fs";   
import * as path from 'path';

const terminal_name = `Dafny Terminal`;
var terminal:vscode.Terminal | null = null;

var last_command:string = ""

function setsAreEqual<T>(a: Set<T>, b: Set<T>) {
	if (a.size !== b.size) {
	  return false;
	}
  
	return Array.from(a).every(element => {
	  return b.has(element);
	});
  }

async function execDafny(onword:boolean, trace:boolean)
{
	// The code you place here will be executed every time your command is executed

	// Display a message box to the user
	let editor = vscode.window.activeTextEditor;
	if(editor != null)
	{
		let conf = vscode.workspace.getConfiguration('dafny-cli')

		let dafnyCommand: string | undefined = conf.get("dafny.command");

		if(dafnyCommand == undefined)
		{
			vscode.window.showErrorMessage("Dafny CLI: Dafny command is not set.");
			return;
		}

		let dafnyCommandPrefix = (<string>(conf.get("dafny.commandPrefix") ?? "")).trim()

		let dafnyCommandPostfix = (<string>(conf.get("dafny.commandPostfix") ?? "")).trim()

		let isVersionHigherThan3_7_1 = (<boolean>conf.get("dafny.version_above_3_7_1"))

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
			let currentLine = cursorPosition.line;
			var activeEditor = vscode.window.activeTextEditor;	
			let highlight = undefined;

			if (activeEditor !== undefined) {
				var symbols = await vscode.commands
					.executeCommand<vscode.DocumentSymbol[]>(
						'vscode.executeDocumentSymbolProvider', activeEditor.document.uri);

				let symb_and_children : vscode.DocumentSymbol[] | undefined = symbols;
				let old_symb_and_children
				let safeStopLoop = 0
				do
				{
					old_symb_and_children = new Set(symb_and_children);
					symb_and_children = (symb_and_children?.map(s => s.children == undefined ? [] : s.children).flat() as vscode.DocumentSymbol[] | undefined)?.concat(symb_and_children == undefined ? [] : symb_and_children)
					safeStopLoop++;
				} 
				while(!setsAreEqual(new Set(symb_and_children), old_symb_and_children) && safeStopLoop < 50)

				symb_and_children?.sort((a, b) => a.range.start.line < b.range.start.line ? -1 : 1);				
				
				if (symb_and_children !== undefined) {
					for (const symbol of symb_and_children) {
						if (symbol.range.start.line <= currentLine &&
							currentLine <= symbol.range.end.line &&
						[5, 11].includes(symbol.kind))
						{
							highlight = symbol.name;
						}
					}
				}
;			}			
	
			if(highlight == undefined)
			{
				let wordRange = editor.document.getWordRangeAtPosition(cursorPosition)
				if (wordRange !== undefined)
				{
					highlight = editor.document.getText(wordRange);
				}
			}			

			if(highlight == undefined)
			{
				vscode.window.showErrorMessage("Dafny CLI: Could not find the symbol to verify.");
				return;
			}
	
			if(highlight == "constructor")
			{
				highlight = "_ctor";
			}

			if(isVersionHigherThan3_7_1)
			{
				procOption = `/proc:'${highlight} *' /proc:'*.${highlight} *'`;
			}
			else
			{
				highlight = highlight.replace(/_/g, "__");
				procOption = `/proc:'*.${highlight}'`;
			}
		}

		let completeDafnyCommand;
		if(dafnyCommandPrefix != "")
		{
			completeDafnyCommand = `'${dafnyCommandPrefix}' '${dafnyCommand}'`
		}
		else 
		{
			completeDafnyCommand = `'${dafnyCommand}'`
		}
						
		last_command = `${completeDafnyCommand} /compile:0  ${extra_options} ${procOption} '${rel_path}' ${dafnyCommandPostfix}`
		vscode.commands.executeCommand('setContext', 'dafny-cli:last-command-exists', true);
		
		executeInTerminal(last_command);
	}	
}

function isDafnyWindowStillDisplayed(): boolean
{
	for(var t of vscode.window.terminals)
	{
		if(t.name == terminal_name)
		{
			return true;
		}
	}
	return false;
}

function executeInTerminal(cmd:string)
{
	if(terminal == null || !isDafnyWindowStillDisplayed())
	{
		terminal = vscode.window.createTerminal(terminal_name);
	}

	terminal.sendText(last_command);
	terminal.show();
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
			executeInTerminal(last_command);
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
