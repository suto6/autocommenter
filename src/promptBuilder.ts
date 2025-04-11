import * as vscode from 'vscode';

function getScriptContext(textEditor: vscode.TextEditor) {
    let document = textEditor.document;
    const codeContext = document.getText();
    return codeContext;
}

async function getCodeBlock() {
    const codeBlock = await vscode.env.clipboard.readText();
    return codeBlock;
}

function selectCommentSyntax(editor: vscode.TextEditor) {
    const fileExtension = editor.document.fileName.toLowerCase().split('.').pop();

    const commentSyntaxMap: Record<string, string> = {
        'py': '#',
        'js': '//',
        'jsx': '{/**/}',
        'html': '<!--',
        'css': '/*',
        'ts': '//',
        'tsx': '{/**/}',
        'java': '//',
        'c': '//',
        'cpp': '//',
        'cs': '//',
        'php': '//',
        'rb': '#',
        'go': '//',
        'swift': '//',
        'sql': '--',
        'kt': '//',
        'rs': '//',
        'pl': '#',
        'sh': '#',
        'bat': '::',
        'bash': '#',
        'yml': '#',
        'yaml': '#',
        'json': '#',
        'xml': '<!-- -->',
        'zsh': '#',
        'txt': '#',
        'md': '#',
        'fish': '#',
        'ps1': '#',
        'psm1': '#',
        'psd1': '#',
        'ps1xml': '#',
        'ps1yaml': '#',
        'ps1yml': '#',
        'ps1ini': '#',
        'ps1cfg': '#',
        'ps1conf': '#',
        'ps1log': '#'
    };

    return fileExtension ? commentSyntaxMap[fileExtension] : undefined;
}


export async function buildPrompt(editor: vscode.TextEditor) {
    const codeBlock = await getCodeBlock();
    const codeContext = getScriptContext(editor);
    const commentSyntax = selectCommentSyntax(editor);

    if (!codeBlock) {
        vscode.window.showErrorMessage('No code block found in clipboard');
        return;
    }

    if (!commentSyntax) {
        vscode.window.showErrorMessage('Unsupported file type for comment syntax.');
        return;
    }

    let prompt = `
        complete code: 
        "{CONTEXT}"

        Given the code block below, write a brief, insightful comment that explains its purpose and functionality within the script. If applicable, mention any inputs expected in the code block.
        Keep the comment concise (maximum 3 lines), wrap the comment with the appropriate comment syntax ({COMMENT_SYNTAX}). 
        Avoid assumptions about the complete code and focus on the provided block.
        Do not rewrite the code block.

        code block:
        "{CODE_BLOCK}"
    `;

    prompt = prompt.replace('{CONTEXT}', codeContext);
    prompt = prompt.replace('{CODE_BLOCK}', codeBlock);
    prompt = prompt.replace('{COMMENT_SYNTAX}', commentSyntax);

    return prompt;
}
