incidentReporterApp.factory('Incidencias',function ($resource) {
    var resourceUrl = 'api/incidencias/:id';

    return $resource(resourceUrl, {}, {
        'query': { method: 'GET', isArray: true},
        'get': {
            method: 'GET',
            transformRequest: function (data) {
                return angular.toJson(data);
            }
        },
        'update': {
            method: 'PUT',
            transformRequest: function (data) {
                return angular.toJson(data);
            }
        },
        'save': {
            method: 'POST',
            transformRequest: function (data) {
                return angular.toJson(data);
            }
        }
    });
});