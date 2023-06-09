import { Link, useParams } from "react-router-dom"
import Rating from "../components/Rating"
import Comments from "../components/Comments"
import { motion } from "framer-motion"
import InputRating from "../components/InputRating"
import { CartContext } from '../pages/CartContext'
import { useState, useEffect, useContext } from "react"
import ProductList from "../components/ProductList"

const ProductsDetails = () => {

    const [product, setproduct] = useState({})
    const [food, setfood] = useState({})
    const params = useParams()
    console.log(params)

    useEffect(() => {
        fetch(`http://localhost:8080/api/product/${params._id}`)
            .then(res => res.json())
            .then(product => {
                // console.log(product)
                setproduct(product)
            })
    }, [])

    const [products, setPoducts] = useState([]);
    const [foods, setfoods] = useState([]);
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': "application/json"
        }
    };
    
    const [isAdding, setisAdding] = useState(false);
    const { cart, setCart } = useContext(CartContext);

    const addTocart = (event, product) => {
        // console.log(product)
        let _cart = { ...cart }
        if (!_cart.items) {
            _cart.items = {}
        }
        if (_cart.items[product._id]) {
            _cart.items[product._id] += 1
        } else {
            _cart.items[product._id] = 1
        }
        if (!_cart.totalItems) {
            _cart.totalItems = 0
        }
        _cart.totalItems += 1
        setCart(_cart)
        setisAdding(true);
        // setTimeout(() => {
        //   setisAdding(false);
        // },2000)
    }

    return (
        <>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth }}
                className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Link to="/" className="hover:underline hover:text-gray-600">Home</Link>
                        <span>
                            <svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                        <Link to="/products" className="hover:underline hover:text-gray-600">Products</Link>
                        <span>
                            <svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                        <span>{!(food) ? product.favoriteDish : food.name}</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div x-data="{ image: 1 }" x-cloak>
                                <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                                    <img className="h-52 md:h-80 mx-auto p-5 rounded-lg bg-gray-100 mb-4 flex items-center justify-center" src={product.imageUrl} alt="items" />
                                </div>
                            </div>
                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">South India Dish {product.favoriteDish} {food.name}</h2>
                            <p className="text-gray-500 text-sm">By {product.name}, India</p>

                            <div className="flex items-center space-x-4 my-4">
                                <div>
                                    <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                        <span className="text-indigo-400 mr-1 mt-1">₹</span>
                                        <span className="font-bold text-indigo-600 text-3xl">{product.price}</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-green-500 text-xl font-semibold">Save {product.save}%</p>
                                    <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                                </div>
                            </div>

                            <p className="text-gray-500">{product.desc}</p>

                            <div className="flex py-4 space-x-4">
                                <div className="relative">
                                    <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">Qty</div>
                                    <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>

                                    <svg className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                    </svg>
                                </div>
                                <button disabled={isAdding} onClick={(e) => { addTocart(e, product) }} className={`${isAdding ? 'bg-green-500' : 'bg-orange-500'} h-14 px-6 py-2 font-semibold rounded-xl  text-white`}>
                                    {isAdding ? '✔️Added' : ' Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <Rating product={product} />
                    <div className="my-10">
                        <Comments />
                        <Comments />
                    </div>
                    <InputRating />
                </div>

            </motion.div>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also ordered</h2>

                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {
                            products.map(product => <ProductList key={product._id} product={product} />)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsDetails