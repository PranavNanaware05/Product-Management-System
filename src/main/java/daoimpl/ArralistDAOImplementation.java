
package daoimpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import daoInterface.ProductDaoInterface;
import database.DBConnection;
import model.Product;

public class ArralistDAOImplementation implements ProductDaoInterface {

	Connection con = DBConnection.getConnection();

	/*
	 * GET ALL PRODUCTS
	 */

	@Override
	public ArrayList<Product> getAllProducts() {

		ArrayList<Product> products = new ArrayList<>();

		try {

			String query = "SELECT * FROM products";

			PreparedStatement ps = con.prepareStatement(query);

			ResultSet rs = ps.executeQuery();

			
			while (rs.next()) {

				Product p = new Product();
				
				p.setPid(rs.getInt("pid"));

				p.setPname(rs.getString("pname"));

				p.setProductDiscription(rs.getString("description"));

				p.setProductCategory(rs.getString("productCategory"));

				p.setProductPrice(rs.getDouble("price"));

				p.setRating(rs.getDouble("rating"));

				p.setStock(rs.getInt("stock"));

				p.setProoductBrand(rs.getString("brand"));

				p.setImage(rs.getString("image"));

				products.add(p);
			}
		}

		catch (Exception e) {

			e.printStackTrace();
		}

		return products;
	}

	/*
	 * GET PRODUCT BY ID
	 */

	@Override
	public Product getProductById(int pid) {

		try {

			String query = "SELECT * FROM products WHERE pid=?";

			PreparedStatement ps = con.prepareStatement(query);

			ps.setInt(1, pid);

			ResultSet rs = ps.executeQuery();

			if (rs.next()) {

				Product p = new Product();

				p.setPid(rs.getInt("pid"));

				p.setPname(rs.getString("pname"));

				p.setProductDiscription(rs.getString("description"));

				p.setProductCategory(rs.getString("productCategory"));

				p.setProductPrice(rs.getDouble("price"));

				p.setRating(rs.getDouble("rating"));

				p.setStock(rs.getInt("stock"));

				p.setProoductBrand(rs.getString("brand"));

				p.setImage(rs.getString("image"));

				return p;
			}
		}

		catch (Exception e) {

			e.printStackTrace();
		}

		return null;
	}

	/*
	 * SEARCH PRODUCT
	 */

	@Override
	public ArrayList<Product> getProductbyName(String pname) {

		ArrayList<Product> products = new ArrayList<>();

		try {

			String query = "SELECT * FROM products WHERE pname LIKE ?";

			PreparedStatement ps = con.prepareStatement(query);

			ps.setString(1, "%" + pname + "%");

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {

				Product p = new Product();

				p.setPid(rs.getInt("pid"));

				p.setPname(rs.getString("pname"));

				p.setProductDiscription(rs.getString("description"));

				p.setProductCategory(rs.getString("productCategory"));

				p.setProductPrice(rs.getDouble("price"));

				p.setRating(rs.getDouble("rating"));

				p.setStock(rs.getInt("stock"));

				p.setProoductBrand(rs.getString("brand"));

				p.setImage(rs.getString("image"));

				products.add(p);
			}
		}

		catch (Exception e) {

			e.printStackTrace();
		}

		return products;
	}

	/*
	 * UPDATE PRODUCT
	 */

	@Override
	public boolean updateProduct(int pid, String newName) {

		try {

			String query = "UPDATE products SET pname=? WHERE pid=?";

			PreparedStatement ps = con.prepareStatement(query);

			ps.setString(1, newName);

			ps.setInt(2, pid);

			int rows = ps.executeUpdate();

			return rows > 0;
		}

		catch (Exception e) {

			e.printStackTrace();
		}

		return false;
	}

	/*
	 * ADD PRODUCT
	 */

	@Override
	public boolean addProduct(Product p) {

		try {

			String query = "INSERT INTO products(pname, brand, price, stock, description, image, rating, productCategory) VALUES(?,?,?,?,?,?,?,?)";

			PreparedStatement ps = con.prepareStatement(query);

			ps.setString(1, p.getPname());

			ps.setString(2, p.getProoductBrand());

			ps.setDouble(3, p.getProductPrice());

			ps.setInt(4, p.getStock());

			ps.setString(5, p.getProductDiscription());

			ps.setString(6, p.getImage());

			ps.setDouble(7, p.getRating());

			ps.setString(8, p.getProductCategory());

			int rows = ps.executeUpdate();

			return rows > 0;
		}

		catch (Exception e) {

			e.printStackTrace();
		}

		return false;
	}
}
