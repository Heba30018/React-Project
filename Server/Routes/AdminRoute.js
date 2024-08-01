import express from 'express';
import con from '../../utils/db.mjs'; 
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt'



const router = express.Router();


router.post('/adminlogin', (req, res) => {
  console.log(req.body);
  const sql = 'SELECT * FROM admin WHERE email = ? AND password = ?';
  console.log(req.body)
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.status(500).json({ loginStatus: false, error: 'Query error' });
    }   
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: 'admin', email: email },
        'jwt_secret_Key',
        { expiresIn: '1d' }
      );
      res.cookie('token', token);

      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, error: 'Wrong email or password' });
    }
  });
});

router.post('/add_category', (req,res) =>{
  const sql = "INSERT INTO category (`name`) VALUES (?)"
  con.query(sql, [req.body.category], (err,result) =>{
    if(err) return res.json({Status: false, Error : "Query Error"})
    return res.json({Status: true})
  })
})

router.get('/category', (req,res) =>{
  const sql = "SELECT * FROM category"
  con.query(sql, (err,result) =>{
    if(err) return res.json({Status: false, Error : "Query Error"})
    return res.json({Status: true, Result: result})
  })
})


// router.post('/add_employee', (req,res) =>{
//   const sql = `INSERT INTO employee 
//    (name,email,password,address,salary,image,category_id)  
//    VALUES (?)`
//   bcrypt.hash(req.body.password,10 ,(err, hash)=>{
//     if(err) return res.json({Status: false, Error : "Query Error"})
//     const values = [
//       req.body.name,
//       req.body.email,
//       hash,
//       req.body.address,
//       req.body.salary,
//       req.body.image,
//       req.body.category_id,
// ]

// con.query(sql,[values], (err,result) =>{
//   if(err) return res.json({Status: false, Error : "Query Error"})
//   return res.json({Status: true})
// })
//   })
   
 
// })


router.post('/add_employee', (req, res) => {
  console.log("Te")
  const sql = `INSERT INTO employee 
   (name, email, password, address, salary, image, category_id)  
   VALUES (?)`;
   console.log(req.body)
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.error("Hashing Error:", err);
      return res.json({ Status: false, Error: "Hashing Error" });
    }

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.body.image,
      req.body.category_id,
    ];
    


    con.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Query Error:", err);
        return res.json({ Status: false, Error: "Query Error" });
      }
      return res.json({ Status: true });
    });
  });
});





export { router as adminRouter };



