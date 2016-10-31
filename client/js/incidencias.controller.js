/**
 * Created by juancho on 22/10/16.
 */
incidentReporterApp.controller('InicidenciasController', function ($scope, Incidencias) {
    Incidencias.query(function (result) {
        $scope.incidencias = result;
        groupMaquinasAndLaboratorios();
    });

    $scope.maquinaFilter = {};
    $scope.busqueda = {};

    $scope.busqueda.falla = {};
    $scope.busqueda.falla.solucion = {};
    $scope.busqueda.falla.solucion.fecha = "!";
    $scope.busqueda.falla.solucion.descripcion = "!";

    $scope.maquinas = [];
    $scope.laboratorios = [];

    var groupMaquinasAndLaboratorios = function () {
        angular.forEach($scope.incidencias, function (incidencia) {
            $scope.maquinas.push({laboratorio: incidencia.laboratorio, maquina: incidencia.maquina});
            var index = $scope.laboratorios.findIndex(function (obj) {
                return obj == incidencia.laboratorio;
            });
            if(index < 0){
                $scope.laboratorios.push(incidencia.laboratorio);
            }
        })
    };

    $scope.mostrarSolucionados = function(){
        if($scope.busqueda.falla.solucion.fecha == "!" && $scope.busqueda.falla.solucion.descripcion == "!"){
            $scope.busqueda.falla.solucion.fecha = undefined;
            $scope.busqueda.falla.solucion.descripcion = undefined;
        }
        else{
            $scope.busqueda.falla.solucion.fecha = "!";
            $scope.busqueda.falla.solucion.descripcion = "!";
        }
    };

    $scope.selectMaquina = function(maquina){
        $scope.busqueda.maquina = maquina;
        if (maquina == null){
            $scope.busqueda.maquina = undefined;
        }
    };

    $scope.selectLaboratorio = function(laboratorio){
        $scope.busqueda.laboratorio = laboratorio;
        $scope.maquinaFilter.laboratorio = laboratorio;
        if (laboratorio == null){
            $scope.busqueda.laboratorio = undefined;
            $scope.maquinaFilter.laboratorio = undefined;
            $scope.busqueda.maquina = undefined;
        }
    };
});