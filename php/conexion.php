<?php

$host = "localhost"; // Cambia a la dirección del servidor en producción
$user = "root"; // Cambia si tienes un usuario diferente
$password = ""; // Cambia por la contraseña del usuario de la base de datos
$dbname = "paginaweb"; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "Conexión exitosa!";
?>
