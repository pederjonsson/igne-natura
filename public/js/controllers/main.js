
// js/controllers/main.js
angular.module('clipController', [])

    // inject the Clip,Tag service factory into our controller
    .controller('mainController', function($scope, $http, Clips, Tags, Youtubes) {
        $scope.formDataForCreatingClip = {};
        $scope.tubeIdForCreatingClip = "";
        $scope.formDataCreateTag = {};
        $scope.formDataCreateYoutube = {};
        
        //sections on page
        $scope.showClips = false;
        $scope.showCreateClips = false;
        $scope.showCreateTag = false;
        $scope.showCreateYoutube = false;
        $scope.showYoutube = false;
        $scope.showTags = false;


        //hides all sections on page
        $scope.hideAll = function() {
            $scope.showClips = false;
            $scope.showCreateClips = false;
            $scope.showCreateTag = false;
            $scope.showCreateYoutube = false;
            $scope.showYoutube = false;
            $scope.showTags = false;
        };

        $scope.updateCreateClipFormWithYoutubeData = function(){
            var tubeObj = $scope.youtubes[$scope.tubeIdForCreatingClip];
            $scope.formDataForCreatingClip.youtubeId = $scope.tubeIdForCreatingClip;
            $scope.formDataForCreatingClip.originalTitle = tubeObj.originalTitle;
        }

        // CLIPS ==============================
        //GET
        $scope.getClips = function() {
            Clips.get()
            .success(function(data) {
                $scope.clips = data;
            });
        };
        

        // CREATE
        // when submitting the add form, send the text to the node API
        $scope.createClip = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            // people can't just hold enter to keep adding the same to-do anymore
            if (!$.isEmptyObject($scope.formDataForCreatingClip)) {

                // call the create function from our service (returns a promise object)
                Clips.create($scope.formDataForCreatingClip)

                    // if successful creation, call our get function to get all the new clips
                    .success(function(data) {
                        $scope.updateYoutube($scope.tubeIdForCreatingClip, true);
                        $scope.formDataForCreatingClip = {}; // clear the form so our user is ready to enter another
                        $scope.tubeIdForCreatingClip = "";
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

        $scope.getTags = function() {
            Tags.get()
            .success(function(tags) {
                $scope.tags = tags;
            });
        };

        // delete a tag
        $scope.deleteTag = function(id) {
            Tags.delete(id)
                // if successful delete, get tags again
                .success(function(data) {
                    $scope.tags = data;
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

        // delete a youtube
        $scope.deleteYoutube = function(id) {
            Youtubes.delete(id)
                // if successful delete, get all youtubes again
                .success(function(data) {
                    $scope.youtubes = data;

                    //in case previously an unfiniished clip creation is still in place, clear its data
                });
        };

        // update a youtube
        $scope.updateYoutube = function(id, validated) {
            Youtubes.put(id, validated)
                // if successful delete, get all youtubes again
                .success(function(data) {
                    $scope.youtubes = data;
                    //in case previously an unfiniished clip creation is still in place, clear its data
                });
        };

    });