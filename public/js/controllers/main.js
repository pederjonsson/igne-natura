
// js/controllers/main.js
angular.module('clipController', [])

    // inject the Clip,Tag service factory into our controller
    .controller('mainController', function($scope, $http, Clips, Tags, Youtubes) {
        

        $scope.resetFormData = function(){
            $scope.formDataForCreatingClip = {
                tags: []
            };
            $scope.tubeIdForCreatingClip = "";
            $scope.formDataCreateTag = {};
            $scope.formDataCreateYoutube = {};
        }
        $scope.resetFormData();

        //hides all sections on page
        $scope.hideAll = function() {
            $scope.showClips = false;
            $scope.showCreateClips = false;
            $scope.showCreateTag = false;
            $scope.showCreateYoutube = false;
            $scope.showYoutube = false;
            $scope.showTags = false;
        };
        $scope.hideAll();

        // CLIPS ==============================
        //get
        $scope.getClips = function() {
            Clips.get()
            .success(function(data) {
                $scope.clips = data;
            });
        };

        // create
        $scope.createClip = function() {
            if (!$.isEmptyObject($scope.formDataForCreatingClip)) {
                Clips.create($scope.formDataForCreatingClip)
                    .success(function(data) {
                        $scope.updateYoutube($scope.tubeIdForCreatingClip, true);
                        $scope.resetFormData();
                        $scope.clips = data;
                    });
            }
        };

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
                    $scope.resetFormData();
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
                    $scope.resetFormData();
                    $scope.youtubes = youtubes; // assign new list of youtubes
                });
        };

        $scope.setUnvalidatedTubes = function(){

            $scope.unvalidatedTubes = $scope.youtubes;

            for (var key in $scope.unvalidatedTubes) {
                // skip loop if the property is from prototype
                if (!$scope.unvalidatedTubes.hasOwnProperty(key)) continue;

                var tube = $scope.unvalidatedTubes[key];
                if(tube.validated){
                    delete $scope.unvalidatedTubes[key];
                }
            }
        };

        $scope.getYoutube = function() {
            Youtubes.get()
            .success(function(youtubes) {
                $scope.youtubes = youtubes;
                $scope.setUnvalidatedTubes();
            });
        };

        // delete a youtube
        $scope.deleteYoutube = function(id) {
            Youtubes.delete(id)
                // if successful delete, get all youtubes again
                .success(function(data) {
                    $scope.youtubes = data;
                });
        };

        // update a youtube
        $scope.updateYoutube = function(id, validated) {
            Youtubes.put(id, validated)
                // if successful delete, get all youtubes again
                .success(function(data) {
                    $scope.youtubes = data;
                });
        };

        $scope.updateCreateClipFormWithYoutubeData = function(){
            var tubeObj = $scope.youtubes[$scope.tubeIdForCreatingClip];
            $scope.formDataForCreatingClip.youtubeId = $scope.tubeIdForCreatingClip;
            $scope.formDataForCreatingClip.originalTitle = tubeObj.originalTitle;
        };

    });