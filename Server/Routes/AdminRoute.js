import express from 'express';
import con from '../../utils/db.mjs'; 
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'


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


// image upload 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});

// end image upload

router.post('/add_employee', upload.single('image') ,(req, res) => {
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
      req.file.filename,
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


router.get('/employee', (req,res) =>{
  const sql = "SELECT * FROM employee"
  con.query(sql, (err,result) =>{
    if(err) return res.json({Status: false, Error : "Query Error"})
    return res.json({Status: true, Result: result})
  })
})



router.get('/employee/:id', (req,res) =>{
  const id = req.params.id;
  console.log(id)
  const sql = "SELECT * FROM employee WHERE id = ?"
  con.query(sql, [id],(err,result) =>{
    if(err) return res.json({Status: false, Error : "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

router.put('/edit_employee/:id', (req,res) =>{
  const id = req.params.id
  const  sql = `UPDATE employee
  set name= ?, email= ?,address= ?, salary= ?,  category_id= ?
  where id =?
  `
  const values = [
    req.body.name,
    req.body.email,
    req.body.address,
    req.body.salary,
    req.body.category_id,
  ];
  con.query(sql, [...values, id],(err,result) =>{
    if(err) return res.json({Status: false, Error : "Query Error"+err})
    return res.json({Status: true, Result: result})
  })

})

export { router as adminRouter };



