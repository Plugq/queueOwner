import  pool from "@/lib/connectdb";


export default async function handler(req, res) {
   
    if(req.method === 'POST'){
    const data = req.body

    const {username ,password,tel,email} = data

        let sqlQ = 'INSERT INTO `user` SET username = ? ,password = ?,tel = ? ,email = ?'
        pool.query(
               sqlQ,[username, password,tel,email],
                function (err, results ) {
                    res.status(201).json(results)
                    console.log(results)
                }
              );
       
        
    }

    
    // else if(req.method === 'GET'){

    //     console.log('test call  api')

    //     const {
    //         query: {
    //             editId
    //         }
    //     } = req;

    //     if(!editId){
    //         let sqlQ = 'SELECT * FROM `user`';
    //             pool.query( sqlQ, function (err, results ) {
    //                 // console.log(results)
    //                 res.status(200).json(results)
    //             }
    //         );
    //     }else{
    //         let query = 'SELECT * FROM `user` WHERE queue_now = ?';
    //         pool.query( query, [editId], function (err, results ) {
    //                 // console.log(results)
    //                 res.status(200).json(results[0])
    //            }
    //         );
    //         // console.log(editId)
    //     }
    
        
    // }

    // else if(req.method === 'PUT'){

    //     const { queue_name, queue_lastname, queue_tel, queue_now ,queue_time } = req.body;

    //     const query = "UPDATE `user` SET queue_name = ?, queue_lastname = ?, queue_tel = ? ,queue_time = ? WHERE queue_now = ? ";

    //     pool.query( query, [queue_name, queue_lastname, queue_tel, queue_now ,queue_time], function (err, results ) {
    //         // console.log(results)
    //           res.status(200).json(results)
              
    //         }
    //     );

    // } else if(req.method === 'DELETE'){

    //     const {
    //         query: {
    //             queueId
    //         }
    //     } = req

    //     const query = "DELETE FROM `queue` WHERE queue_now = ?";

    //     pool.query( query, [queueId], function (err, results ) {
    //           res.status(200).json(results)
    //         }
    //     );
    // }


    
//   res.status(200).json({ message: ' API connected' })

  
  
    
    }
 