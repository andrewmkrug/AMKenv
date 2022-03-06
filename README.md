<link rel="stylesheet" href="https://unpkg.com/keyboard-css@1.2.4/dist/css/main.min.css" />

<h1 align="center" id="title">A/Kenv</h1>

<p id="description">A/K's shareable Kenv for Scriptkit</p>

<h2>🧐 Features</h2>

Here're some of the project's best features:

- Cross browser bookmarks
- Save tabs to MD file
- MD docs explorer
- JSON schema generator and validator
- Proxy server for intercepting any network calls
- Browser icons for selecting browsers
- Editor icons
- Script Icons

<h2>🛠️ Installation Steps:</h2>

<p>1. Node 16+ set as default node</p>

```
nvm install 16 && nvm set default 16
```

<p>2. Get ScripKit from <a href="https://github.com/johnlindquist/kitapp/releases/latest">Scriptkit.com</a></p>

- Windows and Linux are developer preview

<p>3. Add kit to your path.</p>

- Open Scritkit with <kbd>cmd</kbd> + <kbd>;</kbd>
- Go to the Kit tab
  - 3 tabs or use your mouse
- Select `ADD ~/.KIT/BIN TO $PATH`

<p>4. Use the clone Kenv from within scriptkit</p>

- Open Scritkit with <button class="kbc-button no-container kbc-button-xs">&#8984;</button> + <button class="kbc-button no-container kbc-button-xs">;</button>
- Go to the Kit tab
  - 3 tabs or use your mouse
- Select `Manage kenvs`
- Select `Clone repo of scripts`
- Enter `andrewmkrug/AMKenv`

<p>5. Install all the icons</p>

- Open Scritkit with <button class="kbc-button no-container kbc-button-xs">&#8984;</button> + <button class="kbc-button no-container kbc-button-xs">;</button>
- Run `AMKenv Bonuses` script and select `Install Images`

## Developent

There is a current script called `getIcons` that gets the browser logos from an npm package. This will be upgraded in the future to support more icons natively.
