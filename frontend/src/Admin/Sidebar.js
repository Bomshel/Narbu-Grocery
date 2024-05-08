import React from 'react'
import { Link } from "react-router-dom";
import './style.css'



function Sidebar({Toggle}) { 
     return (  
            <div className='bg-white sidebar p-2'>        
                <div className='m-2'>            
                    <span className='brand-name fs-4'>Welcome Admin</span>        
                </div>  
                <div className='text-dark' />   
                <div className='list-group list-group-flush'>            
                    <div className='list-group-item py-2'>                
                        <i className='bi bi-speedometer2 fs-5 me-3'></i>                
                        <span className="fs-5">Dashboard</span>
                    </div>
                    <div className='list-group-item py-2 '> 
                        <i className='bi bi-house fs-5 me-3'></i>                
                        <Link to="/admin"><span className="fs-5">Home</span></Link>
                    </div>
                    <div className='list-group-item py-2'>
                        <i className='bi bi-table fs-5 me-3'></i>                
                        <Link to="/products"><span className="fs-5">Products</span></Link>
                    </div>            
                    <div className='list-group-item py-2'>                
                        <i className='bi bi-clipboard-data fs-5 me-3'></i>                
                        <Link to="/report"><span className="fs-5">Report</span></Link>
                    </div> 
                    <div className='list-group-item py-2'>                
                        <i className='bi bi-clipboard-data fs-5 me-3'></i>                
                        <Link to="/query"><span className="fs-5">Query</span></Link>
                    </div>            
                    <div className='list-group-item py-2'>                
                        <i className='bi bi-people fs-5 me-3'></i> 
                        <Link to="/user"><span className="fs-5">User</span></Link>
               
                    </div>                 
                </div>    
            </div> 
 )}
export default Sidebar 