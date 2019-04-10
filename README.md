# Password Scheme Testing

### Members:
- Stefano Savvidis
- Elizabeth Letourneau
- Emma Orhun
- Owen Craston


### Deploy:
In the terminal, run this command `npm run deploy` OR `yarn run deploy`. This command pushes your built file to the `gh-pages` branch on your remote repository.
- Note there is only one route on this site and it is the home directory. 
- This route pulls from `App.js`.


### Link:
- http://www.owencraston.com/PasswordSite/


## Documentation
This project is made using React.js and hosted on GitHub pages. This project was bootstrapped using [Create React App](https://github.com/facebook/create-react-app). Create React App is a tool that generates the boilerplate code needed to begin a react project. For this reason, some files/code may not be pertinent to this assignment. 

#### /public/
-   files that give the browser the information it needs to render the web page. (Favicon, heading, etc)
#### /src/components/App/
- the wrapper component that handles most of the logic for the main view (see code comments for further information)
#### /src/components/UserPasswordConfirmations/
- this folder contains the components for the password generation and confirmation forms for each "type" of password (Carleton, Email, etc)
#### /src/components/UserPasswordTests/
- This folder contains the components for the user testing of passwords for each type of password (Carleton, Email, etc)
#### package.json and yarn.lock
- these are files used by the yarn package manager to import libraries, run commands etc.

