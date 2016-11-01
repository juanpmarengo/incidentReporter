incidentReporterApp.controller('IncidenciasDeleteDialogController', function ($scope, $stateParams, Incidencias, $uibModalInstance) {
	$scope.clear = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.confirmDelete = function () {
        Incidencias.delete({id: $stateParams.id},function () {
            $uibModalInstance.close(true);
        });
    };
});