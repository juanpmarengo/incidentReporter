var incidentReporterApp = angular.module('incidentReporterApp', ['angular-loading-bar', 'ui.router', 'ngResource', 'ngFileUpload', 'ngAnimate', 'ui.bootstrap', 'ui.bootstrap.datetimepicker']);

incidentReporterApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        views: {
            'content@': {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            }
        }
    })
    .state('incidencias', {
        url: '/incidencias',
        views: {
            'content@': {
                templateUrl: 'views/incidencias.html',
                controller: 'InicidenciasController'
            }
        }
    })
    .state('incidencias.new', {
        parent: 'incidencias',
        url: '/new',
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
            $uibModal.open({
                templateUrl: 'views/incidencias-dialog.html',
                controller: 'InicidenciasDialogController',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    entity: function () {
                        return {
                            _id : null,
                            laboratorio : null,
                            maquina : null,
                            falla : {
                                capturas: [],
                                codigo: null,
                                condiciones: null,
                                descripcion: null,
                                estado: null,
                                sistemaOperativo: {comentario: null, nombre: null, virtual: null},
                                solucion: {
                                    fecha: null,
                                    descripcion: null
                                }
                            }
                        };
                    }
                }
            }).result.then(function() {
                $state.go('incidencias', null, { reload: true });
            }, function() {
                $state.go('incidencias');
            });
        }]
    })
    .state('incidencias.edit', {
        parent: 'incidencias',
        url: '/edit/{id}',
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
            $uibModal.open({
                templateUrl: 'views/incidencias-dialog.html',
                controller: 'InicidenciasDialogController',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    entity: function (Incidencias) {
                        return Incidencias.get({id : $stateParams.id});
                    }
                }
            }).result.then(function() {
                $state.go('incidencias', null, { reload: true });
            }, function() {
                $state.go('incidencias');
            });
        }]
    })
    .state('incidencias.delete', {
        parent: 'incidencias',
        url: '/delete/{id}',
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
            $uibModal.open({
                templateUrl: 'views/incidencias-delete-dialog.html',
                controller: 'IncidenciasDeleteDialogController',
                backdrop: 'static',
                size: 'md',
                resolve: {
                    entity: function (Incidencias) {
                        return Incidencias.get({id : $stateParams.id});
                    }
                }
            }).result.then(function() {
                $state.go('incidencias', null, { reload: true });
            }, function() {
                $state.go('incidencias');
            });
        }]
    })
    .state('incidencias.solucion', {
        parent: 'incidencias',
        url: '/solucion/{id}',
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
            $uibModal.open({
                templateUrl: 'views/incidencias-solucion-dialog.html',
                controller: 'InicidenciasSolucionDialogController',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    entity: function (Incidencias) {
                        return Incidencias.get({id : $stateParams.id});
                    }
                }
            }).result.then(function() {
                $state.go('incidencias', null, { reload: true });
            }, function() {
                $state.go('incidencias');
            });
        }]
    });

    $locationProvider.html5Mode(true);
});