
// js/controllers/main.js
angular.module('clipController', [])

    // inject the Todo service factory into our controller
    .controller('mainController', function($scope, $http, Clips) {
        $scope.formData = {};

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        Clips.get()
            .success(function(data) {
                $scope.clips = data;
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createClip = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            // people can't just hold enter to keep adding the same to-do anymore
            //if (!$.isEmptyObject($scope.formData)) {

                // call the create function from our service (returns a promise object)
                Clips.create($scope.formData)

                    // if successful creation, call our get function to get all the new todos
                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.clips = data; // assign our new list of todos
                    });
          //  }
        };

        // DELETE ==================================================================
        // delete a todo after checking it
        $scope.deleteClip = function(id) {
            console.log("delete attempt");
            Clips.delete(id)
                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.clips = data;
                    console.log("deleted successs");
                });
        };
    });