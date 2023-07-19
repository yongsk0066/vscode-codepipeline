import * as vscode from "vscode";
import { getCodePipeline } from "../api/api";
import { PipelineNode } from "./pipelineNode";
import { PipelineStageNode } from "./pipelineStageNode";
import { PipelineActionNode } from "./pipelineActionNode";



type PipelinesTreeNode = PipelineNode | PipelineStageNode | PipelineActionNode


export class PipelineTreeProvider implements vscode.TreeDataProvider<PipelinesTreeNode> {
  getTreeItem(element: PipelineNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }
  
  async getChildren(element?: PipelinesTreeNode): Promise<PipelinesTreeNode[]> {
    if(!element){
      try {
        const pipelines = await getCodePipeline();
        console.log(pipelines)

        if(pipelines?.pipelines && pipelines.pipelines.length > 0){
          return pipelines.pipelines.map((pipeline, index) => new PipelineNode(pipeline?.name ?? `${index}`, vscode.TreeItemCollapsibleState.Collapsed));
        }
        return [];
      }
      catch(err){
        console.error(err);
        return [];
      }
    }
    if(element instanceof PipelineNode){
      return element.getPipelineStageNode();
    } else if (element instanceof PipelineStageNode){
      return element.getPipelineActionNode();
    }
    return [];
  }
}