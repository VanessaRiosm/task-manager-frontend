import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  ReactNode,
} from 'react'
import {tasksReducer} from './Reducers'

interface Task {
  id: string
  title: string
  completed: boolean
  category: string
}

interface TasksState {
  tasks: Task[]
}

type TaskActions =
  | {type: 'ADD_TASK'; payload: Task}
  | {type: 'TOGGLE_TASK'; payload: string}
  | {type: 'REMOVE_TASK'; payload: string}

interface GlobalContextType {
  tasksState: TasksState
  tasksDispatch: React.Dispatch<TaskActions>
  query: string
  setQuery: (query: string) => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalContextProvider = ({children}: {children: ReactNode}) => {
  const [tasksState, tasksDispatch] = useReducer(tasksReducer, {tasks: []})
  const [query, setQuery] = useState<string>('')

  return (
    <GlobalContext.Provider
      value={{tasksState, tasksDispatch, query, setQuery}}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
