import {useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SeachFilter from './SeachFilter'
import { auth } from '../firebase';
import { useSelector } from 'react-redux'

const Navigation = (props) => {
    // const history = useHistory();
    const navigate = useNavigate()

    const items = useSelector((state) => state.cart)
    // console.log(items)
    const API_KEY = 'foodistagWC91AJPrXEHpZci9LFoZ1pJ6eAbAFgJ0hoaqm6bMU748pcL3jvDBQbWD8CugZFxaO3wDMTRCWQmyNKA0hTfSwLwP7iROuK7CPA0n0TGY3VuRBINPjRL4ZAN';

    const handleLogout = () => {
        auth.signOut().then(() => {
          // Sign-out successful.
          console.log('User signed out.');
          navigate("/login")
        }).catch((error) => {
          // An error happened.
          console.error(error);
        });
    }

    const [open, setopen] = useState(false);
    const node = useRef();
    const clickOutside = (e) => {
        if (node.current.contains(e.target)) {
            // inside click
            // console.log('clicked inside')
            return;
        }
        // outside click
        // console.log('clicked outside scope')
        setopen(false)
    }
    // Do something after component renders
    useEffect(() => {
        document.addEventListener('mousedown', clickOutside);
        // clean up function before running new effect
        return () => {
            document.removeEventListener('mousedown', clickOutside);
        }
    }, [open])

    const [products, setPoducts] = useState([]);
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': "application/json"
        }
    };

    useEffect(() => {
        fetch(`https://foodista-api.vercel.app/api/product?apiKey=${API_KEY}`, options)
            .then(response => response.json())
            .then(products => {
                setPoducts(products)
            })
            .catch(err => console.error(err));
    }, [])

    return (
        <>
            <nav className='container mx-auto flex items-center justify-between py-2'>
                <Link to='/'>
                    <img className='rounded-full' style={{ height: 50 }} src='/images/logo.png' alt='logo'></img>
                </Link>

                
                <div className='hidden sm:block'>
                <SeachFilter data={products} />
                </div>

                <ul className='flex items-center'>
                    <li className='ml-6 hover:underline'><Link to='/'>Home</Link></li>
                    <li className='ml-6 mr-6 hover:underline'><Link to='/products'>Products</Link></li>
                    {!(props.name) && (
                        < li className='ml-6 px-2 py-2 text-white rounded bg-gray-800'><Link to='/login'>Login</Link></li>
                    )}
                    {(props.name) && (
                        <div class="relative flex p-1">
                            <img ref={node} onClick={() => setopen(!open)} className="w-10 h-10 rounded-full cursor-pointer" src="https://cdn-icons-png.flaticon.com/512/706/706807.png" alt="avatar" />
                            <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white  rounded-full"></span>
                        </div>

                    )}
                    <li className='ml-6'>
                        <Link to='/cart'>
                            <div className="relative py-2">
                                <div className="t-0 absolute left-3">
                                    <p className={(!items.length) ? `hidden` : `flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white`}>{items.length}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="file: mt-4 h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </div>
                        </Link>
                    </li>

                </ul>
                {(props.name) && (
                    <div id="userDropdown" ref={node} className={`${open ? 'absolute ml-[82%] mt-[16rem] z-10 bg-white divide-y text-gray-500 divide-gray-400 rounded-lg shadow w-44' : 'absolute hidden ml-[82%] mt-[3rem] z-10 bg-white divide-y text-gray-500 divide-gray-400 rounded-lg shadow w-44'}`}>
                        <div className="px-4 py-3 text-sm text-gray-900">
                            <div>{props.name}</div>
                            <div className="font-medium truncate">{props.email}</div>
                        </div>
                        <ul className="py-2 text-sm text-gray-700 " aria-labelledby="avatarButton">
                            <li>
                                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-300 ">Profile</Link>
                            </li>
                            <li>
                                <Link to="/saved" className="block px-4 py-2 hover:bg-gray-300 ">Saved</Link>
                            </li>
                        </ul>
                        <div class="py-1">
                            <p onClick={handleLogout} className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Sign out</p>
                        </div>
                    </div>
                )}

            </nav >

        </>
    )
}
export default Navigation
