<?php

include './Classes/Sunat.php';

/**
 * Aun no se usa :D y no se usara  🤷‍♀️
 * se esta usando una API
 */


extract($_POST);

$PETICION = $_GET['peticion'];
$descripcion = $_GET['descripcion'];
$RUC = $_GET['ruc'];
$DNI = $_GET['dni'];

$RESPUESTA = [];

switch ($PETICION) {

    case 'SUNAT':
        $SUNAT = new Sunat;

        if ($descripcion == 'RUC')
            
            $RESPUESTA_CONSULTA =  $SUNAT->consultaRucSunat($RUC);
            $RESPUESTA = ['Response' => $RESPUESTA_CONSULTA];

        if ($descripcion == 'DNI')

            $RESPUESTA_CONSULTA = $SUNAT->consultaDniSunat($DNI);
            $RESPUESTA = ['Response' => $RESPUESTA_CONSULTA];

        break;

    case 'IP':

        function getPrivateIP() {
            return getHostByName(getHostName());
        }
        
        echo getPrivateIP();

        break;

    default:
        # code...
        break;
}


echo json_encode($RESPUESTA);
