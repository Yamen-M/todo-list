export const saveStateToLocalStorage = (state) => {
    localStorage.setItem('todoData', JSON.stringify(state));
}

export const loadStateFromLocalStorage = (state) => {
    const savedData = JSON.parse(localStorage.getItem('todoData'));
    return savedData ? savedData : null;
}