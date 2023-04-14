
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart,incrementQuantity,decrementQuantity,removeAllItems } from '../stores/cartSlice'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartShell = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.cart)
    // console.log(products[0]._id)

    const handleremove = (product) => {
        dispatch(removeFromCart(product))
        
    }
    const handleincrement = (product) => {
      
        if (product.quantity < 7) {
            dispatch(incrementQuantity(product))
        }
        else {
            toast.warning("You can Order only 6 items at a time.")
        }
    }
    const handledecrement = (product) => {
        
        if (product.quantity > 1) {
            dispatch(decrementQuantity(product));
        }
        else{
            toast.warning("You can Order atleast 1 items.")
        }
        
    }
    const orderitems = () => {
        dispatch(removeAllItems());
        alert('Your order has been placed!');
    }
    let price = 0;
    products.map(product => (
        price += product.price * product.quantity
    ))
    // console.log(price)

    return (
        <>
            {(products.length === 0) ? (
                <div className="container text-center mx-auto p-10">
                    <span className='text-8xl'>🛒</span>
                    <h1 className='p-10 text-5xl'>Your cart is empty.</h1>
                    <Link to="/" className='text-xl text-red-500 underline hover:text-blue-500'>Go to Home</Link>
                </div>
            ) : (
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ x: window.innerWidth }}
                    className='container  pl-20 pr-20 sm:pl-40 sm:pr-40 mx-auto lg:w-1/2 w-full pb-24'>
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                    <h1 className='my-2 font-bold text-2xl'>Cart Items</h1>
                    <ul className='mb-2'>

                        {products.map(product => (
                            <>
                                {/* {console.log(price += product.price)} */}
                                {console.log(product.quantity)}
                                <li key={product._id} className='mb-5 bg-white-500'>
                                    <div className='sm:flex flex-cols items-center justify-between'>
                                        <div className='flex items-center'>
                                            <img className='h-20 w-20 rounded-lg' src={product.imageUrl} alt='items' />
                                            <span className='font-bold ml-4 w-48'>{product.name}</span>
                                        </div>
                                        <div className='flex p-5'>
                                            <button onClick={() => handledecrement(product)} className='bg-yellow-500 font-bold px-4 py-2 rounded-full leading-none'>-</button>
                                            <b className='px-4'>{product.quantity}</b>
                                            <button onClick={() => handleincrement(product)} className='bg-yellow-500 font-bold px-4 py-2 rounded-full leading-none'>+</button>
                                        </div>
                                        <div className='flex pt-5'>
                                        <span className='pr-10'>₹{product.price * product.quantity}</span>
                                        <button onClick={() => handleremove(product._id)} className='bg-red-500 cursor-pointer font-bold px-4 py-2 rounded-full leading-none'>Delete</button>
                                        </div>
                                    </div>
                                </li>
                                <hr className='divide-y divide-blue-500 mb-3' />
                            </>
                        ))}
                    </ul>
                    <div className='text-right'>
                        <b>Grand Total : ₹</b>{price}
                    </div>
                    <div className='text-right mt-6'>
                        <button onClick = {orderitems} className='bg-yellow-500 font-bold px-4 py-2 rounded-full leading-none'>Order Now</button>
                    </div>
                </motion.div>
            )
            }
        </>
    )
}
export default CartShell