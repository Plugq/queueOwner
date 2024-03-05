import styles from '@/styles/home.module.css'
import { TextField , Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function HistoryReserv() {
  var user
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [data,setData] = useState({
    username: null,
    password : null,
    tel: null,
    email:null
  })

  // console.log('call historyReserv');
  useEffect(() => {
    // Perform localStorage action
     user = JSON.parse(localStorage.getItem('user'))
     console.log(user)
     setData(user[0])
  }, [])

  useEffect(() => {
    async function getData(){
      const res = await fetch('http://localhost:3000/api/about',{
        method: 'GET',
        headers: {
          // Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
      },
      })
      const data = await res.json();
      setResults(data);
      console.log(data)
    }

    getData();

  }, [])

  // async function removeQueue(id){

  //   const res = await fetch(`http://localhost:3000/api/bio?queueId=${id}`,{
  //     method: 'DELETE',
  //     headers: {
  //       // Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //   },
  //   })

  //   if (!res.ok) {
  //     // This will activate the closest `error.js` Error Boundary
  //     throw new Error('Failed to fetch data')
  //   }else{
  //     router.refresh();
  //   }
  // }
// insertData = () =>{
//   console.log(' on click ')
// }

// function insertData(){
//   console.log(' on click ')
// }


  return(
    <div className={styles.container}>
       <div className={styles.hsidiv1}>
        <h1>ข้อมูลส่วนตัว</h1>
       </div>

       <table className ={styles.table}>
        <thead className={styles.thead}>
          <tr>
        
            <th>username</th>
            <th>เบอร์โทร</th>
            <th>email</th>
            
          </tr>
        </thead>
        <tbody>
          {
            results && results.map(({ id,username, tel , email  }) => {
              return(
                <tr className={styles.tr}>
                  
                  <td>{ username }</td>
                  
                  <td>{ tel }</td>
                  <td>{ email }</td>
          
                  <td><a target='_blank' href={`/page_q/aboutme?edit=${id}`}>เเก้ไข</a></td>
                  
                </tr>
              )
            })
          }
        </tbody>
       </table>

     
  </div>
  
  )
   }

  //  export async function getServerSideProps() {
  //   // Fetch data from external API
  //   const res = await fetch('http://localhost:3000/api/reserv_q',{
  //     method: 'GET',
  //     headers: {
  //       // Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //   },
  //   })
  //   const data = await res.json()
  //   // Pass data to the page via props
  //   // console.log(data)
  //   return { props: { data } }
  // }