<?php
$host   = 'MySQL-5.7';  // Или 'localhost'
$dbname = 'ld_clicker';
$user   = 'root';
$pass   = '';

// Создаем объект MySQLi без указания порта
$conn = new mysqli($host, $user, $pass, $dbname);

// Проверяем успешность соединения
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

echo 'Connected to database successfully!';
