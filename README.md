# LinkedInLikeNotificationDropdown

In MongoDB, data is being generated randomly in a periodic interval of 60 seconds. The server.js script queries the mongoDB in a periodic interval of 50 seconds. As soon as any unread notification is returned from query result, it is sent to front end through a custom event, testerEvent. The webpage on being reloaded shows the number of new notifications. As user clicks on the bell icon, another custom event clientEvent is fired and the notifications are marked as read in database. As soon as any new notification is found in database, it is reflected after reloading the page.

************************************************************************************************************************************************************************************
Installation Guidelines 

1. For Ubuntu:

Installing npm:
$curl -sL https://deb.nodesource.com/setup | sudo bash -
$sudo apt-get install nodejs


checking whether properly installed
$ npm -v
2.15.9  (Expected Output)

$node -v
v0.10.44 (Expected Output)

To install Express
$ npm install --save express

To install MongoDB
$npm install mongoDB

To install MongoDB Server
sudo apt-get install mongodb-server 

For running the application
1. $mongod
2. $cd ~/LinkedInLikeNotificationDropdown    (Path to the folder)
3. $node server.js
4. $http://localhost:3000/

As soon as any new notification is found it will get reflected in the application. On clicking on bell, notifications would be marked as read in database.



