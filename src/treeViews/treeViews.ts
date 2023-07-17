import * as vscode from "vscode";
import { PipelineTreeProvider } from "./pipelines";

export const initTreeViews = (context: vscode.ExtensionContext) => {
  const pipelineTreeProvider = new PipelineTreeProvider();
  context.subscriptions.push(vscode.window.registerTreeDataProvider('pipeline-list',  pipelineTreeProvider));
}