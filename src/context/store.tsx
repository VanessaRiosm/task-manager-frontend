import {create} from 'zustand'
import {
  addTask,
  deleteTask,
  getAllTasks,
  Task,
  updateTask,
} from '../services/tasks'

type Store = {
  tasks: Task[]
  selectedTask: Task | null
  addTask: (task: Task) => Promise<void>
  getAllTasks: () => Promise<void>
  updateTask: (id: string, updatedTask: Task) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  selectTask: (task: Task) => void
  clearSelectedTask: () => void
}

export const useStore = create<Store>((set) => ({
  tasks: [],
  selectedTask: null,

  getAllTasks: async () => {
    try {
      const savedTasks = await getAllTasks()
      set({tasks: savedTasks})
    } catch (error) {
      console.error('Error al agregar la tarea:', error)
    }
  },

  addTask: async (newTask) => {
    try {
      const savedTask = await addTask(newTask)
      set((state) => ({
        tasks: [...state.tasks, savedTask],
      }))
    } catch (error) {
      console.error('Error al agregar la tarea:', error)
    }
  },

  updateTask: async (id, updatedTask) => {
    try {
      const taskToUpdate = {_id: id, ...updatedTask}
      const updated = await updateTask(taskToUpdate)

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === updated.id ? {...task, ...updatedTask} : task
        ),
        selectedTask: updatedTask,
      }))
    } catch (error) {
      console.error('Error al actualizar la tarea:', error)
    }
  },

  deleteTask: async (id: string) => {
    try {
      await deleteTask(id)
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }))
    } catch (error) {
      console.error('Error al eliminar la tarea:', error)
    }
  },

  selectTask: (task: Task) => {
    set({selectedTask: task})
  },

  clearSelectedTask: () => {
    set({selectedTask: null})
  },
}))
