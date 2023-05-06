# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## About this App
```
This is a React.js/Typescript project which acts as a client for the DuckDuckGo proxy found here:
https://github.com/dorshpigel/micro-proxy

The proxy is a dependency of this project,meaning you should first initialize it and only then handle this client.
Follow the steps on the other repository and once you are done peform these:
1.Pull this project from this repository
2.run -> npm install
3.run -> npm start

assuming you performed all actions from the other repo as well,you should be good to go.

IMPORTANT:
The Nesjs proxy should be running on port 3100,and this client runs on port 3000.

Features:
1.Search for related topics - using the DuckDuckGo API this client presents related topics,a brief summary and a link for each related topic.
2.Search history - search history automatically saved with each search,and reloaded again when the app is restarting (assuming you didn't delete the search history),and deletion of set search history.
3.Find on page - performs a search on all availalble paragraphs on page and highligths the word in yellow where it appears.

Technical overview:
1.HTTP request management - axios.
2.UI packages - rsuite,@rsuite/icons
3.Aux packages - lodash,classnames

POC Video:
https://www.screencast.com/t/zo33aCxmO
```
