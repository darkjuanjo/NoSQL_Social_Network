# NoSQL_Social_Network

## Description 

The purpose of this app is to simulate a social network app using a NOSQL database(MongoDB).

## Challenge Requirements 
 * Use MONGODB
 * Use Mongoose
 * Model: User
       1. username: String, unique and required validation and trimmed String.
       2. email: String, unique, required and email validation and trimmed String.
       3. thoughts: Array of _id values referencing the thought model.
       4. friends: Array of _id self referencing the user model.
       5. friendCount: Virtual field that retrieves friends array length.
 * Model: Thought
       1. thoughtText: String, required validation and character limit of min 1 to max 280.
       2. createdAt: Date, default value to current timestamp, use getter method to format query.
       3. username: String, required validation
       4. reactions: Array of nested documents (reactionSchema).
       5. reactionCount: Virutal field that retrieves reactions array length.
 * Model: Reactions
       1. SCHEMA ONLY
       2. reactionId: Use Mongoose's ObjectId data type, default value is set to new Object.
       3. reactionBody: String, required validation and character limit of max 280.
       4. username: String, required validation.
       5. createdAt: Date, Date, default value to current timestamp, use getter method to format query.
 
## Table of Contents

* [Installation Manual](#installation-manual)
* [Usage-Manual-INSOMNIA](#usage-manual-insomnia)
* [Screenshots](#screenshots)
* [License](#license)

## Installation-Manual

1. Download/Clone app from github repository
2. Open terminal and navigate to the root folder of the app (It should contain the server.js file).
3. Run the `npm install` command to automatically install all the required dependencies.
5. Once the dependencies finish installing and the MYSQL database was created run the `node server.js` to launch the application.

## Usage-Manual-INSOMNIA

1. Open terminal and navigate to the root folderof the application.
2. Once you are in the root folder run the command `node server.js`
3. Once the server runs open INSOMNIA and try the GET/POST/PUT/DELETE </br></br>
    #### Don't forget to replace the :id (params) with the actual value of the data you need! </br></br>
    * http://localhost:3001/api/users/
    * http://localhost:3001/api/users/:id  
    * http://localhost:3001/api/users/:id/friends/:friendId
    * http://localhost:3001/api/thought/
    * http://localhost:3001/api/thought/:id
    * http://localhost:3001/api/thought/:thoughtId/reactions

## Screenshots

### Video Preview
Video USER/FRIENDS ROUTES Walkthrough: https://watch.screencastify.com/v/7ZyxNd9XKIonT4Yxf6hb

Video THOUGHTS/REACTION ROUTES Walkthrough: https://watch.screencastify.com/v/L201GDVxSiAR8cAXxiGh


## License

ISC
    
