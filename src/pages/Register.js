import { Link, useNavigate} from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

const Register = () => {
    const navigate = useNavigate()
    const [values, setvalue] = useState({
        email: "",
        name: "",
        password: ""
    })
    const [signup, setsignup] = useState(false)
    const [errormsg, seterromsg] = useState("");
    const handlesignup = () => {
        if (!values.name || !values.email || !values.password) {
            seterromsg(toast.error("Required All Fields.."))
            return
        }
        seterromsg("")
        setsignup(true)
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(async (res) => {
                setsignup(false)
                const user = res.user;
                await updateProfile(user, {
                    displayName: values.name,
                })
                navigate("/")
            }).catch((err) => {
                setsignup(false)
                seterromsg(toast.error(err.message))
            })
    }
    return (
        <>
            <section className="h-screen">
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
                <div className="px-6 h-screen text-gray-800">
                    <div
                        className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div
                            className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                            <img src="./images/registrer.png" alt="register" />
                        </div>
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <form>
                                Gooogle Authentication
                                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                    <p className="text-center font-semibold mx-4 mb-0">Or</p>
                                </div>

                                <div className="mb-6">
                                    <input
                                        onChange={(event) => setvalue((prev) => ({ ...prev, email: event.target.value }))}
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Your Email "
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        onChange={(event) => setvalue((prev) => ({ ...prev, name: event.target.value }))}
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Full Name"
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        onChange={(event) => setvalue((prev) => ({ ...prev, password: event.target.value }))}
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        onChange={(event) => setvalue((prev) => ({ ...prev, password: event.target.value }))}
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Confirmed Password"
                                    />
                                </div>



                                <div className="text-center lg:text-left">
                                    <button
                                        onClick={handlesignup} disabled={signup}
                                        type="button"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                        Register
                                    </button>
                                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                        Already have an account?
                                        <Link to='/login'><a className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Login</a ></Link>
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

export default Register