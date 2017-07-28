# Voting App
Full stack app made using NodeJS, ExpressJS and MongoDB.

## User stories
- User Story: As an authenticated user, I can keep my polls and come back later to access them.
- User Story: As an authenticated user, I can share my polls with my friends.
- User Story: As an authenticated user, I can see the aggregate results of my polls.
- User Story: As an authenticated user, I can delete polls that I decide I don't want anymore.
- User Story: As an authenticated user, I can create a poll with any number of possible items.
- User Story: As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
- User Story: As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)

## Deploying
1. `git clone https://github.com/paulotokimatu/voting-app.git`
2. `cd voting-app`
3. `npm install`
4. Set up SESSION_SECRET, VOTING_APP_DB, consumerKey (from Twitter API), consumerSecret (from Twitter API) environmental variables in .env
5. Start your MongoDB instance
6. `node app.js`