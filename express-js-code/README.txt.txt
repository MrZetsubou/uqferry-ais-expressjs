This folder contains the source code for my prototype implementation of a tracking system for the CityCat ferries on Express.js. The files provided here are not the complete set of files. You will need to install Express.js and Node.js. The Mosquitto MQTT module for Node.js and socket.io module for Node.js are also required.

A tutorial for installing and setting up Express.js can be found on :

https://www.digitalocean.com/community/articles/how-to-install-and-run-a-node-js-app-on-centos-6-4-64bit

Once installed, the following files are to be placed in their corresponding folders in order for it to work.

 - app.js ------- replace the "app.js" file that Express creates for u with this file.

 - index.jade ------ replace this "index.jade" file under the folder "/views/" that was created by Express

 - layout.jade ------ replace this "layout.jade" file under the folder "/views/"

 - mymaps.js ------  add this file to the folder path "/public/javascripts/"