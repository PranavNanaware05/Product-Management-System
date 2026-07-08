package daoInterface;

import model.User;

public interface UserDaoInterface {

    boolean registerUser(User user);

    User loginUser(String email , String password);
}