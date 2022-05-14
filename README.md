# Table of Contents

1. [Blossom Editor](#blossom-editor)
2. [Warnings](#warnings)
3. [Installation](#installation)
4. [Contributions](#contributions)
5. [To-Do's](#to-dos)
5. [License & Attributions](#license--attributions)

# Blossom Editor

![Blossom Editor](https://img.shields.io/badge/Blossom%20Editor-1.0.0-ff69b4) ![Platforms](https://img.shields.io/badge/Platforms-MacOS-lightgrey) ![Architecture](https://img.shields.io/badge/Architecture-x64-lightgrey)

Blossom Editor is a 2000s era inspired text-editor with a slight modern touch. 

This text-editor is seen as a substitute for your built-in notepad app, doing quick code edits, or basic markdown writing. In short, think of this as a complement to your daily text-editor or IDE when you want to do miniscule things. 

**Created with:**

- Languages: TypeScript, JavaScript

- Framework: Electron

- Editor: CodeMirror 

- Terminal/Pseudoterminal: xterm.js, node-pty

- Markdown Parser: Marked

- Other: exec-sh

- Button Icons: Material Symbols 

- Icon: Twemoji 14.0 - Cherry Blossom

The themes that come with Blossom Editor are slightly and/or heavily modified versions of CodeMirror's default themes that I found to fit best: duotone-dark, zenburn, 3024-night, paraiso-dark, gruvbox-dark, abcdef, and xq-dark, respectively.

Duotone-dark was the theme I initially chose to be the default for Blossom-Editor, and thus modified it accordingly. I like blinking block cursors and the purple-greyish colours, so Duotone-dark was the perfect match as a base.

Sample screenshots.

![one](img/one.png)
![two](img/two.png)
![three](img/three.png)
![four](img/four.png)
![five](img/five.png)

# Warnings

**1)** You'll be packaging the application, creating the `.dmg`, and installing it yourself. This application is not code signed.

**2)** Due to the lack of a proper load, save, file explorer, and other features, this SHOULD NOT be used in a professional or in a serious workflow of any sort. 

**3)** You are liable for any file loss or damage. Keep in mind that this is an experimental project, so nothing about this is perfect in any way, shape, or form compared to current day text-editors. Everyone has different use cases as well. While this may work fine for others, it may not work for you.

**3)** There might be slight performance issues since I haven't done any proper optimizations. Expect variable RAM usage and fans to kick in depending on your system specs.

# Pre-Requisites

To be able to use tabs in Blossom Editor, you must set prefer tabs to always. This is located in your System Preferences:

System Preferences >> General >> Prefer tabs >> "always" when opening documents

![Tabs](img/tabs.png)

Without enabling this, your new tabs will become separate windows.

# Installation

Clone the repository

```bash
git clone <SSH/HTTPS>
```

Change directory

```bash
cd Blossom-Editor
```

Install npm dependencies

```bash
npm install
```

Build package and create the `.dmg`

```bash
make package
#or
npm run package
```

Open `blossom-editor.dmg` located in the root directory and drag the `blossom-editor.app` into the Applications folder as shown:

![dmg](img/dmg.png)

**Note:** Don't forget to eject the `blossom-editor.dmg`.

# Contributions

Contributions are welcomed.

# To-Do's

- Implement a proper load and save function to make it more stable for daily usage. At the moment, this is the biggest flaw with the app. 

# License & Attributions

[MIT License](LICENSE).

Please read [NOTICE.md](NOTICE.md) regarding attributions for this project.