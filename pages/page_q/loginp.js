
import Button from '@mui/material/Button';
import Link from 'next/link';
import styles from '@/styles/home.module.css'
import { TextField } from '@mui/material'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { data } from 'autoprefixer';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const handleLogin = async () => {
    
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:username, password:password }),
      }).then(response => {return response.json()}).then(data =>{console.log(data)
        localStorage.setItem('user',JSON.stringify(data))
      if(data.length!==0){
        console.log('Login successful')
        router.push('/')

      } else{
        console.log('Login failed')
      }
      } )

  };


  
    return (
        <div className={styles.container}>
    
       <h1 className={styles.title}> LOGIN </h1>
       
       {/* <form id='formlogin' action={'/api/login'}> */}
       <div style={{display : 'flex' , marginTop : '20px'}}>
           <div style={{display : 'flex' , alignContent : 'center' , alignItems : 'center'}}>Username :</div> 
           <div><TextField type='text'  className={styles.input}  variant="standard" value={username}  onChange={(e) => setUsername(e.target.value)} /></div>
        </div> 
        <div style={{display : 'flex', marginTop : '20px'}}>
           <div style={{display : 'flex' , alignContent : 'center' , alignItems : 'center' }}>password :</div>
            <div><TextField type='password' className={styles.input}  variant="standard" value={password}  onChange={(e) => setPassword(e.target.value)} /></div>
        </div> 

       
        
        
      <div style={{display :'flex' ,marginTop : '20px'}}>
        <button className={styles.button2} variant="contained"  onClick={handleLogin}>ตกลง</button>
        <button className={styles.button2} variant="contained"> <Link href={'/page_q/register'}>ลงชื่อเข้าใช้ </Link> </button>

        </div>
       
      {/* </form> */}
  </div>
      );

};

export default Login;




  