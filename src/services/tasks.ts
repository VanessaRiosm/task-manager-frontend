export type Task = {
  id?: string
  title: string
  description: string
  completed?: boolean
}
const URL = import.meta.env.VITE_URL

export const getAllTasks = async () => {
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Error al traer las tareas')
  }

  return response.json()
}

export const addTask = async (task: Task): Promise<Task> => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error('Error al agregar la tarea')
  }

  return response.json()
}

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${URL}/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error('Error al actualizar la tarea')
  }

  return response.json()
}

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Error al eliminar la tarea')
  }
}
