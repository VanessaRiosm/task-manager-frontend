import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {useStore} from '../context/store'
import {getAllTasks} from '../services/tasks'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const formSchema = Yup.object().shape({
  title: Yup.string()
    .required('El titulo es requerido')
    .max(40, 'The title must be maximum 40 characters'),
  description: Yup.string().required('La descripción es requerida'),
})

interface TaskFormProps {
  taskToEdit?: {
    id?: string
    title: string
    description: string
  } | null
  onClose?: () => void
}

const successAddToast = () => {
  toast.success('Tarea agregada con éxito!', {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

const successEditToast = () => {
  toast.success('Tarea editada con éxito!', {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  })
}

export const TaskForm: React.FC<TaskFormProps> = ({taskToEdit, onClose}) => {
  const {addTask, updateTask} = useStore()

  return (
    <div className='flex flex-col items-center'>
      <p className='text-white mt-7 text-xl font-bold'>
        {taskToEdit ? 'EDITAR TAREA' : 'AÑADIR TAREA'} 📌
      </p>
      <Formik
        initialValues={{
          title: taskToEdit?.title || '',
          description: taskToEdit?.description || '',
        }}
        validationSchema={formSchema}
        onSubmit={async (values, {resetForm}) => {
          try {
            if (taskToEdit && taskToEdit.id) {
              await updateTask(taskToEdit.id, {...taskToEdit, ...values})

              successEditToast()
            } else {
              await addTask({
                title: values.title,
                description: values.description,
              })
              successAddToast()
            }

            resetForm()
            getAllTasks()
            if (onClose) onClose()
          } catch (error) {
            if (error instanceof Error) console.error('Error: ', error.message)
          }
        }}
      >
        <div className='flex'>
          <Form>
            <Field
              name='title'
              placeholder='Título'
              type='text'
              className='bg-gray-600 border border-gray-400 text-gray-100 text-sm rounded-lg focus:border-1 focus:outline-none p-2.5 mx-1 placeholder:text-gray-300'
            />

            <Field
              name='description'
              type='text'
              placeholder='Descripción'
              className='bg-gray-600 border border-gray-400 text-gray-100 text-sm rounded-lg focus:border-1 focus:outline-none p-2.5 my-5 mx-1 placeholder:text-gray-300'
            />

            <p className='text-red-400'>
              <ErrorMessage name='title' />
            </p>
            <p className='text-red-400'>
              <ErrorMessage name='description' />
            </p>

            <button
              type='submit'
              className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-transparent focus:outline-none focus:ring-blue-300 my-5'
            >
              {taskToEdit ? 'Editar Tarea' : 'Crear Tarea'}
            </button>
            <div>
              <hr className='h-px my-3 border-0 bg-gray-600' />
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  )
}
