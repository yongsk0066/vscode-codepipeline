import * as vscode from "vscode";

const settingsKey = "codepipeline";

export function initConfiguration(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(async e => {
      if (e.affectsConfiguration(getSettingsKey("pipelines.pinned"))) {
        pinnedPipelinesChangeHandlers.forEach(h => h());
      }
    })
  );
}

function getConfiguration() {
  return vscode.workspace.getConfiguration();
}

function getSettingsKey(settingsPath: string): string {
  return `${settingsKey}.${settingsPath}`;
}

const pinnedPipelinesChangeHandlers: (() => void)[] = [];
export function onPinnedPipelinesChange(handler: () => void) {
  pinnedPipelinesChangeHandlers.push(handler);
}

export function getPinnedPipelines(): string[] {
  return getConfiguration().get<string[]>(getSettingsKey("pipelines.pinned"), []);
}

export async function pinPipeline(pipeline: string) {
  const pinedPipelines = Array.from(new Set(getPinnedPipelines()).add(pipeline));
  await getConfiguration().update(getSettingsKey("pipelines.pinned"), pinedPipelines);
}

export async function unpinPipeline(pipeline: string) {
  const x = new Set(getPinnedPipelines());
  x.delete(pipeline);
  const pinnedPipelines = Array.from(x);
  await getConfiguration().update(getSettingsKey("pipelines.pinned"), pinnedPipelines);
}

export function isPinnedPipelinesRefreshEnabled(): boolean {
  return getConfiguration().get<boolean>(getSettingsKey("pipelines.refresh.enabled"), false);
}

export function pinnedPipelinesRefreshInterval(): number {
  return getConfiguration().get<number>(getSettingsKey("pipelines.refresh.interval"), 60);
}
