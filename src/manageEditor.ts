import * as vscode from 'vscode';
import { generateComment } from './ollama';

export function getCurrentLine(editor: vscode.TextEditor){
    const currentLine = editor.selection.active.line;
    console.log('Current line: '+currentLine);
    return currentLine;
}

export async function addCommentToFile(fileUri: vscode.Uri,fileName: string, line: number, generatedComment: string){
    // console.log('Adding comment to file: '+ line, generatedComment);
    const edit = new vscode.WorkspaceEdit();
    edit.insert(fileUri, new vscode.Position(line, 0), generatedComment.trim());

    await vscode.workspace.applyEdit(edit);

    vscode.window.showInformationMessage('Comment added: ' + fileName + ' at line: ' + line+1);
}