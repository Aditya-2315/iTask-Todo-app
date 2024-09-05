import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let TodoSting = localStorage.getItem("todos")
    if (TodoSting) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const SaveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const HandleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)
    SaveToLS()
  }
  const HandleDelete = (e, id) => {
    if (confirm("Do you want to delete this todo")) {
      let newtodos = todos.filter(item => {
        return item.id !== id
      })
      setTodos(newtodos)
    }
    SaveToLS()
  }
  const HandleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    SaveToLS()
  }

  const HandleChange = (e) => {
    setTodo(e.target.value)
  }

  const HandleCheck = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    setTodos(newtodos)
    SaveToLS()
  }

  const ToggleFinished = (params) => {
    setshowFinished(!showFinished)
  }
  
  return (
    <>
      <Navbar />
      <div className="md:container bg-teal-100 mx-auto my-5 rounded-xl p-5 min-h-[90vh] md:w-1/2 sm:w-full">
        <h1 className=' font-extrabold text-center text-2xl'>iTask - Manage Your Todos At One Place</h1>
        <div className="AddTodo m-3 flex flex-col gap-2">
          <h2 className=' text-xl font-bold my-2'>Add Todo</h2>
          <div className='flex items-center'>
          <input onChange={HandleChange} value={todo} type="text" className='w-[85%] rounded-md' />
          <button onClick={HandleAdd} disabled={todo.length<=3}  className=' bg-teal-700 disabled:bg-slate-400 hover:bg-teal-900 px-2 py-1 rounded-md text-teal-50 mx-6 font-semibold'>Save</button>
          </div>
        </div>
        <input onChange={ToggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className=' text-xl font-bold m-3'>Your Todos</h2>
        <div className="todos m-3">
          {todos.length === 0 && <div className=' m-10 font-extrabold text-xl'>No Todos</div>}
          {todos.map(item => {
     return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex items-center w-full justify-between my-5">
              <div className=' flex gap-4 items-center'>
                <input onChange={HandleCheck} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex">
                <button onClick={(e) => { HandleEdit(e, item.id) }} className=' bg-teal-700 hover:bg-teal-900 px-2 py-1 rounded-md text-teal-50 mx-1 font-semibold'><MdEditSquare /></button>
                <button onClick={(e) => { HandleDelete(e, item.id) }} className=' bg-teal-700 hover:bg-teal-900 px-2 py-1 rounded-md text-teal-50 mx-1 font-semibold'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
