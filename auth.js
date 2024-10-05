const users = [
    { username: 'usuario1', password: 'password1' },
    { username: 'usuario2', password: 'password2' }
];

function checkCredentials(username, password) {
    return users.some(user => user.username === username && user.password === password);
}

module.exports = { checkCredentials };
