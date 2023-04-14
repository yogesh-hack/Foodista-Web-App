import React from 'react'
import Product from '../components/Products'
import Footer from '../components/Footer'

const Products = () => {
  return (
    <motion
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth }}>
        {/* <img className='mx-auto h-64' src='./images/eating.png' alt='product'/> */}
      <Product />
     <div className='-mt-20'>
      <img className='h-64 mx-auto' src='./images/chef-footer.png' alt='chef'/>
     </div>
      <Footer />
    </motion>
  )
}

export default Products