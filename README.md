# Eraser App



https://github.com/eraserapp-io/eraser/assets/27066041/339f973f-80d1-44ee-8a2e-71fdff0f2d26



Eraser is an app I built to practice with react-native. It is a CRUD app that lets students track upcoming assignments for courses. It is based on Backpack, the more full-fledged solution that I have been building. You can check Backpack out on the app store [here](https://apps.apple.com/us/app/homework-tracker-by-backpack/id1482207446). I wanted to build a full-stack app to get experience working with different components of product development. I also wanted to apply the knowledge I have acquired from Backpack in order to create a robust and modular project. Finally, I thought it would be interesting to implement some ideas I had for Backpack that didn't make the final cut, such as a bidirectional infinite-scrolling agenda.
## `/app`
This directory contains all necessary logic to run the react-native app _(note: only the iOS version is available at this point)_

## `/cli`
This directory contains a custom CLI I developed to aid in generating templates for components, views, etc. This allowed me to iterate quickly and ensure that my project kept a uniform structure in terms of types, project structure, modularity, etc.

## `/server`
This directory contains all necessary logic to run the NestJS server, which handles all requests for users, such as creating users, CRUD operations for courses and assignments, etc. It uses postgres as the database.

## Instructions to run:

1. Download repos (app, cli, server)
2. Install dependencies using yarn
3. Create a new firebase project with authentication
4. Create a new service account, copy over credentials into `/server/src/firebase/firebase.config.json`
5. Create a new iOS app, copy over plist into `/app/ios/GoogleService-Info.plist`

### Setting up server
1. `cd server`
2. _Set up a postgres instance_
3. Add database url to .env file in /server (_example provided_)
4. Run `npx prisma migrate dev` to set up database
5. 
6. Run `npm run start:dev`
7. Make a post request to /api/user to create the test user
```bash
curl --location --request POST 'http://localhost:3000/api/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "LpyLsngLC1b7IumK557o6AslZ9R2",
    "name": "Test User",
    "email": "testuser@test.com"
}'
```
You're all set! Your server is now up and running

### Setting up app
1. `cd app`
2. Ensure that node_modules and pods are installed
3. Run `yarn ios` or `npm run ios`
4. Replace `ORIGIN` in /src/tools/constants/index.ts to your server's URL

### Setting up CLI
1. `cd cli`
2. Run `npm run build`

All set! Your CLI is not available in `/app`
Run `ecli` in the terminal to view commands
