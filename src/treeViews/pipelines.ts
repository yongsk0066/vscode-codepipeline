import * as vscode from "vscode";
import { getCodePipeline } from "../api/api";
import { PipelineNode } from "./pipelineNode";



type PipelinesTreeNode = PipelineNode;


export class PipelineTreeProvider implements vscode.TreeDataProvider<PipelinesTreeNode> {
  getTreeItem(element: PipelineNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }
  
  async getChildren(element?: PipelinesTreeNode): Promise<PipelinesTreeNode[]> {
    if(!element){
      try {
        const pipelines = await getCodePipeline();
        if(pipelines?.pipelines && pipelines.pipelines.length > 0){
          return pipelines.pipelines.map((pipeline, index) => new PipelineNode(pipeline?.name ?? `${index}`, vscode.TreeItemCollapsibleState.None, {
            command: 'openPipeline',
            title: '',
            arguments: [pipeline.name],
          }));
        }
        return [];
      }
      catch(err){
        console.error(err);
        return [];
      }
    }
    return [];
  }
}