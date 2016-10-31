/**
 * Created by juancho on 22/10/16.
 */
incidentReporterApp.controller('InicidenciasDialogController', function ($scope, $stateParams, $uibModalInstance, Incidencias, entity) {

    $scope.incidencia = entity;

    if($stateParams.id != null){
        entity.$promise.then(function () {
            $scope.incidencia.fecha = $scope.incidencia.fecha.toISOString();
            if($scope.incidencia.falla == undefined)
                $scope.incidencia.falla = {};
            if($scope.incidencia.falla.capturas == undefined)
                $scope.incidencia.falla.capturas = [];
        });
    }

    $scope.maquinas = ["Maquina 1", "Maquina 2", "Maquina 3"];
    $scope.laboratorios = ["Laboratorio 1", "Laboratorio 2", "Laboratorio 3"];

    $scope.selectMaquina = function(maquina){
        $scope.incidencia.maquina = maquina;
    };

    $scope.selectLaboratorio = function(laboratorio){
        $scope.incidencia.laboratorio = laboratorio;
    };

    $scope.eliminarImagen = function(index){
        $scope.incidencia.falla.capturas.splice(index,1);
    };

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
            Incidencias.update({id : $scope.incidencia._id}, $scope.incidencia, onSaveSuccess, onSaveError);
        } else {
            Incidencias.save($scope.incidencia, onSaveSuccess, onSaveError);
        }
    };

    $scope.clear = function() {
        $scope.incidencia._id = null;
        $uibModalInstance.dismiss('cancel');
    };

    $scope.isOpen = false;

    $scope.openCalendar = function(e) {
        e.preventDefault();
        e.stopPropagation();

        $scope.isOpen = true;
    };

    $scope.setImagen = function ($file) {
        if ($file && $file.$error == 'pattern') {
            return;
        }
        if ($file) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL($file);
            fileReader.onload = function (e) {
                var base64Data = e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length);
                $scope.$apply(function() {
                    $scope.incidencia.falla.capturas.push({imagen: base64Data, imagenContentType: $file.type});
                });
            };
        }
    };
});