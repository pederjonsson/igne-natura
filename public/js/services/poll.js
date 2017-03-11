// js/services/tags.js
angular.module('pollService', [])



    .factory('Poller', function($http) {

        return {
            getYoutubes : function() {
                return $http.get('api/poll/youtubes')
            }
        }
    });
