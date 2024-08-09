import { useState,useCallback ,useEffect,useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState("false")
  const [character, setCharacter] = useState("false")
  const [password, setPassword] = useState("")
  const passwordRef=useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number){
      str+="0123456789"
    }
    if(character) str+="!@#$%^&*()_+{}|[]/.,"
    for(let i=1;i<=length;i++){
      let char=(Math.floor)(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  }, [length,number,character,setPassword])
    
  const copyPassword=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  },[length,number,character,passwordGenerator])
  return (
    <>
    
      <div className=' w-full shadow-md rounded-lg px-4 mx-56 my-8 py-3 text-orange-700 bg-gray-400 mr-24'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className='ClassName="flex rounded-lg overflow-hidden mb-4 flex flex-wrap"'>
          
          <input type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          
          
          />
          <button onClick={copyPassword} className='bg-blue-500 text-white outline-none'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={number}
            id='numberInput'
            onChange={()=>{
              setNumber((prev)=> !prev);
            }}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={character}
            id='characterInput'
            onChange={()=>{
              setCharacter((prev)=> !prev);
            }}
            />
            <label>character</label>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default App
