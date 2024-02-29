import  pool from "@/lib/connectdb";


export default async function handler(req, res) {
   
    if(req.method === 'POST'){
    const data = req.body

    const {queue_name,queue_lastname,queue_tel,queue_time} = data

        let sqlQ = 'INSERT INTO `queue` SET queue_name = ?, queue_lastname = ?, queue_tel = ?, queue_time = ? '

        pool.query(
               sqlQ,[queue_name,queue_lastname,queue_tel,queue_time],
                function (err, results ) {
                    res.status(201).json(results)
                    console.log(results)
                }
              );
       
              
    }

    
    else if(req.method === 'GET'){

        console.log('test call  api')

        const {
            query: {
                editId
            }
        } = req;

        if(!editId){
            let sqlQ = 'SELECT * FROM `user`';
                pool.query( sqlQ, function (err, results ) {
                    // console.log(results)
                    res.status(200).json(results)
                }
            );
        }else{
            let query = 'SELECT * FROM `user` WHERE id = ?';
            pool.query( query, [editId], function (err, results ) {
                    // console.log(results)
                    res.status(200).json(results[0])
               }
            );
            // console.log(editId)
        }
    
        
    }

    else if(req.method === 'PUT'){

        const { data } = req.body;
        console.log(req.body)

        const query = 'UPDATE `user` SET username = ?, password = ?, tel = ? ,email = ? WHERE id = ? ';

        pool.query( query, [ data.username, data.password, data.tel ,data.email,data.id], function (err, results ) {
            // console.log(results)
              res.status(200).json(results)
              
            }
        );

    } else if(req.method === 'DELETE'){

        const {
            query: {
                queueId
            }
        } = req

        const query = "DELETE FROM `queue` WHERE queue_now = ?";

        pool.query( query, [queueId], function (err, results ) {
              res.status(200).json(results)
            }
        );
    }


    
//   res.status(200).json({ message: ' API connected' })

  
  
    
    }
 
    
    