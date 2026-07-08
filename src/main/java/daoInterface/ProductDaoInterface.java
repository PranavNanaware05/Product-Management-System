package daoInterface;

import java.util.ArrayList;

import model.Product;

public interface ProductDaoInterface {

    /*
     * GET ALL PRODUCTS
     */

    ArrayList<Product> getAllProducts();

    /*
     * GET PRODUCT BY ID
     */

    Product getProductById(int pid);

    /*
     * SEARCH PRODUCT
     */

    ArrayList<Product> getProductbyName(String pname);

    /*
     * UPDATE PRODUCT
     */

    boolean updateProduct(
            int pid,
            String newName
    );

    /*
     * ADD PRODUCT
     */

    boolean addProduct(Product p);
}