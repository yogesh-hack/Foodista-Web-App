import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SeachFilter = ({data}) => {
    const [filterdata, setfilterdata] = useState([]);
    const [wordentered, setwordentered] = useState("")
    // console.log(data.indianfood[0].name)

    const handleFilter = (searchWord) => {
        const SouthFilter = data.southIndian.filter((value) => {
            return (
                // value.favoriteDish.toLowerCase().includes(searchWord.toLowerCase()),
                value.name.toLowerCase().includes(searchWord.toLowerCase())
            )
        })
        const IndianFilter = data.indianfood.filter((value) => {
            return (
                // value.favoriteDish.toLowerCase().includes(searchWord.toLowerCase()),
                value.name.toLowerCase().includes(searchWord.toLowerCase())
            )
        })
        
    return {
        southFilter: SouthFilter ?? [],
        indianFilter: IndianFilter ?? [],
      }

    }
    const handleSearch = (event) => {
        const searchWord = event.target.value;
        setwordentered(searchWord)
        const { southFilter, indianFilter } = handleFilter(searchWord);
        if (searchWord === "") {
            setfilterdata([])
        }else{
            setfilterdata([...southFilter, ...indianFilter]);
        }
      };



    return (
        <form className='w-auto sm:w-96'>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                    type="search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                    placeholder="Search"
                    value={wordentered}
                    onChange={handleSearch}
                />
                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">Search</button>
            </div>
           <div className={(wordentered) ? `h-96 overflow-y-auto absolute bg-white sm:w-96 w-full` : 'h-0'}>
           {filterdata.length != 0 && (
                <div className='p-2'>
                    {filterdata.slice(0,15).map((value) => {
                        return (
                            <Link to={`/productsdetails/${value._id}`} 
                            key={value.name}
                            onClick={() => {
                                setfilterdata([])
                                setwordentered("")
                                // window.location.reload()
                            }}
                            className='flex p-1 items-center justify-between hover:bg-gray-200'>
                                <img className='mb-3 w-20 rounded-lg h-10' src={value.imageUrl} alt='img'/>
                                <p className='mb-3 font-bold '>{value.name}</p>
                            </Link>
                        )
                    })}
                </div>
            )}
           </div>
        </form>
    )
}

export default SeachFilter