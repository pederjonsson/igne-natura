// js/services/todos.js
angular.module('clipService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Clips', function($http) {
        return {
            get : function() {
                return $http.get('/api/clips');
            },
            create : function(clipsData) {
                return $http.post('/api/clip', clipsData);
            },
            delete : function(id) {
                console.log("delete attempt 2 id = " + id);
                return $http.delete('/api/clip/' + id);
            }
        }
    });