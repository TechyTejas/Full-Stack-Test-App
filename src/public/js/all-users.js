const alertBox = document.getElementById('alert');
const loadingEl = document.getElementById('loading');
const emptyEl = document.getElementById('empty');
const table = document.getElementById('users-table');
const tbody = document.getElementById('users-body');

function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = `alert show ${type}`;
}

function renderUsers(users) {
    tbody.innerHTML = '';

    if (!users.length) {
        table.style.display = 'none';
        emptyEl.style.display = 'block';
        return;
    }

    emptyEl.style.display = 'none';
    table.style.display = 'table';

    users.forEach((user) => {
        const tr = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.innerHTML = `<span class="pill">#${user.id}</span>`;

        const nameCell = document.createElement('td');
        nameCell.textContent = user.name;

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;

        const actionCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-danger';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteUser(user.id, tr));
        actionCell.appendChild(deleteBtn);

        tr.append(idCell, nameCell, emailCell, actionCell);
        tbody.appendChild(tr);
    });
}

async function loadUsers() {
    loadingEl.style.display = 'block';
    table.style.display = 'none';
    emptyEl.style.display = 'none';

    try {
        const res = await fetch('/users');
        if (!res.ok) {
            throw new Error('Failed to fetch users');
        }
        const users = await res.json();
        renderUsers(users);
    } catch (err) {
        showAlert(err.message || 'Something went wrong', 'error');
    } finally {
        loadingEl.style.display = 'none';
    }
}

async function deleteUser(id, row) {
    if (!confirm('Delete this user?')) {
        return;
    }

    try {
        const res = await fetch(`/users/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            throw new Error('Failed to delete user');
        }
        row.remove();
        showAlert('User deleted successfully.', 'success');
        if (!tbody.children.length) {
            table.style.display = 'none';
            emptyEl.style.display = 'block';
        }
    } catch (err) {
        showAlert(err.message || 'Something went wrong', 'error');
    }
}

loadUsers();
