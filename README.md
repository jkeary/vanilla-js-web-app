# vanilla-js-web-app
Connecting to the Dad Joke api using pure vanilla javascript

Coding challenge for a recent interview I had: 

The purpose of this exercise will be for you to take a sample open API and use the data
provided in a fairly basic Javascript web application to demonstrate your front-end development
skills. Ideally you should spend no more than 1-2 hours on this task.

Goal:
Given an API, build a small web application that will consume a few endpoints and render the
data provided to the screen. Include an option or two for the user so they can interact with the
data besides just viewing whatever is initially rendered to the screen (i.e. sorting, filtering, etc).

API:
Any API will do, and there are plenty of readily available open APIs you can view here:
https://github.com/public-apis/public-apis
A good place to start could be the Internet Chuck Norris Database (http://www.icndb.com/api/)
However the Open Trivia Database (https://opentdb.com/api_config.php) could also be fun to
work with!
HINTS: The information provided on the API’s homepage should be more than enough to get
started. Try to pick an API that doesn’t require any form of auth so you can get started more
quickly and easily.

Requirements:
The application should do the following:
● Fetch an API endpoint(s), store the data, and render it to the screen. Ideally the data
returned will be some kind of collection with many items.
● Paginate the displayed responses allowing for user interaction
● Include a UI element that allows a user to sort/filter/etc the data (in real-time). Note:
manipulation should occur on the originally fetched data, not the result of additional API
calls:
○ Toggle displayed results by groups?
○ Sort/shuffle/randomize the results?
○ Filter results by first letter?
● Write the application using vanilla javascript (do not use a framework like React,
Vue, Angular, etc.)
