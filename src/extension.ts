// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { buildPrompt } from './promptBuilder';
import { generateComment } from './ollama';
import { addCommentToFile, getCurrentLine } from './manageEditor';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "autocommenter" is now active!');

	const generateCommentCommand = vscode.commands.registerCommand('autocommenter.generateComment', async () => {

		const editor = vscode.window.activeTextEditor;
	if (!editor) {
		vscode.window.showErrorMessage('No active editor');
		return;
	}

	const prompt = await buildPrompt(editor);
	console.log('Prompt: ', prompt);

	if (prompt === undefined) {
		vscode.window.showErrorMessage('No prompt generated');
		return;
	}

	const comment = await generateComment(prompt);
	console.log('Comment: ', comment);

	if (comment === undefined) {
		vscode.window.showErrorMessage('No comment generated');
		return;
	}

	const fileUri = editor.document.uri;
	const fileName = editor.document.fileName;
	const currentLine = getCurrentLine(editor);

	addCommentToFile(fileUri, fileName, currentLine, comment);

		vscode.window.showInformationMessage('Generating comment...');
	});

	context.subscriptions.push(generateCommentCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
