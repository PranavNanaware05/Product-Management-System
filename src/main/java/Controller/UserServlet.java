
package Controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import daoimpl.UserDaoImplementation;
import model.User;

@WebServlet("/User")

public class UserServlet
extends HttpServlet {

    UserDaoImplementation users =
        new UserDaoImplementation();

    /*
     * CORS METHOD
     */

    void Cors(HttpServletResponse resp) {

        resp.setHeader(
            "Access-Control-Allow-Origin",
            "*"
        );

        resp.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );

        resp.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
        );

        resp.setHeader(
            "Access-Control-Allow-Credentials",
            "true"
        );

        resp.setContentType(
            "application/json"
        );
    }

    /*
     * HANDLE GET
     */

    @Override
    protected void doGet(
            HttpServletRequest req,
            HttpServletResponse resp)
            throws ServletException, IOException {

        doPost(req, resp);
    }

    /*
     * HANDLE POST
     */

    @Override
    protected void doPost(
            HttpServletRequest req,
            HttpServletResponse resp)
            throws ServletException, IOException {

        Cors(resp);

        PrintWriter pw =
            resp.getWriter();

        String action =
            req.getParameter("action");

        /*
         * LOGIN
         */

        if(action != null
                &&
           action.equals("login")) {

            String email =
                req.getParameter("email");

            String password =
                req.getParameter("password");

            /*
             * ADMIN LOGIN
             */

            if(email.equals("admin@gmail.com")
                    &&
               password.equals("admin123")) {

                pw.print(
                    "Admin Login Successful"
                );
            }

            /*
             * USER LOGIN
             */

            else {

                User validUser =

                    users.loginUser(
                        email,
                        password
                    );

                if(validUser != null) {

                    pw.print(
                        "User Login Successful"
                    );
                }

                else {

                    pw.print(
                        "Invalid Credentials"
                    );
                }
            }
        }

        /*
         * REGISTER USER
         */

        else {

            int uid =
                Integer.parseInt(
                    req.getParameter("uid")
                );

            String name =
                req.getParameter("name");

            String email =
                req.getParameter("email");

            String password =
                req.getParameter("password");

            User user =
                new User(
                    uid,
                    name,
                    email,
                    password
                );

            boolean status =
                users.registerUser(user);

            if(status) {

                pw.print(
                    "User Registered Successfully"
                );
            }

            else {

                pw.print(
                    "Registration Failed"
                );
            }
        }
    }

    /*
     * OPTIONS
     */

    @Override
    protected void doOptions(
            HttpServletRequest req,
            HttpServletResponse resp)
            throws ServletException, IOException {

        Cors(resp);

        resp.setStatus(
            HttpServletResponse.SC_OK
        );
    }
}

