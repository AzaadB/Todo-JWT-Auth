# How to obtain this JWT ToDo app#
1.) Download it from Github with this link: https://github.com/AzaadB/Todo-JWT-Auth.git

2.) Then extract the files from the zip file and save it on to your local machine

3.) install node modules by typing npm install on the backend and the frontend.

4.) Once node modules has installed run it by typing npm start, it will then open in your browser.

# Pre users#
If you don't want to signup, there are 2 users already stored in MongoDB so you can login with there usernames and passwords below is their usernames and passwords:

usename: user1,
password: 123ABCvg!,

username: user2,
password: 123ABCqw!

# How this app was created,

Express was used for the crud opererions ie. creating, getting, updating and deleting, and also for JWT

and React was used for making the those login/signup request, also making the add and delete requests which were sent to the backend ie. express.

# How this app works#
1.) Before you can add or delete todos you need to either signup or login.

2.) Make sure that your password is 10 characters long and contains upperCase and lowerCase letters, a number/s and atleast one symbol.

3.) Once you have signed up your username and password will be stored in MongoDB, but don't worry your  password will be hashed meaning that in mongoDB's database under a collection called "usermodels", 
it will be stored as a long random string of charachters. 

Also when you add a new todo it gets stored in mongoDB's database under it's own collection called "todomodels"

4.) This app was created with Mongo, Express, React, Node also known as the (MERN stack), 
MongoDB is what was used to store all of our user's the user's login/signup and todo data ie. the username and password and the todo's they have added, 

5.) When you signup a JWT token is created and it basically protects your information from being hacked, when you logout you still have the token but it is never stored in a database.

6.) When you make the request on the frontend to log back in JWT on the express server first verifies if it is you that is logging in before it allows you to do anything ie. see, add, or delete your todos.

# When making a Get Request#

When making a get request on the frontend it goes to the express server which tells MongoDB to check if there are any todos from the user stored in the datatbase and if there are any they will display on the page, but if there is nothing then the page will be blank only a form to add a new todo will be shown.
