
// js/controllers/main.js
angular.module('clipController', [])

    // inject the Clip,Tag service factory into our controller
    .controller('mainController', function($scope, $http, Clips, Tags, Youtubes) {
        $scope.formData = {};
        $scope.formDataCreateTag = {};
        
        //sections on page
        $scope.showClips = false;
        $scope.showCreateClips = false;
        $scope.showCreateTag = false;
        $scope.showCreateYoutube = false;

        //hides all sections on page
        $scope.hideAll = function() {
            $scope.showClips = false;
            $scope.showCreateClips = false;
            $scope.showCreateTag = false;
            $scope.showCreateYoutube = false;

        };

        // GET =====================================================================
        // when landing on the page, get all clips and show them
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
            if (!$.isEmptyObject($scope.formData)) {

                // call the create function from our service (returns a promise object)
                Clips.create($scope.formData)

                    // if successful creation, call our get function to get all the new clips
                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.clips = data; 
                    });
            }
        };

        // DELETE ==================================================================
        // delete a clip
        $scope.deleteClip = function(id) {
            console.log("delete attempt");
            Clips.delete(id)
                // if successful creation, get all the new clips
                .success(function(data) {
                    $scope.clips = data;
                });
        };


        //TAGS

        $scope.createTag = function() {
            Tags.create($scope.formDataCreateTag)
                .success(function(tags) {
                    $scope.formDataCreateTag = {};
                    $scope.tags = tags; // assign new list of tags
                });
        };

        //YOUTUBE

        $scope.createYoutube = function() {
            Youtubes.create($scope.formDataCreateYoutube)
                .success(function(youtubes) {
                    $scope.formDataCreateYoutube = {};
                    $scope.youtubes = youtubes; // assign new list of youtubes
                });
        };

        $scope.getYoutube = function() {
            Youtubes.get()
            .success(function(youtubes) {
                $scope.youtubes = youtubes;
            });
        };

    });