# hermit Frontend
-------------------------------

![hermit logo][logo]

### ABOUT THIS PROJECT

This app was inpsired by the many times I've committed to going hiking in Washington where the trail is not only packed, but also LOUD. This might just be me, but when I spend the time to go out into nature, I don't want to feel like I'm still in the city. I wanted to make an app that allows me to predict when trails are going to be busy, so I can avoid those days. Hence hermit was born.

With hermit, one can stay in-the-know about local hikes (and when NOT to go), find new adventures, and share your experience with other users.

### CURRENT FEATURES

* Signup { Name, Email, Username, Hiking Profficiency, Password }
* Login { Email, Password }
* Find trails based on your location
* Filter by trail length
* Sort { Difficulty, Rating, Length }
* Get more detailed information on each hike
* See a prediction of how busy that trail will be on a day of your choosing
* Leave public comments on each hike
* Keep a list of favorite trails to refer back to
* Logout

### TO INSTALL

* Fork and clone this repository
* Run 'npm install' in your terminal
* Depending on how you'd like to open the project:
  * [Install an iOS simulator on your local machine](http://www.macinstruct.com/node/494)
  * [Install an Android emulaltor on your local machine](https://developer.android.com/studio/run/emulator)
  * Install Expo app on your phone
* Run 'npm start' or 'expo start'
* Expo will open a seperate web broswer with a QR code:
  * If you're using iOS simulator, hit 'Run on iOS simulator' in the new window
  * If you're using Android emulator, hit 'Run on Android device/emulator'
  * if you're using the Expo app, scan the QR code with your phone's camera and you'll be prompted to open the project in Expo

### Tech Stack

Front End:
* Javascript, CSS
* React
* React Native
* React Native Elements
* React Navigation
* Redux/React-Redux
* REI Hiking Project API

Back End:
* Axios
* BCrypt.js
* JSONWebToken
* Cors
* Express
* Morgan
* Knex
* Nodemon
* Google Trends API

### DEVELOPER

[Dillon Easter](http://johndilloneaster.surge.sh/)

If you have any questions, don't hesitate to reach out at [johndilloneaster@gmail.com](mailto:johndilloneaster@gmail.com)

[logo]: https://github.com/easterjd/hermit-frontend/blob/master/assets/images/hermiticon3.png "Hermit Logo"
