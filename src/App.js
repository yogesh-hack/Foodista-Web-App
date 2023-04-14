import { Link, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/CartShell'
import Navigation from './components/Navigation'
import Products from './pages/Products'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductsDetails from './pages/ProductsDetails'
import { AnimatePresence } from "framer-motion";
import { auth } from './firebase';
import Profile from './pages/Profile'
import { Provider } from 'react-redux';
import store from './stores/store';
import { useRoutes, useMatch } from 'react-router-dom';

function NavigationWrapper({ name, email }) {
    // let isauthorized = false;
    // if(name && email) {
    //     isauthorized = true;
    // }else{
    //     isauthorized = false;
    // }
    const routes = useRoutes([
        { path: '/', element: <Home /> },
        { path: '/cart', element: <Cart /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/products', element: <Products /> },
        { path: '/productsdetails/:_id', element: <ProductsDetails /> },
        { path: '/profile', element: <Profile name={name} email={email} /> },
    ]);

    const isLoginPage = useMatch('/login');
    const isRegisterPage = useMatch('/register');

    return (
        <div className='bg-white/70'>
            {!isLoginPage && !isRegisterPage && <Navigation name={name} email={email} />}
            {routes}
        </div>
    );
}

function App() {
    // firebase auth
    const [username, setusername] = useState("");
    const [usermail, setusermail] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // console.log(user)
                setusername(user.displayName)
                setusermail(user.email)
            } else {
                setusername("")
                setusermail("")
            }
        })
    }, [])

    return (
        <>
            <AnimatePresence>
                <Provider store={store}>
                    <Router>
                        <div className='bg-white/70'>
                            <NavigationWrapper name={username} email={usermail} />
                        </div>
                    </Router>
                </Provider>
            </AnimatePresence>
        </>
    )
}
export default App