import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../config/api';

export default function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const loginUser = async () => {

        const response = await fetch(
            `${API_BASE}/User?action=login&email=${email}&password=${password}`,
            {
                method: 'POST'
            }
        );

        const data = await response.text();

        console.log(data);

        /*
         * =========================
         * ADMIN SESSION
         * =========================
         */

        if(data === "Admin Login Successful") {

            sessionStorage.setItem("role", "admin");

            sessionStorage.setItem("email", email);
            sessionStorage.setItem("username", email);

            alert("Welcome Admin");

            navigate('/');
        }

        /*
         * =========================
         * USER SESSION
         * =========================
         */

        else if(data === "User Login Successful") {

            sessionStorage.setItem("role", "user");

            sessionStorage.setItem("email", email);
            sessionStorage.setItem("username", email);

            alert(`Welcome ${data}`);

            navigate('/');
        }

        /*
         * =========================
         * INVALID LOGIN
         * =========================
         */

        else {

            alert("Invalid Credentials");
        }
    }

    return (

        <div className="form-container">

            <h1>User Login</h1>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={loginUser}>
                Login
            </button>

        </div>
    );
}