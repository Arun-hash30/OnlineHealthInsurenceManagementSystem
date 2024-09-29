package com.health.service;

import com.health.dto.LoginDTO;
import com.health.model.User;
import com.health.repository.UserRepository;
import com.health.response.LoginMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Update fields
        if (userDetails.getName() != null) user.setName(userDetails.getName());
        if (userDetails.getEmail() != null) {
            if (!userDetails.getEmail().equals(user.getEmail()) && userRepository.existsByEmail(userDetails.getEmail())) {
                throw new RuntimeException("Email already in use");
            }
            user.setEmail(userDetails.getEmail());
        }
        if (userDetails.getPassword() != null) user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        if (userDetails.getRole() != null) user.setRole(userDetails.getRole());

        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    @Override
    public LoginMessage loginUser(LoginDTO loginDTO) {
        Optional<User> userOptional = userRepository.findByEmail(loginDTO.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            boolean isPwdRight = passwordEncoder.matches(loginDTO.getPassword(), user.getPassword());
            if (isPwdRight) {
                String token = jwtService.generateToken(user.getEmail()); // Generate a JWT token
                return new LoginMessage("Login Success", true, user.getRole(), user.getId(), token); // Include token
            } else {
                return new LoginMessage("Password does not match", false, null, null, null);
            }
        } else {
            return new LoginMessage("Email not found", false, null, null, null);
        }
    }


    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email); // Ensure this method exists in UserRepository
    }

    @Override
    public void registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}
