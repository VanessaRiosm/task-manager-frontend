import {useState, useEffect} from 'react'
import FilterBar from './FilterBar'
import {TaskForm} from './TaskForm'
import {TaskList} from './TaskList'
import {IoIosAddCircleOutline} from 'react-icons/io'
import TaskDetails from './TaskDetail'
import {useStore} from '../context/store'
import {ToastContainer} from 'react-toastify'

const Home = () => {
  const {tasks, getAllTasks} = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const filterTasks = (filter: 'all' | 'pending' | 'completed') => {
    let filteredTasks = tasks
    if (filter === 'pending') {
      filteredTasks = tasks.filter((task) => !task.completed)
    } else if (filter === 'completed') {
      filteredTasks = tasks.filter((task) => task.completed)
    }
    return filteredTasks
  }

  const filteredTasks = filterTasks(filter)

  useEffect(() => {
    if (!tasks.length) {
      getAllTasks()
    }
  }, [tasks, getAllTasks])

  return (
    <div className='flex-1 flex-col w-full sm:flex sm:flex-row min-h-screen justify-between'>
      <div className='w-full sm:w-auto text-white flex justify-center items-center my-10 sm:my-0'>
        <ToastContainer />
        <FilterBar setFilter={setFilter} />
      </div>
      <div className='flex justify-center items-start'>
        <div>
          <TaskList tasks={filteredTasks} />
        </div>
      </div>
      <div className='mr-10'>
        <TaskDetails />
      </div>
      <div className='absolute bottom-28 lg:right-96 right-10'>
        <button
          onClick={toggleModal}
          className='px-4 py-2 text-white rounded-full'
        >
          {isModalOpen ? (
            'Cancelar'
          ) : (
            <div>
              <IoIosAddCircleOutline className='flex items-center gap-2 rounded-md w-full justify-start size-14 text-blue-500' />
              Agregar
            </div>
          )}
        </button>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 w-full h-full z-50 flex items-center justify-center'>
          <div className='p-6 rounded shadow-xl bg-[#2e2e2e]'>
            <TaskForm onClose={toggleModal} />
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

export default Home
