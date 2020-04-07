

import React, {useState} from 'react';


const Semester = props => {
  
  const [arr , setArr ] = useState([]) 
  const [number , setNumber] = useState(0);

  const handleAdd = (e) => {
    setNumber(number+1);
  const temp = arr;
  temp.push({
    number
  });

  setArr(temp);
  };

  return (
    <div>
      <h1> Semester: {number} and arr : {arr.length}</h1>
      <button onClick={handleAdd}>Click</button>
    </div>
  )
}

export default Semester;
