import * as vscode from "vscode";
import { PipelineNode } from "../treeViews/pipelineNode";

const getPipelineUrl = (name:string) => {
  return `https://ap-northeast-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/${name}/view?region=ap-northeast-1`;
}

export function registerOpenPipeline(context: vscode.ExtensionContext)  {
  context.subscriptions.push(
    vscode.commands.registerCommand("pipeline.open",  (pipelineNode:PipelineNode) => {
      vscode.env.openExternal(vscode.Uri.parse(getPipelineUrl(pipelineNode.label)));
    })
  );
}
