import * as vscode from 'vscode';
import { HelloWorldPanel } from './HelloWorldPanel';
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("vslearn-sidebar", sidebarProvider)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("vslearn.helloWorld", () => {
			vscode.window.showInformationMessage("Hello!!, Executing HelloWorldPanel");
			HelloWorldPanel.createOrShow(context.extensionUri);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("vslearn.askQuestion", async () => {
			const answer = await vscode.window.showInformationMessage(
				"How was your day?",
				"good",
				"bad"
			);

			if (answer === "bad") {
				vscode.window.showInformationMessage("Sorry to hear that");
			} else {
				console.log({ answer });
			}
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("vslearn.refresh", async () => {
			HelloWorldPanel.kill();
			HelloWorldPanel.createOrShow(context.extensionUri);
			setTimeout(() => {
				vscode.commands.executeCommand(
					"workbench.action.webview.openDeveloperTools"
				);
			}, 500);
		})
	);
}

export function deactivate() { }
