import React from 'react'
import { Link } from 'react-router-dom'
import Products from '../components/Products'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { motion } from "framer-motion";
import {useEffect, useState } from 'react'
import SeachFilter from '../components/SeachFilter';
import Footer from '../components/Footer';

const Home = () => {

  const [products, setPoducts] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': "application/json"
    }
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/product', options)
      .then(response => response.json())
      .then(products => {
        setPoducts(products)
      })
      .catch(err => console.error(err));
  }, [])

  return (
    <>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width : "100%"}}
        exit={{ x : window.innerWidth }}
        className='hero py-16'>
        <div className='container mx-auto flex items-center justify-between'>
          <div className='w-1/2'>
            <h6 className='text-lg'><em>Are you hungry?</em></h6>
            <Popup
              trigger={<button className="p-2 border border-black font-bold hover:text-white hover:bg-gray-700 text-black rounded-xl bg-white">Search foods..</button>}
              modal
              nested
            >
              {close => (
                <motion.div 
                initial={{ opacity: 0 }}
                animate={{opacity : 1}}
                exit={{ opacity : 0}}
                transition={{duration : 0.3}}
                className="modal rounded-xl">
                  <div className="p-2">
                   <SeachFilter data={products}/>
                  </div>
                </motion.div>
              )}
            </Popup>
            <h1 className='text-3xl md:text-6xl font-bold'>Don't Wait !</h1>
            <button className='px-6 py-2 rounded-full text-white font-bold mt-4 bg-yellow-500 hover:bg-yellow-600'><Link to='/products'>Order Now</Link></button>
          </div>
          <div className='w-1/2'>
            <img className='w-4/5 rounded-lg' src='https://i.pinimg.com/originals/22/32/0a/22320ae1812ec585b6304a5514d92a3f.gif' alt=''></img>
          </div>
        </div>
      </motion.div>
      <div className='pd-24'>
        <Products />
      </div>
      <div className='flex pl-10 -mt-20 justify-between'>
      <img className='h-64' src='./images/delivery.png' alt='delivery'/>
      <img className='h-64 ' src='./images/chef-footer.png' alt='chef'/>
     </div>
      <Footer />
    </>
  )
}

export default Home