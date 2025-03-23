<?php
require 'db.php';

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

// Проверяем, существует ли пользователь
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    die("Пользователь уже существует");
}

// Хэшируем пароль
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

// Добавляем пользователя в базу данных
$stmt = $conn->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $passwordHash);
if ($stmt->execute()) {
    echo "Пользователь зарегистрирован";
} else {
    echo "Ошибка: " . $conn->error;
}

// Закрываем соединение, когда закончим
$conn->close();
?>