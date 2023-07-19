import { ActionExecutionStatus } from "@aws-sdk/client-codepipeline";
import * as vscode from "vscode";

let _context: vscode.ExtensionContext;
export function initResources(context: vscode.ExtensionContext) {
  _context = context;
}


export const getAbsoluteIconPath = (relativeIconPath: string): {
  light: string | vscode.Uri;
  dark: string | vscode.Uri;
} =>{
  return {
    light: vscode.Uri.joinPath(_context.extensionUri, "resources", "icons", relativeIconPath),
    dark: vscode.Uri.joinPath(_context.extensionUri, "resources", "icons", relativeIconPath)
  };
}

export const getActionStateIcon = (status: string) => {
  console.log(status);
  switch (status) {
    case "InProgress":
      return getAbsoluteIconPath("inprogress.svg");
    case "Succeeded":
      return getAbsoluteIconPath("success.svg");
    case "Failed":
      return getAbsoluteIconPath("failure.svg");
    case "Abandoned":
      return getAbsoluteIconPath("pending.svg");
    default:
      return getAbsoluteIconPath("pending.svg");
  }
}



export const getStageStateIcon = (status: string) => {
  switch (status) {
    case "Cancelled":
      return getAbsoluteIconPath("failure.svg");
    case "Failed":
      return getAbsoluteIconPath("failure.svg");
    case "InProgress":
      return getAbsoluteIconPath("inprogress.svg");
    case "Stopped":
      return getAbsoluteIconPath("stopped.svg");
    case "Stopping":
      return getAbsoluteIconPath("waiting.svg");
    case "Succeeded":
      return getAbsoluteIconPath("success.svg");
    default:
      return getAbsoluteIconPath("pending.svg");
  }
}

