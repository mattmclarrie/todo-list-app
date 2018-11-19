// Fetch existing todos from local storage
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return todos = JSON.parse(todosJSON)
    } else {
        return []
    }
}

// Save todos to local storage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//  Render application todods based on filters
const renderTodos = function (todos, filters) {
    let filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    filteredTodos = filteredTodos.filter(function (todo) {
        if (filters.hideCompleted) {
            return !todo.completed
        } else {
            return true
        }
    })

    const stillToDo = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''

    document.querySelector('#todos').appendChild(generateSummaryDOM(stillToDo))

    filteredTodos.forEach(function (todo) {
        
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
    const summary = document.createElement('p')
    summary.textContent = todo.text
    return summary
}

// Get the DOM elements for list summary
const generateSummaryDOM = function (stillToDo) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${stillToDo.length} left to do.`
    return summary
}