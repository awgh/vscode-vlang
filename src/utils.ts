import {
	TextDocument,
	workspace,
	WorkspaceConfiguration,
	window,
	Uri,
	WorkspaceFolder,
} from 'vscode';
const defaultCommand = 'v';

/** Get V executable command.
 * Will get from user setting configuration first.
 * If user don't specify it, then get default command
 */
export function getVExecCommand(): string {
	const config = getWorkspaceConfig();
	const vPath = config.get('pathToExecutableFile', '') || defaultCommand;
	return vPath;
}

/** Get V configuration. */
export function getWorkspaceConfig(): WorkspaceConfiguration {
	const currentWorkspaceFolder = getWorkspaceFolder();
	return workspace.getConfiguration('v', currentWorkspaceFolder.uri);
}

/** Get current working directory.
 * @param uri The URI of document
 */
export function getCwd(uri?: Uri): string {
	const folder = getWorkspaceFolder(uri || null);
	return folder.uri.fsPath;
}

/** Get workspace of current document.
 * @param uri The URI of document
 */
export function getWorkspaceFolder(uri?: Uri): WorkspaceFolder {
	if (uri) return workspace.getWorkspaceFolder(uri);
	const currentDoc = getCurrentDocument();
	return currentDoc
		? workspace.getWorkspaceFolder(currentDoc.uri)
		: workspace.workspaceFolders[0];
}

export function getCurrentDocument(): TextDocument {
	return window.activeTextEditor ? window.activeTextEditor.document : null;
}
