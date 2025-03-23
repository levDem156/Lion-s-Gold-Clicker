document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    // Получаем данные из формы
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Формируем данные для отправки
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    try {
        // Отправляем данные на сервер
        const response = await fetch('https://clicker.local/db/register.php', {
            method: 'POST',
            body: formData,
        });

        const text = await response.text();

        // Отображаем сообщение о результате
        document.getElementById('message').innerText = text;
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        document.getElementById('message').innerText = 'Ошибка регистрации';
    }
});