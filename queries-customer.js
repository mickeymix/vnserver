const Pool = require('pg').Pool
const pool = new Pool({
    user: 'vnadmin@vndb-api',
    host: 'vndb-api.postgres.database.azure.com',
    database: 'postgres',
    password: 'Apassword1',
    port: 5432,
    ssl: true
})
//create table vncustomer (ID SERIAL PRIMARY KEY,cusname VARCHAR(120),cussurname VARCHAR(120), cusphone VARCHAR(10), cusemail VARCHAR(120),cuspassword VARCHAR(120));
const createUser = (request, response) => {
    const { cusname, cussurname, cusphone, cusemail, cuspassword } = request.body

    try {
        pool.query('SELECT * FROM vncustomer WHERE cusemail = $1', [cusemail], (error, results) => {
            if (error) {
                throw error
            } else {
                if (results.rowCount > 0) {
                    response.status(400).json(parseJsonRespons(false, 'Sorry, User is already added'))
                } else {
                    pool.query('INSERT INTO vncustomer (cusname, cussurname,cusphone,cusemail,cuspassword) VALUES ($1, $2,$3,$4,$5)', [cusname, cussurname, cusphone, cusemail, cuspassword], (error, results) => {
                        if (error) {
                            throw error
                        }
                        response.status(200).json(parseJsonRespons(true, 'User has been added'))
                    })
                }
            }
    
    
    
        })
    } catch (error) {
        response.status(400).json(parseJsonRespons(false, 'Sorry, User is already added'))

    }
    


}


const validateLogin = (request, response) => {
    const { cusemail, cuspassword} = request.body

    pool.query('SELECT * FROM vncustomer WHERE cusemail = $1', [cusemail], (error, results) => {
      try{
        if (results.rowCount<0) {
            console.log("No Usr found")
            response.status(200).json(parseJsonRespons(false, 'Sorry, Email or Password does not match.'))
        } else {
            if (results.rows[0].cuspassword == cuspassword) {
                response.status(200).json(parseJsonResponsProfile(true, results.rows[0]))

            } else {
                console.log("pass not match")
                response.status(200).json(parseJsonRespons(false, 'Sorry, Email or Password does not match.'))
            }
        }
      }catch(e){
        response.status(400).json(parseJsonRespons(false, 'Sorry, Email or Password does not match.'))

      }
        
    })

}

const inquiryCustomerLogin = (request, response) => {
    const { cusemail} = request.body

    pool.query('SELECT * FROM vncustomer WHERE cusemail = $1', [cusemail], (error, results) => {
        try{
          if (results.rowCount<0) {
              console.log("No Usr found")
              response.status(200).json(parseJsonRespons(false, 'Sorry, Email or Password does not match.'))
          } else {
                  response.status(200).json(parseJsonResponsProfile(true, results.rows[0]))
          }
        }catch(e){
          response.status(400).json(parseJsonRespons(false, 'Sorry, Email or Password does not match.'))
  
        }
          
      })
}
const createWarranty = (request, response) => {
    const {wphone, wemail, wproduct, wdetail, productbrand, warrantyno, waddress, wname} = request.body
    try {
        pool.query('INSERT INTO vnwarranty (wphone, wemail, wproduct, wdetail, productbrand, warrantyno, waddress, wname) VALUES ($1, $2,$3,$4,$5,$6,$7,$8) ON CONFLICT (warrantyno) DO UPDATE SET wphone = $1, wemail = $2, wproduct =$3,wdetail = $4,productbrand =$5,waddress=$6,wname=$7'
        , [wphone, wemail, wproduct, wdetail, productbrand, warrantyno, waddress, wname], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(parseJsonRespons(true, 'warranty  has been added'))
        })
    } catch (error) {
        response.status(400).json(parseJsonRespons(false, 'Sorry, please try again later.'))

    }
}

const inqueryWarranty = (request, response) => {
    const { wemail} = request.body
    pool.query('SELECT * FROM vnwarranty WHERE wemail = $1', [wemail], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(parseJsonResponsProfile(true, results.rows))
    })
}
function parseJsonRespons(status, any) {
    var obj = {} // empty Object
    var key = 'success';
    var message = 'messageresponse'
    obj[key] = status;
    obj[message] = any
    // var keyResult = 'result';
    // obj[keyResult] = any
    return obj;
}

function parseJsonResponsProfile(status, any) {
    var obj = {} // empty Object
    var key = 'success';
    var message = 'result'
    obj[key] = status;
    obj[message] = any
    // var keyResult = 'result';
    // obj[keyResult] = any
    return obj;
}
module.exports = {
    createUser,
    validateLogin,
    inqueryWarranty,
    createWarranty,
    inquiryCustomerLogin
  }