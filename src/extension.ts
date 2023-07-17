import * as vscode from 'vscode';
import { initTreeViews } from './treeViews/treeViews';


export async function activate(context: vscode.ExtensionContext) {
	 await initTreeViews(context);

	let disposable = vscode.commands.registerCommand("openPipeline", (label: string) => {
			vscode.env.openExternal(vscode.Uri.parse(`https://ap-northeast-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/${label}/view?region=ap-northeast-1`));
	});

 	context.subscriptions.push(disposable);
}

export function deactivate() {}
