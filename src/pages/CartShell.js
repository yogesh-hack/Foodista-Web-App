import { useContext, useEffect, useState } from 'react'
import { CartContext } from './CartContext'
import { motion } from 'framer-motion'

const CartShell = () => {

    // const [products, setproducts] = useState([])
    const { cart } = useContext(CartContext);

    console.log(cart)


    return (
        <motion.div 
        initial={{ width: 0 }}
        animate={{ width : "100%"}}
        exit={{ x : window.innerWidth }}
        className='container mx-auto lg:w-1/2 w-full pb-24'>
            <h1 className='my-2 font-bold text-xl'>Cart Items</h1>
            <ul className='mb-2 divide-y divide-gray-300'>
                <li className='mb-5 bg-white-500'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <img className='h-20' src="" alt='items' />
                            <span className='font-bold ml-4 w-48'>pizza</span>
                        </div>
                        <div>
                            <button className='bg-yellow-500 font-bold px-4 py-2 rounded-full leading-none'>-</button>
                            <b className='px-4'>2</b>
                            <button className='bg-yellow-500 font-bold px-4 py-2 rounded-full leading-none'>+</button>
                        </div>
                        <span>₹400</span>
                        <button className='bg-red-500 font-bold px-4 py-2 rounded-full leading-none'>Delete</button>
                    </div>
                </li>
            </ul>
            <hr className='divide-y divide-blue-500' />
            <div className='text-right'>
                <b>Grand Total : ₹</b>1200
            </div>
            <div className='text-right mt-6'>
                <button className='bg-yellow-500 font-bold px-4 py-2 rounded-full leading-none'>Order Now</button>
            </div>
        </motion.div>
    )
}

export default CartShell