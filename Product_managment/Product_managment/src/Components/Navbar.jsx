import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {

    /*
     * GET SESSION DATA
     */

    const role =
        sessionStorage.getItem("role");

    const username =
        sessionStorage.getItem("username");

    /*
     * LOGOUT FUNCTION
     */

    const navigate = useNavigate();

    const logoutUser = () => {

        // Remove only authentication/session keys — keep orders and cart intact
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("username");

        console.log('Logout: cleared auth keys, preserved orders/cart in sessionStorage');

        alert("Logout Successful");

        navigate('/login');
    }

    return (

        <div id="nav">

            {/* LEFT SIDE */}

            <div className="nav-left">

                {/* COMMON LINKS */}

                <Link to="/">
                    Dashboard
                </Link>

                {/* USER FEATURES */}

                {
                    role === "user"
                    &&
                    <>
                        <Link to="/cart">
                            Cart
                        </Link>

                        <Link to="/orders">
                            My Orders
                        </Link>
                    </>
                }

                {/* ADMIN FEATURES */}

                {
                    role === "admin"
                    &&
                    <>
                        <Link to="/add">
                            Add Product
                        </Link>

                        <Link to="/update">
                            Update Product
                        </Link>

                        <Link to="/admin-orders">
                            Manage Orders
                        </Link>
                    </>
                }

            </div>

            {/* RIGHT SIDE */}

            <div className="nav-right">

                {/* BEFORE LOGIN */}

                {
                    role == null
                    &&
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                }

                {/* AFTER LOGIN */}

                {
                    role != null
                    &&
                    <>
                        <span className="welcome-user">

                            Welcome {username}

                        </span>

                        <button
                            onClick={logoutUser}
                            className="logout-btn"
                        >

                            Logout

                        </button>
                    </>
                }

            </div>

        </div>
    );
}