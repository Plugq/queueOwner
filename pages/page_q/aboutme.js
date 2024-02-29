import styles from '@/styles/home.module.css'
import Link from 'next/link';
import { TextField , Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const PersonalInfo = () => {

   var user
   const seatrchParams = useSearchParams();
   const router = useRouter();
   const editId = seatrchParams.get('edit')
   
   const [data,setData] = useState({
     username: null,
     password : null,
     tel: null,
     email:null
   })
   useEffect(() => {
      // Perform localStorage action
       user = JSON.parse(localStorage.getItem('user'))
       console.log(user)
       setData(user[0])
    }, [])

   useEffect(() => {
     console.log(data)
     
   }, [data])
 
   useEffect( () => {
     if(editId){
       // console.log(editId)
       async function getQueue(){
         const res = await fetch(`http://localhost:3000/api/about?editId=${editId}`, {
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
   const res = await fetch('http://localhost:3000/api/about', {
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
     router.push('/page_q/bioname')
   }
  
   // return res.json()
 }
 
 async function updateData() {
   console.log('editId',editId)
   console.log(data)
   const res = await fetch(`http://localhost:3000/api/about`, {
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
     router.push('/page_q/bioname')
   }
 }

 return(
   <div className={styles.container}>
   
      <h1 className={styles.title}> แก้ไขข้อมูล</h1>
      <TextField value={data ? data.username : ''} onChange={onchange} name='username' id="outlined-basic" label="user" variant="outlined" />
      {/* <TextField value={data ? data.password : ''} onChange={onchange} name='password' id="outlined-basic" label="pass" variant="outlined" /> */}
      <TextField value={data ? data.tel : ''} onChange={onchange} name='tel' id="outlined-basic" label="เบอร์โทร" variant="outlined" />
      <TextField value={data ? data.email : ''} onChange={onchange} name='email' id="outlined-basic" label="email"  variant="outlined" />
      {/* <TextField value={data ? data.queue_date : ''} onChange={onchange} name='queue_date' id="outlined-basic" label="วันที่" type='date' variant="outlined" /> */}

      <Button className={styles.button2} onClick={!editId ? insertData : updateData}> ตกลง</Button>
      <Button className={styles.button2}> <Link href={'/page_q/bioname'}>ยกเลิก </Link></Button>

 </div>
 )
};

export default PersonalInfo;