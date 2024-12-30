import {useState} from 'react'
import {
  IoIosRadioButtonOff,
  IoIosRadioButtonOn,
  IoMdTrash,
} from 'react-icons/io'
import {HiPencil} from 'react-icons/hi'
import {useStore} from '../context/store'
import {Task} from '../services/tasks'
import {TaskForm} from './TaskForm'

type TaskListProps = {
  tasks: Task[]
}

export const TaskList = ({tasks}: TaskListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {deleteTask, selectTask, updateTask} = useStore()
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)

  const handleEditClick = (task: Task) => {
    setTaskToEdit(task)
    toggleModal()
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const toggleCompletion = (task: Task) => {
    const updatedTask = {...task, completed: !task.completed}
    updateTask(task.id ?? '', updatedTask)
  }

  return (
    <div>
      <div>
        <p className='text-white text-[23px] font-bold mt-5'>
          TODAS LAS TAREAS
        </p>
        {tasks && tasks.length > 0 ? (
          tasks.map((todo) => (
            <div
              key={todo.id}
              onClick={() => selectTask(todo)}
              className='flex flex-col items-center m-2'
            >
              <div className='w-full rounded-lg shadow flex h-20 border-slate-800 border-b-2 mb-3'>
                <div className='flex items-center justify-center pr-3 ml-5'>
                  {todo.completed ? (
                    <IoIosRadioButtonOn
                      className='text-[23px] cursor-pointer text-gray-400'
                      onClick={() => toggleCompletion(todo)}
                    />
                  ) : (
                    <IoIosRadioButtonOff
                      className='text-[23px] cursor-pointer text-white'
                      onClick={() => toggleCompletion(todo)}
                    />
                  )}
                </div>

                <div
                  className={todo.completed ? 'line-through text-gray-400' : ''}
                >
                  <div className='max-w-lg flex flex-wrap text-xl font-bold'>
                    <p
                      className={`
                        text-wrap flex-wrap max-h-10 overflow-auto font-normal max-w-20 sm:max-w-32 md:max-w-none
                        ${todo.completed ? 'text-gray-400 ' : 'text-gray-200 '}
                      `}
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#4a4a4a #1a1a1a',
                      }}
                    >
                      {todo.title}
                    </p>
                  </div>

                  <p
                    className={`
                      text-wrap flex-wrap max-h-10 overflow-auto font-normal
                      ${todo.completed ? 'text-gray-400 ' : 'text-gray-200 '}
                    `}
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#4a4a4a #1a1a1a',
                    }}
                  >
                    {todo.description}
                  </p>
                </div>

                <div className='flex justify-center items-center gap-1 ml-auto mr-2'>
                  <HiPencil
                    className='text-[28px] cursor-pointer text-blue-400'
                    onClick={() => handleEditClick(todo)}
                  />

                  <IoMdTrash
                    className='text-3xl cursor-pointer text-red-400'
                    onClick={() => deleteTask(todo.id ?? '')}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='text-white flex flex-col justify-center items-center font-bold'>
            <p>No hay tareas para mostrar.</p>
          </div>
        )}
      </div>

      {isModalOpen && taskToEdit && (
        <div className='fixed inset-0 bg-black bg-opacity-50 w-full h-full z-50 flex items-center justify-center'>
          <div className=' p-6 rounded-2xl shadow-xl bg-[#2e2e2e]'>
            <TaskForm taskToEdit={taskToEdit} onClose={toggleModal} />
            <button
              className='mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg'
              onClick={toggleModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
