
// js/controllers/main.js
angular.module('moduleApp', [])

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

        var youtubePolling;
        var tagPolling;
        var clipPolling;
        $scope.startPollingService = function (){
            if(youtubePolling === undefined){
                var tickTube = function tickTube() {
                    youtubePolling = $timeout(tickTube, 5000);
                    Poller.getYoutubes().success(function(youtubes){
                        $scope.youtubes = youtubes;
                    });
                }();
            }
            
            if(tagPolling === undefined){
                var tickTag = function tickTag() {
                    tagPolling = $timeout(tickTag, 5000);
                    Poller.getTags().success(function(tags){
                        $scope.tags = tags;
                        
                    });
                }();
            }

            if(clipPolling === undefined){
                var tickClip = function tickClip() {
                    clipPolling = $timeout(tickClip, 5000);
                    Poller.getClips().success(function(clips){
                        console.log("got poll result clips: ", clips);
                        $scope.clips = clips;
                        
                    });
                }();
            }


        }

        $scope.stopPollingService = function (){
            if(youtubePolling !== undefined){
                $timeout.cancel(youtubePolling);
            }
            if(tagPolling !== undefined){
                $timeout.cancel(tagPolling);    
            }
            if(clipPolling !== undefined){
                $timeout.cancel(clipPolling);    
            }
            youtubePolling = undefined;
            tagPolling = undefined;
            clipPolling = undefined;
        }

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
            Clips.delete(clipId)
                .success(function(data) {
                    $scope.clips = data;

                    //update the validated prop on the referenced youtube that was in the clip
                    for(var i = 0; i < $scope.youtubes.length; i++){
                        if($scope.youtubes[i].value.youtubeId === youtubeId){
                            $scope.updateYoutube($scope.youtubes[i].key, false);
                        }
                    }
                });
        };


        //TAGS
        $scope.createTag = function() {
            Tags.create($scope.formDataCreateTag)
                .success(function(tags) {
                    $scope.resetFormData();
                    $scope.tags = tags;
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
            });
        };

        $scope.deleteYoutube = function(id) {
            Youtubes.delete(id)
                .success(function(data) {
                    $scope.youtubes = data;
                });
        };

        $scope.updateYoutube = function(id, validated) {
            Youtubes.put(id, validated)
                .success(function(data) {
                    $scope.youtubes = data;
                });
        };

        $scope.updateCreateClipFormWithYoutubeData = function(){
            console.log("updateCreateClipFormWithYoutubeData");
            Youtubes.getByKey($scope.tubeKeyForCreatingClip).success(function(tubeObj){
                console.log("tubeobj received: ", tubeObj);
                $scope.formDataForCreatingClip.youtubeId = tubeObj.value.youtubeId;
                $scope.formDataForCreatingClip.originalTitle = tubeObj.value.originalTitle;
                $scope.formDataForCreatingClip.time = tubeObj.value.time;
            });
        };



    }).directive('youtubedirective', function () {
      return {
        restrict: 'A',
        replace: true,
        templateUrl:'../../templates/youtubetemplate.html'
      };
    }).directive('menudirective', function () {
      return {
        restrict: 'A',
        replace: true,
        templateUrl:'../../templates/menutemplate.html'
      };
    }).directive('clipsdirective', function () {
      return {
        restrict: 'A',
        replace: true,
        templateUrl:'../../templates/cliptemplate.html'
      };
    }).directive('tagsdirective', function () {
      return {
        restrict: 'A',
        replace: true,
        templateUrl:'../../templates/tagtemplate.html'
      };
    });
