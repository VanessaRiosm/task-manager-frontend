export const tasksReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Math.floor(Math.random() * 1000),
            text: action.payload,
            isCompleted: false,
          },
        ],
      }

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task: any) => task.id !== action.payload.id),
      }

    case 'TOGGLE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map((task: any) => {
          if (task.id !== action.payload.id) {
            return task
          }
          return {...task, isCompleted: !task.isCompleted}
        }),
      }

    default:
      return state
  }
}
