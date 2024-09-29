package com.health.service;

import com.health.dto.LoginDTO;

import com.health.model.User;
import com.health.response.LoginMessage;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User createUser(User user);
    User updateUser(Long id, User userDetails);
    void deleteUser(Long id);
    LoginMessage loginUser(LoginDTO loginDTO);
    Optional<User> findUserByEmail(String email); // Ensure this method is declared
    void registerUser(User user);
}
