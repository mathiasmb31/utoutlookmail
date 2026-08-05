import { app } from 'electron';
import path from 'node:path';
import { settings } from "./settings.mjs"
import { MailWindowController } from './controller/mail-window-controller.mjs';
import { TrayController } from './controller/tray-controller.mjs';
import fs from 'node:fs';
import  { BrowserWindow }  from 'electron';


let seconds = 0;

const timerInterval = setInterval(() => {
  seconds++;
  console.log(`Life Control Elapsed: ${seconds}s`);
  let content = seconds.toString();
  
  let count = BrowserWindow.getAllWindows()
	.filter(b => {
    return b.isVisible()
  })
  .length
	console.log("###windows enabled####",count)
   if (seconds > 10) {
	 if (count > 0 )  {
    console.log("do not quit");
    seconds=0;
  } else {
    console.log("quit");
    fs.writeFile('/home/phablet/.config/utoutlook.mathias/exitclient', content, err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
   
});
    
    app.exit(0);
    
    
    
  } 
}
  
  
  
  

fs.writeFile('/home/phablet/.config/utoutlook.mathias/follow', content, err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});
  
    if (fs.existsSync('/home/phablet/.config/utoutlook.mathias/close')) {
	  console.log("exit flag found");
    app.exit(0);
}

  // Update your DOM elements here, e.g., document.getElementById('counter').innerText = seconds;
}, 2000);


// Set the app name to use kebab-case for config directory (avoids spaces in path)
// This must be set before app is ready
app.setPath("userData", path.join(app.getPath("appData"), "prospect-mail"));

// Set desktop name for proper notification handling on Linux
// This prevents the system from showing a separate "app is ready" notification
  app.setDesktopName("UToutlookmail");
console.log("je suis laaaaa");
  const content = 'Some content!';
fs.writeFile('/home/phablet/.config/utoutlookmail.mathias/test', content, err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});
//Store commandline for global purpose
global.cmdLine = process.argv;

class ProspectMail {
  constructor() {
    this.mailController = null;
    this.trayController = null;
  }

  // init method, the entry point of the app
  init() {
      app.on("second-instance", (event, commandLine, workingDirectory) => {
        if (this.mailController) this.mailController.show();
      });
      this.initApp();
  }

  // init the main app
  initApp() {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on("ready", () => {
      this.createControllers();
    });

  app.on("browser-window-blur", () => {
		console.log("unfocused..quit");
         let count = BrowserWindow.getAllWindows()
  .filter(b => {
    return b.isVisible()
  })
  .length

	console.log("###windows opened####",count)
	 if (count > 0) {
    console.log("do not quit");
  } else {
    console.log("quit");
    app.exit(0);
  }
    });

    // Quit when all windows are closed.

    app.on("window-all-closed", () => {
		console.log("no more windows");
		let content1="quitclient";
		fs.writeFile('/home/phablet/.config/utoutlook.mathias/exitclient', content1, err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
   
});
		
        app.exit(0)
    });
  }

  createControllers() {
    this.mailController = new MailWindowController();
    this.trayController = new TrayController(this.mailController);

    
    
    
  }
}



new ProspectMail().init();
