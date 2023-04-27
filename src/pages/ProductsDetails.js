import { Link, useParams } from "react-router-dom"
import Rating from "../components/Rating"
import Comments from "../components/Comments"
import { motion } from "framer-motion"
import InputRating from "../components/InputRating"
import { useState, useEffect } from "react"
import Footer from "../components/Footer"
import { useDispatch } from 'react-redux';
import { addToCart } from '../stores/cartSlice';

const ProductsDetails = () => {

    const [product, setproduct] = useState({})
    const params = useParams()
    // console.log(params)

    useEffect(() => {
        fetch(`https://foodista-api.vercel.app/api/product/${params._id}`)
            .then(res => res.json())
            .then(product => {
                // console.log(product)
                setproduct(product)
            })
    }, [])

    const dispatch = useDispatch();
    // console.log(props)
    const [isAdding, setisAdding] = useState(false);

    const addTocart = (event, product) => {
        // console.log(product)
        dispatch(addToCart(product));
        setisAdding(true);
        setTimeout(() => {
            setisAdding(false);
        }, 2000)
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
                        <span>{product.name}</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div x-data="{ image: 1 }" x-cloak>
                                <div className="h-64 md:h-80 rounded-lg bg-gray-100 shadow-2xl  mb-4">
                                    <img className="h-52 md:h-80 mx-auto p-5 hover:scale-150 transition ease-in-out cursor-zoom-in rounded-lg bg-gray-100 mb-4 flex items-center justify-center" src={product.imageUrl} alt="items" />
                                </div>
                            </div>
                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{product.name}</h2>
                            <p className="text-gray-500 text-sm">By India</p>

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
                                <button disabled={isAdding} onClick={(e) => { addTocart(e, product) }} className={`${isAdding ? 'bg-green-500' : 'bg-yellow-500'} py-1 px-4 w-32 rounded-full font-bold`}>
                                    {isAdding ? '✓Added' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <Rating product={product} />
                    <div className="my-10">
                        <Comments name = {"Joe Goldberg"} date= {"August 2023"} heading = {"Tasty Food always,Love it"} comment = {"We like to go to The Fairway every time we come to the Cape. The food is always delicious! This is the first year we could make reservations (probably due to spacing because of the virus). Our waitress, Casey, was great!"} footer = {"The most amazing food ever! And also the staff is so nice to everyone. I highly recommend buying food from here."} />
                        <Comments name = {"Beck Gringle"} date = {"October 2023"} heading = {"Delicous overloadded 🥰"} comment = {"We ate several times at the Fairway because the food was so good. We had breakfast at their sister location the Hole in One (which is attached to the Fairway) every morning. The pastries were delicious and fresh. When we dined for dinner, the food was also fresh and delicious."} footer = {"Group of six of us for a late dinner. Plenty of menu options and service was very good. Food was delicious and we were happy to have leftovers to take home."} />
                    </div>
                    <InputRating />
                </div>

            </motion.div>
            <Footer />
        </>
    )
}

export default ProductsDetails
