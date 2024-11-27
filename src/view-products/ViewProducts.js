import React from 'react'
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ViewProducts() {
  
    const [products,setProducts] =useState([]);
     const getData= ()=>{
         axios.get('http://localhost:5000/products')
              .then((res)=>setProducts(res.data))
     }
     useEffect(getData,[])

     function deleteProduct(id)
    {
        axios.delete(`http://localhost:5000/products/${id}`)
        .then(res=>{
            if(res.status===200)
            {
                alert("Product details removed..!")
                window.location.reload();
            }
        })
        .catch(error=>console.log(error))
    }
  return (
    <div className='pt-3' >
      <h1 className='text-center fs-3 text-warning'>
        All Products of a store..! &nbsp;
        <i className='bi bi-shop-window'></i>
      </h1>
    <table className='bg-white table table-hover'>
      <thead>
        <tr>
        <th>Sr.No</th>
        <th>Product Name</th>
        <th>Description</th>
        <th>Category</th>
        <th>Price</th>
        <th>In Stock</th>
        <th>Actions</th>
        </tr>
        
      </thead>
      <tbody>
        {
          products.map((product)=><tr>
            <td>{product.id}</td>
            <td>{product.productName}</td>
            <td>{product.description}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td><input type='checkbox' checked={product.inStock}></input></td>
            <td>
              <button className='btn btn-outline-danger me-4' onClick={()=>deleteProduct(product.id)}>
                <i class='bi bi-trash3-fill'></i>
                </button>

              <Link className='btn btn-outline-primary' to={`/edit/${product.id}`}>
                                <i class="bi bi-pencil-square"></i>
                            </Link>
              
            </td>
          </tr>)
        }
      </tbody>
    </table>
    </div>
  )
}

export default ViewProducts
