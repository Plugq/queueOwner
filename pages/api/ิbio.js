import  pool from "@/lib/connectdb";


export default async function handler(req, res) {
    if(req.method === 'GET'){

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

    
    }
 
    
    