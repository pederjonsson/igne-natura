// js/services/youtubes.js
angular.module('youtubeService', [])
 
    .factory('Youtubes', function($http) {
        return {
            get : function() {
                return $http.get('/api/youtubes');
            },
            getByKey : function(key) {
                return $http.get('/api/youtube/' + key);
            },
            create : function(youtubeData) {
                return $http.post('/api/youtube', youtubeData);
            },
            delete : function(id) {
                return $http.delete('/api/youtube/' + id);
            },
            put : function(id, validated){
                return $http.put('/api/youtube/' + id + '/'+ validated);
            }
        }
    });