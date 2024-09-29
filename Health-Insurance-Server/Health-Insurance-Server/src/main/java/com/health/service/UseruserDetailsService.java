package com.health.service;

import com.health.model.User;
import com.health.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UseruserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Fetch user by email
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // Build and return a UserDetails object
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail()) // Usually email is used as username
                .password(user.getPassword())
                .roles(user.getRole()) // Assuming role is a single role; adapt if needed
                .build();
    }
}
