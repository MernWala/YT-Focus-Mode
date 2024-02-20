# YouTube Focus Mode
- This webapp is created only for focus on learning
- In this project, I've used concept of ```regex``` and ```To Do Concept```

## How to use it
- Install [Node.js](https://nodejs.org/en/download) in your system. Install LTS version for stable and smooth runtime
- Then, open this project in [VS Code](https://code.visualstudio.com/download) and hit ``` ctrl + ` ``` to open **terminal**
- Write ```npm install``` or ```yarn install```
- After installation of all packages you can hit ```npm run dev``` or ```yarn run dev```

## How to automate terminal in system startup
- Yes, you can automate local server start via using **VB Script**
- Open notepad or any code edditor and write the following code, And save it as ```run_in_background.vbs```
- Now, At windows hit ``` ctrl + r ``` and type ```shell:startup``` then hit enter
```
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c cd /d PROJECT_FOLDER_PATH && yarn next dev -p PORT", 0, False
Set WshShell = Nothing
```
- **Note:** You've to set path of your project and port number that you can use
- Before setting up your port number make sure it is vacant to use