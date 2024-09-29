package com.health.controller;

import com.health.dto.LoginDTO;
import com.health.model.User;
import com.health.response.LoginMessage;
import com.health.service.JwtService;
import com.health.service.UserService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")

public class AuthenticationController {

	@Autowired
	private UserService userService;

	@Autowired
	private JwtService jwtService;

	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {
		if (userService.findUserByEmail(user.getEmail()).isPresent()) {
			return ResponseEntity.badRequest().body("Email is already in use");
		}
		userService.registerUser(user);
		return ResponseEntity.ok("User registered successfully");
	}

	@PostMapping("/create")
	public User createUser(@RequestBody User user) {
		return userService.createUser(user);
	}

	@PostMapping("/login")
	public ResponseEntity<LoginMessage> loginUser(@RequestBody LoginDTO loginDTO) {
		LoginMessage loginMessage = userService.loginUser(loginDTO);
		if (loginMessage.isSuccess()) {
			// Generate JWT token
			String token = jwtService.generateToken(loginDTO.getEmail());
			loginMessage.setToken(token);
			return ResponseEntity.ok(loginMessage);
		}
		return ResponseEntity.status(401).body(loginMessage);
	}

	@GetMapping("/getAll")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		return userService.getUserById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
		return ResponseEntity.ok(userService.updateUser(id, userDetails));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
		return ResponseEntity.noContent().build();
	}
}
