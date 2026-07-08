import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [uid, setUid] = useState("");

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    /*
     * REGISTER USER
     */

    const registerUser = async () => {

        /*
         * VALIDATION
         */

        if(
            uid === "" ||
            name === "" ||
            email === "" ||
            password === ""
        ) {

            alert("Please Fill All Details");

            return;
        }

        /*
         * API CALL
         */

        const response = await fetch(

            `http://localhost:8080/ProductManagment/User?uid=${uid}&name=${name}&email=${email}&password=${password}`,

            {
                method: "POST"
            }
        );

        const data = await response.text();

        /*
         * SUCCESS
         */

        if(data === "User Registered Successfully") {

            alert("Registration Successful");

            navigate('/login');
        }

        else {

            alert(data);
        }
    }

    return (

        <div className="form-container">

            <h1>
                User Register
            </h1>

            {/* USER ID */}

            <input
                type="number"
                placeholder="Enter User ID"
                value={uid}
                onChange={(e) =>
                    setUid(e.target.value)
                }
            />

            {/* NAME */}

            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            {/* EMAIL */}

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            {/* PASSWORD */}

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            {/* REGISTER BUTTON */}

            <button onClick={registerUser}>

                Register

            </button>

        </div>
    );
}