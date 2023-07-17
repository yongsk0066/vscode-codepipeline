import * as vscode from "vscode";
import { getPinnedPipelines } from "../config/config";


export class PipelineNode extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
    this.updateContextValue();
  }

  updateContextValue() {
    this.contextValue = "pipeline";

    const pinnedPipelines = getPinnedPipelines();

    if (new Set(pinnedPipelines).has(this.label)) {
      this.contextValue += " pinned";
    } else {
      this.contextValue += " pinnable";
    }
  }
}
