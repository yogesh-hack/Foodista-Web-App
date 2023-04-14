import { useState }from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart } from '../stores/cartSlice';

const ProductList = (props) => {
  const dispatch = useDispatch();
  // console.log(props)
  const [ isAdding, setisAdding ] = useState(false);
  const {product} = props

  const addTocart = (event,product) => {
    // console.log(product)
    dispatch(addToCart(product));
    setisAdding(true);
    setTimeout(() => {
      setisAdding(false);
    },2000)
  }

  return (
    <div className='relative px-2 py-2 sm:w-80 md:w-64 shadow-2xl hover:scale-110 bg-white rounded-xl transition duration-300 ease-in-out'>
        <Link to={`/productsdetails/${product._id}`}>
          <img className='w-full  h-40 sm:w-64 sm:mx-auto' src={product.imageUrl} alt="list"></img>       
        <div class="absolute inline-flex items-center justify-center w-10 h-10 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">{product.save} %</div>
        <div className="text-center">
            <h2 className="text-lg font-bold py-2">{product.name}</h2>
            <span className="bg-gray-200 py-1 rounded-full text-sm px-4">⭐{product.rating}/5</span>
            {/* <div className='absolute font-bold rounded-xl p-1 bg-white/60'></div> */}
        </div>
        </Link>
        
        <div className="flex justify-between items-center mt-4">
            <span className='font-bold'>₹{product.price}<span className='px-1 font-normal text-xs line-through'>₹40</span></span>
            <button disabled={isAdding} onClick={(e) => { addTocart(e,product) }} className={`${ isAdding ? 'bg-green-500' : 'bg-yellow-500'} py-1 px-4 rounded-full font-bold`}>
              { isAdding ? '✓Added' : 'Add' }
            </button>
        </div>
    </div>
  )
}

export default ProductList