import styles from '@/styles/home.module.css'
import { TextField , Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';


export default function Reserv() {

  const seatrchParams = useSearchParams();
  const router = useRouter();
  const editId = seatrchParams.get('edit')
  
  const [data,setData] = useState({
    username: null,
    password : null
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  useEffect( () => {
    if(editId){
      // console.log(editId)
      async function getQueue(){
        const res = await fetch(`http://localhost:3000/api/regis?editId=${editId}`, {
          method: 'GET',
          headers: {
              // Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          }
      })
      
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }else{
          const queueJson= await res.json();
          setData(queueJson)
        }
      }

      getQueue();
    }
  },[editId])

function  onchange (e){ 
    let { name , value } = e.target
    setData({
      ...data,
      [name]: value
    })
  }
  
// insertData = () =>{
//   console.log(' on click ')
// }

// function insertData(){
//   console.log(' on click ')
// }

async function insertData() {
  const res = await fetch('http://localhost:3000/api/regis', {
    method: 'POST',
    headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }else{
    router.push('/')
  }
 
  // return res.json()
}

async function updateData() {
  const res = await fetch('http://localhost:3000/api/regis', {
    method: 'PUT',
    headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }else{
    router.push('/');
  }
}


  return(
      <div className={styles.container}>
      
         <h1 className={styles.title}> REGISTER</h1>
         <TextField value={data ? data.username : ''} onChange={onchange} name='username' id="outlined-basic" label="username" variant="outlined" />
         <TextField value={data ? data.password : ''} onChange={onchange} name='password' id="outlined-basic" label="password" variant="outlined" />
         <TextField value={data ? data.tel : ''} onChange={onchange} name='tel' id="outlined-basic" label="tel" variant="outlined" />
         <TextField value={data ? data.email : ''} onChange={onchange} name='email' id="outlined-basic" label="email" variant="outlined" />
         
         <Button className={styles.button2} onClick={!editId ? insertData : updateData}> ตกลง</Button>
         <Button className={styles.button2} > <Link href='/'>ยกเลิก</Link></Button>

    </div>
    )
   }
   