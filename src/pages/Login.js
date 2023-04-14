
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Login = () => {
    const navigate = useNavigate()
    const [values, setvalue] = useState({
        email: "",
        password: ""
    })
    const [login, setlogin] = useState(false)
    const [errormsg, seterromsg] = useState("");

    const handleloggedin = () => {
        if (!values.email || !values.password) {
            seterromsg(toast.error("Required All Fields.."))
            return
        }
        seterromsg("")
        setlogin(true)
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then(async (res) => {
                setlogin(false)
                navigate("/")
            }).catch((err) => {
                setlogin(false)
                seterromsg(toast.error(err.message))
            })
    }
    return (
        <>
            <section className="h-screen">
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <div className="px-6 h-screen text-gray-800">
                    <div
                        className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div
                            className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                            <img src="./images/delivery.png" alt="deleivery" />
                        </div>
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <Link to='/'>
                                <img className='mx-auto rounded-full' style={{ height: 50 }} src='/images/logo.png' alt='logo'></img>
                            </Link>
                            <form>
                                <h1 className="text-3xl p-5">Sign in with Foodista</h1>

                                <div className="mb-6">
                                    <input
                                        onChange={(event) => setvalue((prev) => ({ ...prev, email: event.target.value }))}
                                        type="email"
                                        placeholder="Email"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    />
                                </div>


                                <div className="mb-6">
                                    <input
                                        onChange={(event) => setvalue((prev) => ({ ...prev, password: event.target.value }))}
                                        type="password"
                                        placeholder="••••••••"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            id="exampleCheck2"
                                        />
                                        <label className="form-check-label inline-block text-gray-800" for="exampleCheck2"
                                        >Remember me</label>
                                    </div>
                                    <a href="#!" className="text-gray-800">Forgot password?</a>
                                </div>

                                <div className="text-center lg:text-left">
                                    <button
                                        onClick={handleloggedin} disabled={login}
                                        type="submit"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                        Login
                                    </button>
                                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                        Don't have an account?
                                        <Link to='/register'><a className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Register</a ></Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login