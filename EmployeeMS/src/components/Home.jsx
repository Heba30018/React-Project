import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal , setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)


  useEffect(() => {
    adminCount()
    employeeCount()
    salaryCount()
  },[])


  const adminCount =() =>{
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result =>{
      if(result.data.Status){
        setAdminTotal(result.data.Result[0].admin)
        console.log(result.data.Result[0].admin)
      }
    })
  }

  const salaryCount =() =>{
    axios.get('http://localhost:3000/auth/salary_count')
    .then(result =>{
      if(result.data.Status){
        setSalaryTotal(result.data.Result[0].salary)
      }
    })
  }

  const employeeCount=() =>{
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result =>{
      if(result.data.Status){
        setemployeeTotal(result.data.Result[0].employee)
      }
    })
  }


  return (
   <div>
    
    <div>
    <div className='p-3 d-flex justify-content-around mt-3'>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Admin</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5>{adminTotal}</h5>
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Employee</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5>{employeeTotal}</h5>
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Salary</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5>{salaryTotal}</h5>
        </div>
      </div>
    </div>
    <div className='mt-4 px-5 pt-3'>
      <h3>List of Admins</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
       
        </tbody>
      </table>
    </div>
  </div>
   </div>
  )
}
