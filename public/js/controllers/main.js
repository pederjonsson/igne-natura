
// js/controllers/main.js
angular.module('clipController', [])

    // inject the Clip,Tag service factory into our controller
    .controller('mainController', function($scope, $http, Clips, Tags, Youtubes, Poller, $timeout) {
        

        $scope.resetFormData = function(){
            $scope.formDataForCreatingClip = {
                tags: []
            };
            $scope.tubeKeyForCreatingClip = "";
            $scope.formDataCreateTag = {};
            $scope.formDataCreateYoutube = {};
            $scope.formDataForCreatingClip.violence = false;
            $scope.formDataForCreatingClip.ads = false;
        }
        $scope.resetFormData();

        angular.element(document).ready(function () {
            $scope.startPollingService();
        });

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
                        $scope.updateYoutube($scope.tubeKeyForCreatingClip, true);
                        $scope.resetFormData();
                        $scope.clips = data;
                    });
            }
        };

        // delete a clip
        $scope.deleteClip = function(clipId, youtubeId) {
            console.log("delete attempt clipId = " + clipId + " youtubeId = " + youtubeId);
            Clips.delete(clipId)
                // if successful creation, get all the new clips
                .success(function(data) {
                    $scope.clips = data;

                    for (var key in $scope.youtubes) {
                        if (!$scope.youtubes.hasOwnProperty(key)) continue;
                        if($scope.youtubes[key].youtubeId == youtubeId){
                            var tube = $scope.youtubes[key];
                            console.log("foundit");
                            $scope.updateYoutube(key, false);
                            break;
                        }
                    }
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
        //hms should look like: '02:04:33';
        getTimeInSeconds = function (hms){
            var a = hms.split(':');
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            return seconds;
        }

        $scope.createYoutube = function() {

            if($scope.formDataCreateYoutube.time !== undefined){
                $scope.formDataCreateYoutube.time = getTimeInSeconds($scope.formDataCreateYoutube.time);
            }
            Youtubes.create($scope.formDataCreateYoutube)
                .success(function(youtubes) {
                    $scope.resetFormData();
                    $scope.youtubes = youtubes; // assign new list of youtubes
                });
        };

        $scope.getYoutube = function() {
            Youtubes.get()
            .success(function(youtubes) {
                //TODO: is this function needed?
               //console.log("original youtubes = ", youtubes)
            });
        };

        $scope.startPollingService = function (){
            (function tick() {
                Poller.getYoutubes().success(function(youtubes){
                    console.log("got poll result youtubes: ", youtubes);
                    $scope.youtubes = youtubes;
                    $timeout(tick, 5000);
                });
            })();
        }

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

            Youtubes.getByKey($scope.tubeKeyForCreatingClip).success(function(tubeObj){
                console.log("tubeobj received: ", tubeObj);
                $scope.formDataForCreatingClip.youtubeId = tubeObj.value.youtubeId;
                $scope.formDataForCreatingClip.originalTitle = tubeObj.value.originalTitle;
                $scope.formDataForCreatingClip.time = tubeObj.value.time;
            });

           /* var tubeObj = $scope.youtubes[$scope.tubeKeyForCreatingClip];
            $scope.formDataForCreatingClip.youtubeId = tubeObj.youtubeId;
            $scope.formDataForCreatingClip.originalTitle = tubeObj.originalTitle;
            $scope.formDataForCreatingClip.time = tubeObj.time;*/
        };

    });