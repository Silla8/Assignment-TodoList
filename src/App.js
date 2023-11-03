

import './App.css';
import { useState, useEffect } from 'react';


function App() {

  const temp= {name: "", date: ""};
  const [id, setId]=useState(1);
  const [tasks, setTasks]= useState([]);

  useEffect(()=> {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if(saved!=null) setTasks(saved);
  }, [])

  function changeName(event)
  {
    temp.name=event.target.value;
    
  }

  function changeDate(event)
  {
    temp.date=event.target.value.split("-").reverse().filter(d=>d.length<4).join("/");
    
  }

  function deleteHandler(event)
  {
    
    const res= tasks.filter(data=>data.name!==event.target.innerHTML);
    setTasks(res);
    localStorage.removeItem("todos");
    localStorage.setItem("todos", JSON.stringify(res));
  }
 
  function submitHandler(event)
  {
    if(temp.name && temp.date)
    {
      const info =[...tasks, { name: temp.name, date: temp.date, id}];
      setTasks(info);
      localStorage.removeItem("todos");
      localStorage.setItem("todos", JSON.stringify(info));
      temp.name="";
      temp.date="";
      setId(id+1);
    }
  }

  return (
    <div className="App bg-cover bg-[url('https://images.unsplash.com/photo-1590579491624-f98f36d4c763?auto=format&fit=crop&q=80&w=1443&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <header className="App-header rounded-b-lg mx-4 ">
            <div className='font-bold text-white '>
              <p>Welcome To My TODO List!</p>
              <p><em className='font-normal italic '>@SillogicSolutions</em></p>

            </div>
      </header>
      <body className="App-body ">
          <div className='w-2/3 my-10 border-4 p-6 rounded-t-lg bg-[#EDDFEA] '>
            <div className='grid grid-cols-3'>
                <label className='font-semibold'> Task Name 
                  <input className="bg-gray-rounded-sm bg-red-300 h-10 " type="text" required onChange={changeName}/>
                </label>
                <label className='font-semibold'> Due Date
                  <input className="rounded-sm bg-red-300 h-10 " type= "date" required onChange={changeDate}/>
                </label>
                <button onClick={submitHandler} className='rounded-sm bg-red-300 h-10 mt-8' > Save Task </button>
            </div>
            <br />
            <div>
              {tasks.map(function(d, index){
                    return (
                    <div key= { d.id}  className='grid grid-cols-2 border-b-2 border-dashed border-cyan-800 my-5 hover:bg-gray-400 hover:rounded-md' onClick={deleteHandler}>
                      <p className='flex' title='Click to delete' >{d.name}</p>
                      <p className='flex flex-row-reverse' >{d.date}</p>
                    </div>
                    ) })}
            </div>
          </div>
      </body>
    </div>
  );
}

export default App;
