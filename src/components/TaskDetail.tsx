import {useStore} from '../context/store'
import {HiOutlineCursorClick} from 'react-icons/hi'
import {IoCloseSharp} from 'react-icons/io5'

const TaskDetails = () => {
  const {selectedTask, clearSelectedTask} = useStore()

  return (
    <div className='hidden lg:flex h-full w-[300px] pt-4 justify-center items-center rounded-lg text-white shadow-lg'>
      {selectedTask ? (
        <div className='h-full w-full p-5'>
          <div className='flex justify-end'>
            <IoCloseSharp
              className='text-xl cursor-pointer'
              onClick={clearSelectedTask}
            />
          </div>
          <h2 className='text-lg mb-5 font-semibold'>Mas detalles</h2>
          <p className='text-sm font-semibold flex justify-start'>Titulo:</p>
          <hr className='mb-4 border-gray-600 w-32 flex' />
          <h3 className='text-2xl font-bold mb-10'>{selectedTask.title}</h3>
          <p className='text-sm font-semibold flex justify-start'>
            Descripción:
          </p>
          <hr className='mb-4 border-gray-600 w-32 flex' />
          <p className='text-gray-300 mb-4'>{selectedTask.description}</p>

          <p className='text-sm font-semibold flex justify-start mt-10'>
            Estado:
          </p>
          <hr className='mb-4 border-gray-600 w-32 flex' />
          <div className='flex justify-between items-center mb-4'>
            <p
              className={`font-bold text-lg ${
                selectedTask.completed ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {selectedTask.completed ? 'Completada' : 'Pendiente'}
            </p>
          </div>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center text-center text-gray-300'>
          <HiOutlineCursorClick className='text-5xl mb-4' />
          <p className='text-lg font-semibold'>
            Da clic en una tarea para verla mejor.
          </p>
        </div>
      )}
    </div>
  )
}

export default TaskDetails
