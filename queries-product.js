const Pool = require('pg').Pool
const pool = new Pool({
  user: 'vnadmin@vndb-api',
  host: 'vndb-api.postgres.database.azure.com',
  database: 'postgres',
  password: 'Apassword1',
  port: 5432,
  ssl: true
})
// host=vnapi.postgres.database.azure.com port=5432 dbname={your_database} user=me@vnapi password={your_password} sslmode=required
const getRoofProductByName = (request, response) => {
  try {
    const pruductName = request.query.productName
    console.log("requestLog" + pruductName)
    pool.query('SELECT * FROM vnroof WHERE cname = $1', [pruductName], (error, results) => {
      if (error) {
        response.status(200).json(parseJsonRespons(false, null))
        throw error
      }
      console.log("requestLog" + results.rowCount)
      if (results.rowCount > 0) {
        response.status(200).json(parseJsonRespons(true, results.rows[0]))
      } else {
        response.status(200).json(parseJsonRespons(false, null))
      }

    })
  } catch (error) {
    response.status(400).json(parseJsonRespons(false, null))
  }

}


const getRoofProductByBrand = (request, response) => {
  try {
    const brandID = request.query.brandID

    pool.query('SELECT * FROM vnroof WHERE productbrand = $1', [brandID], (error, results) => {
      if (error) {
        response.status(200).json(parseJsonRespons(false, null))
        throw error
      }
      response.status(200).json(parseJsonRespons(true, results.rows))
    })
  } catch (error) {
    response.status(400).json(parseJsonRespons(false, null))
  }

}


const getSteelProductByBrand = (request, response) => {
  try {
    const brandID = request.query.brandID

    pool.query('SELECT * FROM vnsteel WHERE productsteeltype = $1', [brandID], (error, results) => {
      if (error) {
        response.status(200).json(parseJsonRespons(false, null))
        throw error
      }
      response.status(200).json(parseJsonRespons(true, results.rows))
    })
  } catch (error) {
    response.status(400).json(parseJsonRespons(false, null))
  }

}

const getSteelProductByName = (request, response) => {

  try {
    const pruductName = request.query.productName
    console.log("requestLog" + pruductName)
    pool.query('SELECT * FROM vnsteel WHERE steelname = $1', [pruductName], (error, results) => {
      if (error) {
        response.status(200).json(parseJsonRespons(false, null))
        throw error
      }
      console.log("requestLog" + results.rowCount)
      if (results.rowCount > 0) {
        response.status(200).json(parseJsonRespons(true, results.rows[0]))
      } else {
        response.status(200).json(parseJsonRespons(false, null))
      }

    })
  } catch (error) {
    response.status(400).json(parseJsonRespons(false, null))
  }

}

const getDoorProductByBrand = (request, response) => {
  const brandID = request.query.brandID
  try {
    pool.query('SELECT * FROM vndoorandsky WHERE productbrand = $1', [brandID], (error, results) => {
      if (error) {
        response.status(200).json(parseJsonRespons(false, null))
        throw error
      }
      response.status(200).json(parseJsonRespons(true, results.rows))
    })
  } catch (error) {
    response.status(400).json(parseJsonRespons(false, null))
  }

}

const getDoorProductByName = (request, response) => {
  try {
    const pruductName = request.query.productName
    console.log("requestLog" + pruductName)
    pool.query('SELECT * FROM vndoorandsky WHERE dname = $1', [pruductName], (error, results) => {
      if (error) {
        response.status(200).json(parseJsonRespons(false, null))
        throw error
      }
      console.log("requestLog" + results.rowCount)
      if (results.rowCount > 0) {
        response.status(200).json(parseJsonRespons(true, results.rows[0]))
      } else {
        response.status(200).json(parseJsonRespons(false, null))
      }

    })
  } catch (error) {
    response.status(400).json(parseJsonRespons(false, null))
  }

}
function parseJsonRespons(status, any) {
  var obj = {} // empty Object
  var key = 'success';
  obj[key] = status;
  var keyResult = 'result';
  obj[keyResult] = any
  return obj;
}

module.exports = {
  getRoofProductByBrand,
  getRoofProductByName,
  getSteelProductByName,
  getSteelProductByBrand,
  getDoorProductByBrand,
  getDoorProductByName
}