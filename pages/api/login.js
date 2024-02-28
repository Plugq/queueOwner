

import { useRouter } from 'next/router';
import pool from '/lib/connectdb';
import { useState } from 'react';


export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;

     pool.query( 'SELECT * FROM `user` WHERE username = ? AND password = ? ' , [username,password], function (err, results ) {
 
      if (!results ) {
        return res.status(401).json({ error: 'Invalid credentials' });
        
      }
      else{
        return  res.json(results)
      }  
 }
 )

}
