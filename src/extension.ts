import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand("vslearn.helloWorld", () => {
			vscode.window.showInformationMessage("Hello!!");
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
}

export function deactivate() { }
