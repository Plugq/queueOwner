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

    queue_name: null,
    queue_lastname : null,
    queue_tel: null,
    queue_time: null,
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  useEffect( () => {
    if(editId){
      // console.log(editId)
      async function getQueue(){
        const res = await fetch(`http://localhost:3000/api/reserv_q?editId=${editId}`, {
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
  const res = await fetch('http://localhost:3000/api/reserv_q', {
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
    router.push('/page_q/showqueue')
  }
 
  // return res.json()
}

async function updateData() {
  console.log('editId',editId)
  console.log(data)
  const res = await fetch(`http://localhost:3000/api/reserv_q`, {
    method: 'PUT',
    headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({data}),

})
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }else{
    router.push('/page_q/showqueue')
  }
}


  return(
      <div className={styles.container}>
      
         <h1 className={styles.title}> จองคิว</h1>
         <TextField value={data ? data.queue_name : ''} onChange={onchange} name='queue_name' id="outlined-basic" label="ชื่อ" variant="outlined" />
         <TextField value={data ? data.queue_lastname : ''} onChange={onchange} name='queue_lastname' id="outlined-basic" label="นามสกุล" variant="outlined" />
         <TextField value={data ? data.queue_tel : ''} onChange={onchange} name='queue_tel' id="outlined-basic" label="เบอร์โทร" variant="outlined" />
         <TextField value={data ? data.queue_time : ''} onChange={onchange} name='queue_time' id="outlined-basic" label="เวลา" type='time' variant="outlined" />
         {/* <TextField value={data ? data.queue_date : ''} onChange={onchange} name='queue_date' id="outlined-basic" label="วันที่" type='date' variant="outlined" /> */}

         <Button className={styles.button2} onClick={!editId ? insertData : updateData}> ตกลง</Button>
         <Button className={styles.button2} > <Link href='/page_q/showqueue'>ยกเลิก</Link></Button>

    </div>
    )
   }
   