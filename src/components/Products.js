import ProductList from "./ProductList"
import { useState, useEffect } from 'react'
import { motion } from "framer-motion"


const Products = () => {
  // const { name } = useContext(CartContext);
  const [loading, setloading] = useState(true)
  const [products, setPoducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [IndianPage, setIndianPage] = useState(1);
  const [pageSize] = useState(10);
  const API_KEY = 'foodistagWC91AJPrXEHpZci9LFoZ1pJ6eAbAFgJ0hoaqm6bMU748pcL3jvDBQbWD8CugZFxaO3wDMTRCWQmyNKA0hTfSwLwP7iROuK7CPA0n0TGY3VuRBINPjRL4ZAN';

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': "application/json",
    }
  };

  useEffect(() => {
    // console.log(loading)
    fetch(`http://localhost:8080/api/product?page=${currentPage}&pageSize=${pageSize}&apiKey=${API_KEY}`, options)
      .then(response => response.json())
      .then(products => {
        // console.log(products.southIndian[0]._id);
        setPoducts(products)
        setTimeout(() => {
          setloading(false)
        }, 2000);
        // console.log(loading)
      })
      .catch(err => console.error(err));
  }, [currentPage, pageSize,API_KEY])

  // console.log(products.southIndian.length)

  function handlePreviousClick() {
    setCurrentPage(currentPage - 1);
  }

  function handleNextClick() {
    setCurrentPage(currentPage + 1);
  }
  function handleIndianPreviousClick() {
    setIndianPage(IndianPage - 1);
  }

  function handleIndianNextClick() {
    setIndianPage(IndianPage + 1);
  }

  if (loading) {
    // console.log("loading....")
    return (
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth }}
        className="mx-auto h-screen my-auto flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg ">
        <div className="flex flex-col">
        <img className="h-64 w-auto" src="./images/loading.gif" alt="loading"/>
        <button disabled type="button" class="py-2.5 px-5 mr-2 text-2xl font-medium text-gray-900">
          <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
          </svg>
          Loading...
        </button>
        </div>
      </motion.div>
    )
  } else {
    // console.log("fetch data")

    return (
      <>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ x: window.innerWidth }} className="container mx-auto pb-24">
          <h1 className="text-2xl font-bold py-8">South Indian Foods</h1>
          <div>
            <div className="grid grid-cols-2 my-5 gap-8 sm:grid-cols-2 md:grid-cols-4 gap-10 transition duration-300 ease-in-out">
              {products.southIndian.map(item => (
                <ProductList key={item._id} product={item} />

              ))}
            </div>

            <div class="flex flex-col items-center">
              <span class="text-sm text-gray-700 dark:text-gray-400">
                Showing <span class="font-semibold text-gray-900 text-black">{currentPage}</span> to <span class="font-semibold text-gray-900 text-black">{pageSize}</span> of <span class="font-semibold text-black text-gray-900">{products.southIndian.length}</span> Entries
              </span>
              <div class="inline-flex mt-2 xs:mt-0">
                {currentPage > 1 && (
                  <button onClick={handlePreviousClick} class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                    Prev
                  </button>
                )}
                {currentPage && (
                  <button onClick={handleNextClick} class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                    <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                )}
              </div>
            </div>

          </div>
          <h1 className="text-2xl font-bold py-8">Indian Sweets & Foods</h1>
          <div>
            <div className="grid grid-cols-2 my-5 gap-8 sm:grid-cols-2 md:grid-cols-4 gap-10 transition duration-300 ease-in-out">
              {products.indianfood.map(item => (
                <ProductList key={item.name} product={item} />
              ))}
            </div>
          </div>
        </motion.div>
      </>
    )
  }
}
export default Products