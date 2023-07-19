import * as vscode from 'vscode';
import { initTreeViews } from './treeViews/treeViews';

import { initResources } from './treeViews/icons';
import { registerOpenPipeline } from './commands/openPipeline';


export async function activate(context: vscode.ExtensionContext) {
  initResources(context);
	
	await initTreeViews(context);

	registerOpenPipeline(context);

}

export function deactivate() {}
