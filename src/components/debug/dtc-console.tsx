"use client";

import { useEffect } from "react";
import packageJson from "../../../package.json";

export function DTCConsole() {
  useEffect(() => {
    console.log(`
 ________  ___________  ______   
|"      "\("     _   ")/" _  "\  
(.  ___  :))__/  \\__/(: ( \___) 
|: \   ) ||   \\_ /    \/ \      
(| (___\ ||   |.  |    //  \ _   
|:       :)   \:  |   (:   _) \  
(________/     \__|    \_______) 
-= DTC Console Initialized =-
Version: ${packageJson.version}
      
 |\/\/\/|  
 |      |  
 |      |  
 | (o)(o)  
 C      _) 
  | ,___|  
  |   /    
 /____\    
/      \

Hello friends! This is a welcome message from the DTC crew,
and we just wanted to say thanks for coming by and reading this:
this server currently runs on github pages (null-austin/dtc-website)
so you will not be finding any server vulnerabilities. But that said,
if you ever want to help create or develop this amazing website: feel
free to hop on GitHub and come over to our repository!

https://github.com/Null-Austin/dtc-website

`);
  }, []);

  return null;
}