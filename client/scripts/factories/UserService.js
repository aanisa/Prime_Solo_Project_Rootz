/*jshint esversion: 6 */
rootsApp.factory('UserService', ['$http', '$location', function($http, $location) {
  console.log('User Service Loaded - Checking User');

  //object with user authentication data (response.data contains username, password, firstName, lastName)
  let userObject = {};

  let bioObject = {
    savedBios: []
  };

  let newPerson= {};

  return {
    userObject: userObject,
    bioObject: bioObject,
    newPerson: newPerson,

    //user information for login - routes
    getuser: () => {
      $http.get('/user').then(function(response) {
        if (response.data.username) {
          // user has a curret session on the server
          userObject.id = response.data.id;
          userObject.firstName = response.data.firstName;
          userObject.lastName = response.data.lastName;
          // console.log('User Data: ', userObject.firstName, userObject.lastName);
        } else {
          // user has no session, bounce them back to the login page
          $location.path('/home');
        }
      });
    },

    logout: () => {
      $http.get('/user/logout').then(function(response) {
        console.log('logged out');
        $location.path('/home');
      });
    },

    //get data from db and store in bioObject
    getBio: () => {
      //store response.data array into an object
      if (userObject.id) {
        $http.get('/bio').then(function(response) {
          bioObject.savedBios = response.data;
          console.log("ALL BIOS", bioObject);
        });
      } else {
        $location.path('/roots');
      }
      // console.log(bioObject.savedBios);
    },

    //create new relation
    newBio: () => {
      if (userObject.id) {
        $http.post('/bio', bioObject).then(function(response) {
          console.log('Saved to DB:', response);
        });
      }
    },

    //update biography and send to db
    updateBio: () => {
      if (userObject.id) {
        console.log('BIO!!!', bioObject);
        $http.put('/bio', bioObject).then(function(response) {
          console.log(response);
          // getBio();
        });
      }
    }




  };









}]);
