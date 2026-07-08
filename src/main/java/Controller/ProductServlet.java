
package Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import daoInterface.ProductDaoInterface;
import daoimpl.ArralistDAOImplementation;
import model.Product;

@WebServlet("/Product")

public class ProductServlet
extends HttpServlet {

    ProductDaoInterface products =
        new ArralistDAOImplementation();

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
            "Content-Type"
        );

        resp.setContentType(
            "application/json"
        );
    }

    /*
     * GET PRODUCTS
     */

    @Override
    protected void doGet(
            HttpServletRequest req,
            HttpServletResponse resp)
            throws ServletException, IOException {

        Cors(resp);

        PrintWriter pw =
            resp.getWriter();

        String search =
            req.getParameter("search");

        ArrayList<Product> temp;

        if(search != null
                &&
           !search.trim().isEmpty()) {

            temp =
                products.getProductbyName(search);
        }

        else {

            temp =
                products.getAllProducts();
        }

        ObjectMapper obj =
            new ObjectMapper();

        String json =
            obj.writeValueAsString(temp);

        pw.print(json);
    }

    /*
     * ADD PRODUCT
     */

    @Override
    protected void doPost(
            HttpServletRequest req,
            HttpServletResponse resp)
            throws ServletException, IOException {

        Cors(resp);

        ObjectMapper obj =
            new ObjectMapper();

        Product p =
            obj.readValue(
                req.getReader(),
                Product.class
            );

        boolean added =
            products.addProduct(p);

        PrintWriter pw =
            resp.getWriter();

        if(added) {

            pw.print(
                "Product Added Successfully"
            );
        }

        else {

            pw.print(
                "Failed To Add Product"
            );
        }
        
    }

    /*
     * UPDATE PRODUCT
     */

    @Override
    protected void doPut(
            HttpServletRequest req,
            HttpServletResponse resp)
            throws ServletException, IOException {

        Cors(resp);

        int pid =
            Integer.parseInt(
                req.getParameter("id")
            );

        String newName =
            req.getParameter("name");

        boolean updated =
            products.updateProduct(
                pid,
                newName
            );

        PrintWriter pw =
            resp.getWriter();

        if(updated) {

            pw.print(
                "Product Updated Successfully"
            );
        }

        else {

            pw.print(
                "Product Not Found"
            );
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

