import { ActionState } from "@aws-sdk/client-codepipeline";
import * as vscode from "vscode";
import { getActionStateIcon } from "./icons";


export class PipelineActionNode extends vscode.TreeItem {
  constructor(
    public readonly pipelineName: string,
    public readonly action: ActionState,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(action.actionName ?? 'Unknown', collapsibleState);
    
  }
  iconPath = getActionStateIcon(this.action.latestExecution?.status ?? "NoAction");
}
