
package daoimpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import daoInterface.UserDaoInterface;
import database.DBConnection;
import model.User;

public class UserDaoImplementation implements UserDaoInterface {

	Connection con = DBConnection.getConnection();

	/*
	 * REGISTER USER
	 */

	@Override
	public boolean registerUser(User user) {

		try {

			String query = "INSERT INTO users(uid,name,email,password) VALUES(?,?,?,?)";

			PreparedStatement ps = con.prepareStatement(query);

			ps.setInt(1, user.getUid());

			ps.setString(2, user.getName());

			ps.setString(3, user.getEmail());

			ps.setString(4, user.getPassword());

			int rows = ps.executeUpdate();

			return rows > 0;
		}

		catch (Exception e) {

			e.printStackTrace();
		}

		return false;
	}

	/*
	 * LOGIN USER
	 */

	@Override
	public User loginUser(String email, String password) {

		try {

			String query = "SELECT * FROM users WHERE email=? AND password=?";

			PreparedStatement ps = con.prepareStatement(query);

			ps.setString(1, email);

			ps.setString(2, password);

			ResultSet rs = ps.executeQuery();

			if (rs.next()) {

				User user = new User();

				user.setUid(rs.getInt("uid"));

				user.setName(rs.getString("name"));

				user.setEmail(rs.getString("email"));

				user.setPassword(rs.getString("password"));

				return user;
			}
		}

		catch (Exception e) {

			e.printStackTrace();
		}

		return null;
	}
}
