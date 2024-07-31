import axios from 'axios'
import React, { useState } from 'react'

export const AddCategory = () => {

      const [category, setCategory] = useState()
      const handleSubmit = (e)=>{
            e.preventDefault()
            axios.post('https://localhost:3000/auth/add_category', {category})
            .then(result => console.log(result.data))
            .catch(err=> console.log(err))
      }
  return (
      <div className='d-flex justify-content-center align-items-center h-75 '>
      <div className='p-3 rounded w-25 border '>
          
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit} >
                  <div className='mb-3'>
                        <label htmlFor='category'><strong>Category: </strong></label>
                        <input type='text' name='category' autoComplete='off' placeholder='Enter Category' 
                       onChange={(e)=> setCategory(e.target.value)} className='form-control rounded-0'
                        />
                  </div>
              
                  <button className='btn btn-success w-100 rounded-0 mb-2'>Add Category</button>

            </form>
      </div>

    </div>
  )
}
