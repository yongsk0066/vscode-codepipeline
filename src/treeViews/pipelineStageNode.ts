import { StageState } from "@aws-sdk/client-codepipeline";
import * as vscode from "vscode";
import { getAbsoluteIconPath, getStageStateIcon } from "./icons";
import { PipelineActionNode } from "./pipelineActionNode";


export class PipelineStageNode extends vscode.TreeItem {
  constructor(
    public readonly pipelineName: string,
    public readonly stage: StageState,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(stage.stageName ?? 'Unknown', collapsibleState);
  }
  iconPath = getStageStateIcon(this.stage.latestExecution?.status ?? "NoAction");


  async getPipelineActionNode(): Promise<PipelineActionNode[]> {
    try {
      return this.stage.actionStates?.map(stage => new PipelineActionNode(this.pipelineName, stage, vscode.TreeItemCollapsibleState.None)) ?? [];
    } catch(err) {
      console.error(err);
      return [];
    }
  }

}
