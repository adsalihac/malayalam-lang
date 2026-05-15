import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Malayalam language extension activated");

  // Language configuration
  const languageConfig = {
    id: "malayalam",
    aliases: ["Malayalam", "malayalam"],
    extensions: [".ml"],
  };

  // Basic command for testing extension
  const disposable = vscode.commands.registerCommand(
    "malayalam.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello from Malayalam Language Extension!"
      );
    }
  );

  context.subscriptions.push(disposable);

  // Register hover provider for quick help
  const hoverProvider = vscode.languages.registerHoverProvider("malayalam", {
    provideHover(document, position) {
      const range = document.getWordRangeAtPosition(position);
      if (!range) return null;

      const word = document.getText(range);
      const malayalamKeywords: Record<string, string> = {
        കാണിക്കുക: "Print - outputs value to console",
        എണ്ണം: "Number - numeric variable",
        പേര്: "String - text variable",
        ഫങ്ക്ഷൻ: "Function - declares a function",
        എങ്കിൽ: "If - conditional statement",
        എന്ത്: "Loop - for loop",
        മടങ്ങി: "Return - returns value from function",
        സത്യം: "True - boolean true",
        കള്ളം: "False - boolean false",
      };

      if (word in malayalamKeywords) {
        return new vscode.Hover(malayalamKeywords[word]);
      }

      return null;
    },
  });

  context.subscriptions.push(hoverProvider);

  // Register completion provider for IntelliSense
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    "malayalam",
    {
      provideCompletionItems() {
        const keywords = [
          "കാണിക്കുക",
          "എണ്ണം",
          "പേര്",
          "ഫങ്ക്ഷൻ",
          "എങ്കിൽ",
          "എന്ത്",
          "മടങ്ങി",
          "സത്യം",
          "കള്ളം",
        ];

        return keywords.map((keyword) => {
          const item = new vscode.CompletionItem(keyword);
          item.kind = vscode.CompletionItemKind.Keyword;
          return item;
        });
      },
    },
    "."
  );

  context.subscriptions.push(completionProvider);

  vscode.window.showInformationMessage(
    "Malayalam Language Extension is now active!"
  );
}

export function deactivate() {
  console.log("Malayalam language extension deactivated");
}

