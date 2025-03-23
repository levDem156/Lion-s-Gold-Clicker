<?php
session_start();
require 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

// Получаем данные пользователя из базы
$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user) {
    echo json_encode([
        'status' => 'success',
        'user' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'username' => $user['username'],
            'last_activity' => $user['last_activity'] // Пример поля
        ]
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
}
?>
