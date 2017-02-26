// js/services/youtubes.js
angular.module('youtubeService', [])
 
    .factory('Youtubes', function($http) {
        return {
            get : function() {
                return $http.get('/api/youtubes');
            },
            create : function(youtubeData) {
                return $http.post('/api/youtube', youtubeData);
            },
            delete : function(id) {
                return $http.delete('/api/youtube/' + id);
            }
        }
    });