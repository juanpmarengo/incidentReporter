/**
 * Created by juancho on 24/10/16.
 */
incidentReporterApp.controller('InicidenciasSolucionDialogController', function ($stateParams, $scope, $uibModalInstance, Incidencias, entity) {

    $scope.incidencia = entity;

    entity.$promise.then(function () {
        if($scope.incidencia.falla.solucion == undefined)
            $scope.incidencia.falla.solucion = {};
    });

    var onSaveSuccess = function (result) {
        $scope.$emit('incidentReporterApp:incidenciaUpdate', result);
        $uibModalInstance.close(result);
        $scope.isSaving = false;
    };

    var onSaveError = function () {
        $scope.isSaving = false;
    };

    $scope.save = function () {
        $scope.isSaving = true;
        if ($scope.incidencia._id != null) {
            Incidencias.update({id: $scope.incidencia._id}, $scope.incidencia, onSaveSuccess, onSaveError);
        }
    };

    $scope.clear = function() {
        $scope.incidencia._id = null;
        $scope.incidencia.laboratorio = null;
        $scope.incidencia.maquina = null;
        $scope.incidencia.falla.capturas = [];
        $scope.incidencia.falla.codigo = null;
        $scope.incidencia.falla.condiciones = null;
        $scope.incidencia.falla.descripcion = null;
        $scope.incidencia.falla.estado = null;
        $scope.incidencia.falla.fecha = null;
        $scope.incidencia.falla.sistemaOperativo= {comentario: null, nombre: null, virtual: null};
        $scope.incidencia.falla.solucion = {descripcion: null, fecha: null};

        $uibModalInstance.dismiss('cancel');
    };

    $scope.isOpen = false;

    $scope.openCalendar = function(e) {
        e.preventDefault();
        e.stopPropagation();

        $scope.isOpen = true;
    };
});