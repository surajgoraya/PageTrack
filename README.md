![A screenshot of a notification indicating the webpage has changed](/docs/notification_screenshot.png?raw=true)
# PageTrack
## What & why?
This utility allows for people to watch webpages, and specific elements, nodes/divs for changes & notifies them if there is a change. This was initially built fo monitoring Ontario's (currently) rapidly changing vaccination eligibility pages, however, can be expanded to any webpage really. Upon a webpage change, a notification is displayed (along with some output to the console) which the user can click on to navigate to the changed webpage.
![A screenshot of a of the terminal indicating the webpage has changed](/docs/terminal_screenshot.png?raw=true)
## Adding webpages to watch
Webpages can be added to the watch list by navigating to http://localhost:9000, this will bring up a small web-based UI which allows you to specify a URL as well as a node to watch specifically. :anger: **This is currently required!** :anger: 

You can specify which element you want watched by either providing a `.class-name` for watching a particular element with that class (where `class-name` is the name of the class), or you can provide a `#id-name`, (where `id-name` is the ID on the element). If you want to watch the WHOLE page, you can specify `html` in that field.
![A screenshot of the PageTrack portal, showing a table with a watched site](/docs/portal_screenshot.png?raw=true)
## Built on/with
* NodeJS
* VueJS
