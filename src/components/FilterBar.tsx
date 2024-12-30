// import {useState} from 'react'
// import {CiBoxList} from 'react-icons/ci'
// import {MdPendingActions, MdDone} from 'react-icons/md'

// type FilterBarProps = {
//   setFilter: React.Dispatch<
//     React.SetStateAction<'all' | 'pending' | 'completed'>
//   >
// }

// const FilterBar = ({setFilter}: FilterBarProps) => {
//   const [filter, setFilterState] = useState<'all' | 'pending' | 'completed'>(
//     'all'
//   )

//   const handleFilterChange = (filterType: 'all' | 'pending' | 'completed') => {
//     setFilterState(filterType)
//     setFilter(filterType)
//   }

//   return (
//     <div className='bg-[#2e2e2e] h-screen rounded-2xl'>
//       <h2 className='text-lg text-gray-200 font-bold mb-5 pt-5'>Filtrar por</h2>
//       <hr className='border-gray-600 w-[90%] mx-5 mb-5' />
//       <ul>
//         <li>
//           <button
//             onClick={() => handleFilterChange('all')}
//             className={`flex items-center gap-2 py-2 px-4 rounded-md w-full justify-start ${
//               filter === 'all'
//                 ? 'bg-blue-600 text-white'
//                 : 'hover:bg-blue-700 text-white-400'
//             }`}
//           >
//             <CiBoxList className='text-xl' />
//             <span className='ml-2'>Todas</span>
//           </button>
//         </li>
//         <li>
//           <button
//             onClick={() => handleFilterChange('pending')}
//             className={`flex items-center gap-2 py-2 px-4 rounded-md w-full justify-start ${
//               filter === 'pending'
//                 ? 'bg-blue-600 text-white'
//                 : 'hover:bg-blue-700 text-white-400'
//             }`}
//           >
//             <MdPendingActions className='text-xl text-yellow-300' />
//             <span className='ml-2'>Pendientes</span>
//           </button>
//         </li>
//         <li>
//           <button
//             onClick={() => handleFilterChange('completed')}
//             className={`flex items-center gap-2 py-2 px-4 rounded-md w-full justify-start ${
//               filter === 'completed'
//                 ? 'bg-blue-600 text-white'
//                 : 'hover:bg-blue-700 text-white-400'
//             }`}
//           >
//             <MdDone className='text-xl text-green-400' />
//             <span className='ml-2'>Completadas</span>
//           </button>
//         </li>
//       </ul>
//     </div>
//   )
// }

// export default FilterBar

import {useState} from 'react'
import {CiBoxList} from 'react-icons/ci'
import {MdPendingActions, MdDone} from 'react-icons/md'

type FilterBarProps = {
  setFilter: React.Dispatch<
    React.SetStateAction<'all' | 'pending' | 'completed'>
  >
}

const FilterBar = ({setFilter}: FilterBarProps) => {
  const [filter, setFilterState] = useState<'all' | 'pending' | 'completed'>(
    'all'
  )

  const handleFilterChange = (filterType: 'all' | 'pending' | 'completed') => {
    setFilterState(filterType)
    setFilter(filterType)
  }

  return (
    <div>
      <div className='bg-[#2e2e2e] p-4 rounded-2xl sm:hidden w-72 sm:w-[300px]'>
        <h2 className='text-lg text-gray-200 font-bold mb-3'>Filtrar por</h2>
        <select
          value={filter}
          onChange={(e) =>
            handleFilterChange(
              e.target.value as 'all' | 'pending' | 'completed'
            )
          }
          className='bg-gray-800 text-white p-2 rounded-md w-full '
        >
          <option value='all'>Todas</option>
          <option value='pending'>Pendientes</option>
          <option value='completed'>Completadas</option>
        </select>
      </div>

      {/* Filter bar for larger screens */}
      <div className='hidden sm:block bg-[#2e2e2e] h-screen rounded-2xl sm:w-64'>
        <h2 className='text-lg text-gray-200 font-bold mb-5 pt-5'>
          Filtrar por
        </h2>
        <hr className='border-gray-600 w-[90%] mx-5 mb-5' />
        <ul>
          <li>
            <button
              onClick={() => handleFilterChange('all')}
              className={`flex items-center gap-2 py-2 px-4 rounded-md w-full justify-start ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-700 text-white-400'
              }`}
            >
              <CiBoxList className='text-xl' />
              <span className='ml-2'>Todas</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterChange('pending')}
              className={`flex items-center gap-2 py-2 px-4 rounded-md w-full justify-start ${
                filter === 'pending'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-700 text-white-400'
              }`}
            >
              <MdPendingActions className='text-xl text-yellow-300' />
              <span className='ml-2'>Pendientes</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterChange('completed')}
              className={`flex items-center gap-2 py-2 px-4 rounded-md w-full justify-start ${
                filter === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-700 text-white-400'
              }`}
            >
              <MdDone className='text-xl text-green-400' />
              <span className='ml-2'>Completadas</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FilterBar
