# Table of Contents

1. [Blossom Editor](#blossom-editor)
2. [Warnings](#warnings)
3. [Installation (Direct)](#installation-direct)
4. [Installation (Manual)](#installation-manual)
5. [ARM](#arm)
6. [License & Attributions](#license--attributions)

# 🌸 Blossom Editor

![Platforms](https://img.shields.io/badge/Platforms-MacOS-lightgrey) ![Architecture](https://img.shields.io/badge/Architecture-x64-lightgrey)

⚠️ **THIS TEXT-EDITOR IS EXPERIMENTAL AND A PROOF OF CONCEPT.**

Blossom Editor is a 2000s era inspired text-editor.

**Created with:**

- Languages: TypeScript, JavaScript

- Framework: Electron

- Editor: CodeMirror 

- Terminal/Pseudoterminal: xterm.js, node-pty

- Markdown Parser: Marked

- Tools: exec-sh

- Button Icons: Material Symbols 

- Icon: Twemoji 14.0 - Cherry Blossom

The themes that come with Blossom Editor are slightly and/or heavily modified versions of CodeMirror's default themes that I found to fit best: duotone-dark, zenburn, 3024-night, paraiso-dark, gruvbox-dark, abcdef, and xq-dark, respectively.

Sample screenshots.

![one](img/one.png)
![two](img/two.png)
![three](img/three.png)
![four](img/four.png)
![five](img/five.png)

# Warnings

**1)** Since you have the option of packaging the application and creating the `.dmg` yourself, make sure you understand what you're doing.

**2)** Due to the lack of a proper load, save, and important features, this SHOULD NOT be used in a professional or in a serious workflow of any sort. 

**3)** You are liable for any file loss or damage. Nothing about this is perfect in any way, shape, or form compared to current day text-editors.

**4)** There might be slight performance issues since I haven't done any optimizations. Expect variable RAM usage depending on your system specs.

**5)** Many of the implementations are very barebones (i.e., no HTML sanitization) and hack-y. While it does look pretty cool, the source code is quite messy.

**6)** If you are going to build on top of this for whatever reason, I recommend that you should properly import the dependencies and use a bundler like Rollup.

**7)** Lastly, use this at your own risk. 

# Prerequisites

To be able to use tabs in Blossom Editor, you must set prefer tabs to always. This is located in your System Preferences:

System Preferences >> General >> Prefer tabs >> "always" when opening documents

![Tabs](img/tabs.png)

Without enabling this, your new tabs will become separate windows.

# Installation (Direct)

**1)** Go to `Releases` on the right hand side of the repository and download the latest version of the `.dmg` (x64 or arm64 depending on your machine).

**2)** Open the `.dmg` located in the root directory and drag the `blossom-editor.app` into the Applications folder as shown:

![dmg](img/dmg.png)

**Note:** Don't forget to eject the `.dmg`.

# Installation (Manual)

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
# x64: 
make package
#or
npm run package

# arm64: 
make package-arm
# or
npm run package-arm
```

Open the `.dmg` located in the root directory and drag the `blossom-editor.app` into the Applications folder as shown:

![dmg](img/dmg.png)

**Note:** Don't forget to eject the `.dmg`.

# ARM

The `arm64` version has not been tested. As a fallback, the `x64` version should work under Rosetta 2 translation. 

# License & Attributions

[MIT License](LICENSE).

See [NOTICE.md](NOTICE.md) regarding attributions for this project.