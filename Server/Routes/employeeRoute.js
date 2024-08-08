import express from 'express'
import con from '../../utils/db.mjs'; 
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt'



const router = express.Router();


router.post('/employee_login', (req, res) => {
  console.log(req.body);
  const sql = 'SELECT * FROM employee WHERE email = ? ';
  console.log(req.body)
  con.query(sql, [req.body.email], (err, result) => {
    if (err) {
      return res.status(500).json({ loginStatus: false, error: 'Query error' });
    }   
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err,response) => {
            if(err) return res.json({loginStatus: false, Error: "Wrong Password"});
            if(response){
                  const email = result[0].email;
                  const token = jwt.sign(
                    { role: 'employee', email: email },
                    'employee_jwt_secret_Key',
                    { expiresIn: '1d' }
                  );

                  res.cookie('token', token);

                  return res.json({ loginStatus: true });

            }
      }
            )


     
   
    } else {
      return res.json({ loginStatus: false, error: 'Wrong email or password' });
    }
  });
});




export {router as EmployeeRouter}

 