# Neighborhood Map: Project 5.

**Note**: I hereby confirm that all project submissions consist of my own work. Codes are taken from *Instructors Notes*.
Taken ideas from *websites* and *Github*.

## Developed a single page application using Google Maps API to display a map of restaurants in San Francisco, CA neighborhood.
### The markers display the
*street view image*,
*location,
* URL,
* and, Wikipedia information.

All application components render on-screen in a responsive manner.Click events on list items handled with Knockout.
All data APIs used in the project load asynchronously.In the case of error: A message is displayed notifying the user that the data can't be loaded.
The code displays map markers identifying 6 locations within San Francisco, CA neighborhood. It displays the names of six locations by default
when the page is loaded. A filter option that uses an input field to filter both the list view and the map markers displayed by default on load. 
 
I have used a third-party APIs Wikipedia to provide information when a map marker or list view entry is clicked. When a list item or the map
marker is clicked, my map marker will bounce. It can open an info window with all the information about the selected item. 

## Required Libraries and dependencies
Knockout js - javascript Library -  version - 3.4.2

Project Contents ( * css and js folders, index.html file)
Project_Neighborhood_Map_Udacity folder:
 * index.html,
 * README.md 
css folder:
 * styles.css
js folder:
 * app.js
 lib folder.

*Run*
> Right click the index.html file and open it in any browser (I have used Google Chrome.)
> Seach the location using the search box. 
> Click the location. 
> It will show you all the information about that location.

**Note** Please refresh the browser if you have any problem.

Sources:
http://knockoutjs.com/documentation/introduction.html
http://api.jquery.com/
http://www.w3schools.com/
https://classroom.udacity.com/nanodegrees/nd004/parts/135b6edc-f1cd-4cd9-b831-1908ede75737/modules/271165859175460/lessons/3174548544/concepts/31744191770923
