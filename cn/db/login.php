<?php
require 'db.php';

$email = $_POST['email'];
$password = $_POST['password'];

// Ищем пользователя
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) {
    die("Пользователь не найден");
}

$user = $result->fetch_assoc();

// Проверяем пароль
if (password_verify($password, $user['password_hash'])) {
    echo json_encode(["status" => "success", "user_id" => $user['id']]);
} else {
    echo "Неверный пароль";
}
?>