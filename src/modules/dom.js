export const showAddProjectForm = () => {
    document.getElementById('addProjectFormContainer').style.display = 'flex';
};

export const hideAddProjectForm = () => {
    document.getElementById('addProjectFormContainer').style.display = 'none';
};

export const showAddTodoForm = () => {
    document.getElementById('addTodoFormContainer').style.display = 'flex';
};

export const hideAddTodoForm = () => {
    document.getElementById('addTodoFormContainer').style.display = 'none';
};

export const showEditProjectForm = (project) => {
    document.getElementById('editProjectName').value = project.name;
    document.getElementById('editProjectForm').dataset.projectId = project.id;
    document.getElementById('editProjectFormContainer').style.display = 'flex';
};

export const hideEditProjectForm = () => {
    document.getElementById('editProjectFormContainer').style.display = 'none';
};

export const showEditTodoForm = (todo) => {
    document.getElementById('editTodoTitle').value = todo.title;
    document.getElementById('editTodoDescription').value = todo.description;
    document.getElementById('editTodoDueDate').value = todo.dueDate;
    document.getElementById('editTodoPriority').value = todo.priority;
    document.getElementById('editTodoForm').dataset.todoId = todo.id;
    document.getElementById('editTodoFormContainer').style.display = 'flex';
};

export const hideEditTodoForm = () => {
    document.getElementById('editTodoFormContainer').style.display = 'none';
};

export const renderSidebar = (projects, currentProjectId, onAddProject, onProjectClick, onDeleteProject) => {
    const sidebarContainer = document.getElementById('sidebarContainer');
    sidebarContainer.innerHTML = `
        <div class="sidebar-header">
            <h2>Projects</h2>
            <button id="addProjectBtn" class="btn-icon">+</button>
        </div>
        <ul id="projectsList">
            ${projects.map(project => `
                <li class="project-item ${project.id === currentProjectId ? 'active' : ''}" data-id="${project.id}">
                    <span>${project.name}</span>
                    <div class="project-actions">
                        <button class="delete-project-btn" data-id="${project.id}">Delete</button>
                    </div>
                </li>
            `).join('')}
        </ul>
    `;

    document.getElementById('addProjectBtn').addEventListener('click', onAddProject);
    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-project-btn')) {
                onDeleteProject(item.getAttribute('data-id'));
            } else {
                onProjectClick(item.getAttribute('data-id'));
            }
        });
    });
};

export const renderMainContent = (project, onAddTodo, onToggleComplete, onEditTodo, onDeleteTodo) => {
    const mainContainer = document.getElementById('mainContainer');
    if (!project) {
        mainContainer.innerHTML = '<p>Select a project to view todos</p>';
        return;
    }

    mainContainer.innerHTML = `
        <div class="current-project-header">
            <h1>${project.name}</h1>
            <button id="addTodoBtn" class="btn-primary">Add Todo</button>
        </div>
        <div id="todosContainer">
            ${project.todos.length === 0 ? '<p>No todos in this project</p>' : project.todos.map(todo => `
                <div class="todo-card ${todo.priority} ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                    <div class="todo-header">
                        <h3>${todo.title}</h3>
                        <span class="todo-due-date">${todo.dueDate}</span>
                    </div>
                    <div class="priority-badge priority-${todo.priority}">${todo.priority}</div>
                    <p class="todo-description">${todo.description}</p>
                    <div class="todo-actions">
                        <label class="checkbox-container">
                            <input type="checkbox" class="todo-checkbox" data-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
                            <span class="checkmark"></span>
                        </label>
                        <button class="edit-todo-btn" data-id="${todo.id}">Edit</button>
                        <button class="delete-todo-btn" data-id="${todo.id}">Delete</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('addTodoBtn').addEventListener('click', onAddTodo);

    document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const todoId = event.target.getAttribute('data-id');
            onToggleComplete(todoId);
        });
    });

    document.querySelectorAll('.edit-todo-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const todoId = event.target.getAttribute('data-id');
            onEditTodo(todoId);
        });
    });

    document.querySelectorAll('.delete-todo-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const todoId = event.target.getAttribute('data-id');
            onDeleteTodo(todoId);
        });
    });
};
