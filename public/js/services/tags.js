// js/services/tags.js
angular.module('tagService', [])

    // each function returns a promise object 
    .factory('Tags', function($http) {
        return {
            get : function() {
                return $http.get('/api/tags');
            },
            create : function(tagData) {
                return $http.post('/api/tag', tagData);
            },
            delete : function(id) {
                return $http.delete('/api/tag/' + id);
            }
        }
    });