"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("f7.BlankPageSingle", () => {
        // Opening Framework7 Terminal
        const terminal = vscode.window.createTerminal("F7 Installer", process.env.COMSPEC);
        terminal.show(true);
        // Donwloading package.json
        terminal.sendText('powershell -command "& { iwr https://gist.github.com/taufiksu/487d4ea119a53bbbf7572ebdc440938d/raw/c70ae88cec454ed377fc86252bbb7ff1ed8f801f/package.json -OutFile package.json }"', true);
        // Getting Framework7 Resouces
        terminal.sendText("npm install", true);
        // Cleaning
        terminal.sendText("del package.json", true);
        terminal.sendText("del package-lock.json", true);
        terminal.sendText("rmdir /s /q node_modules", true);
        terminal.sendText("cd www", true);
        terminal.sendText("mkdir css", true);
        terminal.sendText("mkdir js", true);
        terminal.sendText("mkdir pages", true);
        // Downloading Sample CSS
        terminal.sendText("cd css", true);
        terminal.sendText('powershell -command "& { iwr https://gist.github.com/taufiksu/4f99dad2448cd00a03a98fac0c0b2e04/raw/a9849bbad89ce1e9210ddf34c1c81219611de718/app.css -OutFile app.css }"', true);
        terminal.sendText('powershell -command "& { iwr https://gist.github.com/taufiksu/6daddbb7403ed8e4701180dcd2c4ea94/raw/16fdcf61a2a4aa1c64d7a87f3d2726ab929bd6d1/icons.css -OutFile icons.css }"', true);
        terminal.sendText("cd ..", true);
        // Downloading Sample JS
        terminal.sendText("cd js", true);
        terminal.sendText('powershell -command "& { iwr https://gist.github.com/taufiksu/722fb89d0425511473c556e4871d6f5f/raw/66388dfd82a2977e5e642a5ce946da3a654f3ae4/routes.js -OutFile routes.js }"', true);
        terminal.sendText('powershell -command "& { iwr https://gist.github.com/taufiksu/d387003d6666fa5f45784e23d85a1cc2/raw/81ea9f2d91e0899a5ad0775051b8d2924f237656/app.js -OutFile app.js }"', true);
        terminal.sendText("cd ..", true);
        // Downloading Sample Blank Page
        terminal.sendText("cd pages", true);
        terminal.sendText('powershell -command "& { iwr https://gist.github.com/taufiksu/570b2058173bfa6c1546df9094364726/raw/8980d6cbb4bf3737262d2a50a8405ac4a8246d96/home.html -OutFile home.html }"', true);
        terminal.sendText('powershell -command "& { iwr https://gist.github.com/taufiksu/51b474cbafe41ee6cfb2531852018a1c/raw/987d5e0a28216201967197d5792b1fcc27248ac3/404.html -OutFile 404.html }"', true);
        terminal.sendText("cd ..", true);
        // Downloading Index
        terminal.sendText('powershell -command "& { iwr https://gist.github.com/taufiksu/ebef8e3a137e003db3fcb44c92c8254b/raw/afbcab1ef5b01b5c3531995c8e6e5e4119a3dfc0/index.html -OutFile index.html }"', true);
    }));
    context.subscriptions.push(vscode.commands.registerCommand("f7.Preview", () => {
        const terminal = vscode.window.createTerminal("F7 Server", process.env.COMSPEC);
        terminal.sendText("serve -l 7777", true);
        terminal.show(true);
        setTimeout(function () {
            const panel = vscode.window.createWebviewPanel("webview", "Framework7", vscode.ViewColumn.Two, {
                enableScripts: true,
            });
            panel.webview.html = provideContent();
        }, 3000);
    }));
    context.subscriptions.push(vscode.commands.registerCommand("f7.PreviewBrowser", () => {
        const terminal = vscode.window.createTerminal("F7 Server", process.env.COMSPEC);
        terminal.sendText('explorer "http://localhost:7777"', true);
        terminal.sendText("serve -l 7777", true);
        terminal.show(true);
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
function provideContent() {
    return `
      <html>
          <header>
              <style>
                  body, html, div {
                      margin: 0;
                      padding: 0;
                      width: 100%;
                      height: 100%;
                      overflow: hidden;
                      background-color: #fff;
                  }
              </style>
          </header>
          <body>
              <div>
                  <iframe src="http://127.0.0.1:7777" width="100%" height="100%" seamless frameborder=0>
                  </iframe>
              </div>
          </body>
      </html>
  `;
}
//# sourceMappingURL=extension.js.map