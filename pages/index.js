import { useEffect } from 'react';
import styles from'@/styles/home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MainPage = () => {
  useEffect(() => {
    // Your logic for the main page goes here
    console.log('Main Page');
  }, []);
 return(
    <div className={styles.container}>
      
      <h1 className={styles.title}> HOME</h1>

      <button className={styles.button}><Link href="/page_q/reserv">จองคิว</Link> </button>
      <button className={styles.button}><Link href= "/page_q/historyReserv"> ประวัติการจอง </Link></button>
      <button className={styles.button}><Link href= "/page_q/bioname"> ข้อมูลส่วนตัว </Link></button>
     
    </div>
 );
};

export default MainPage;