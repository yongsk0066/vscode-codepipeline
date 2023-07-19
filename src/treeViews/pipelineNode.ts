import * as vscode from "vscode";
import { getPipelineState } from "../api/api";
import { getPinnedPipelines } from "../config/config";
import { PipelineStageNode } from "./pipelineStageNode";


export class PipelineNode extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
    // this.updateContextValue();
    this.contextValue = "pipeline";
  }

  // updateContextValue() {
  //   this.contextValue = "pipeline";

  //   const pinnedPipelines = getPinnedPipelines();

  //   if (new Set(pinnedPipelines).has(this.label)) {
  //     this.contextValue += " pinned";
  //   } else {
  //     this.contextValue += " pinnable";
  //   }
  // }

  async getPipelineStageNode(): Promise<PipelineStageNode[]> {
    try {
      console.log(this.label);
      const pipelineState = await getPipelineState(this.label);
      console.log(pipelineState)
      return pipelineState.stageStates?.map(stage => new PipelineStageNode(this.label, stage, vscode.TreeItemCollapsibleState.Expanded)) ?? [];
    } catch(err) {
      console.error(err);
      return [];
    }
  }
}
