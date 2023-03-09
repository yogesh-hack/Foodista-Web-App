import React from 'react'
import Product from '../components/Products'
import Footer from '../components/Footer'

const Products = () => {
  return (
    <motion
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth }}>
        <img className='mx-auto h-64' src='./images/eating.png' alt='product'/>
      <Product />
     <div className='flex pl-10 -mt-20 justify-between'>
      <img className='h-64' src='./images/delivery.png' alt='delivery'/>
      <img className='h-64 ' src='./images/chef-footer.png' alt='chef'/>
     </div>
      <Footer />
    </motion>
  )
}

export default Products