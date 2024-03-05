import styles from '@/styles/home.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HistoryReserv() {

  const router = useRouter();
  const [results, setResults] = useState(null);

  // console.log('call historyReserv');

  // useEffect(() => {
  //  console.log(results);
  // }, [results])

  useEffect(() => {
    async function getData(){
      const res = await fetch('http://localhost:3000/api/reserv_q',{
        method: 'GET',
        headers: {
          // Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
      },
      })
      const data = await res.json();
      setResults(data);
      // console.log(data)
    }

    getData();

  }, [])

  async function removeQueue(queue_now){

    const res = await fetch(`http://localhost:3000/api/reserv_q?queueId=${queue_now}`,{
      method: 'DELETE',
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    })

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }else{
      router.refresh();
    }
  }

  return(
    <div className={styles.container}>
       <div className={styles.hsidiv1}>
        <h1>ข้อมูลการจอง</h1>
       </div>

       <table className ={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>คิว</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>เบอร์โทร</th>
            <th>เวลา</th>
            
          </tr>
        </thead>
        <tbody>
          {
            results && results.map(({ queue_now,  queue_name, queue_lastname, queue_tel , queue_time  }) => {
              return(
                <tr className={styles.tr}>
                  <td>{ queue_now }</td>
                  <td>{ queue_name }</td>
                  <td>{ queue_lastname }</td>
                  <td>{ queue_tel }</td>
                  <td>{ queue_time }</td>
          
                  <td><a target='_blank' href={`/page_q/reserv?edit=${queue_now}`}>เเก้ไข</a></td>
                  <td><button onClick={() => removeQueue(queue_now)}>ลบ</button></td>
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