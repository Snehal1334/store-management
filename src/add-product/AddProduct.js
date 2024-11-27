
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import axios from 'axios';

function AddProduct() {
    const {register,handleSubmit,reset,setValue}=useForm();
    const {id}   =useParams()
    const saveData= product=>
    {
        if(!id){
        axios.post('http://localhost:5000/products',product).then(
            res=>{
                if(res.status==201)
                {
                    alert("Product is successfully stored into the store app !")
                    reset();
                }
                })
                .catch(error=>console.log(error));   
            }else{
                axios.put(`http://localhost:5000/products/${id}` ,product )
                     .then(res=>{
                         if(res.status===200){
                            alert("Product Details updated..!")
                         }
                     })
                     .catch(error=>console.log(error));
             }
            }

            const getEditData=()=>{
                if(id)
                {
                  axios.get(`http://localhost:5000/products/${id}`)
                       .then(res=>{
                            for(let prop in res.data)
                            {
                              setValue(prop,res.data[prop])
                            }
                       })
            
                }      
             }
            
             useEffect(getEditData,[]);
        
    
  return (
    <div className='d-flex justify-content-center' >
    <div className='w-50 border border-orange mt-3 p-3'>
        <h1>{id}</h1>
        <h1 className='text-warning text-center fs-3'>
            <i className='bi bi-box-fill'></i>&nbsp;
        Add new product to the store..!
        </h1>
        <form onSubmit={handleSubmit(saveData)}>
        <div className='mb-3'>
                <label  className='text-black form-label'>Enter Product Id:- </label>
                <input type='text' {...register('id')} className='form-control' ></input>
            </div>
            <div className='mb-3'>
                <label  className='text-black form-label'>Enter Product Name:- </label>
                <input type='text' {...register('productName')} className='form-control' ></input>
            </div>
            <div className='mb-3'>
                <label  className='text-black form-label'>Enter Product Description:- </label>
                <input type='text' {...register('description')} className='form-control' ></input>
            </div>
            <div className='mb-3'>
                <label  className='text-black form-label'>Enter Product Category:- </label>
                <input type='text' {...register('category')} className='form-control' ></input>
            </div>
            <div className='mb-3'>
                <label className='text-black form-label'>Enter Product Price:- </label>
                <input type='text' {...register('price')} className='form-control' ></input>
            </div>
            <div className='mb-3'>
                <label  className='text-black form-label'>Is product in stock? </label>
                <input type='checkbox' {...register('inStock')} className='form-check-input' ></input>
            </div>
            <div className='text-center'>
                <button  className='btn btn-success w-25'>Submit</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default AddProduct
