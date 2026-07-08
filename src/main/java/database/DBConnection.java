
package database;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

	static Connection con;

	public static Connection getConnection() {

		try {

			/*
			 * LOAD DRIVER
			 */

			Class.forName("com.mysql.cj.jdbc.Driver");

			/*
			 * DATABASE CONNECTION
			 */

			con = DriverManager.getConnection(

					"jdbc:mysql://localhost:3306/productmanagment",

					"root",

					"pranav@123");

			System.out.println("Database Connected Successfully");
		}

		catch (Exception e) {

			e.printStackTrace();
		}

		return con;
	}
}
