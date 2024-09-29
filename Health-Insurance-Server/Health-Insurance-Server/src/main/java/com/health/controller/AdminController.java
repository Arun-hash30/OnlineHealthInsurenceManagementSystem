package com.health.controller;

import com.health.model.HealthClaim;
import com.health.model.HealthPolicy;


import com.health.model.User;
import com.health.service.HealthClaimService;
import com.health.service.HealthPolicyService;
import com.health.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

	@Autowired
	private UserService userService;

	@Autowired
	private HealthPolicyService healthPolicyService;

	   @Autowired
	    private HealthClaimService healthClaimService;
	
	@PostMapping("/create-policies")
	public ResponseEntity<HealthPolicy> createPolicy(@RequestBody HealthPolicy policy) {
		HealthPolicy createdPolicy = healthPolicyService.createPolicy(policy);
		return ResponseEntity.ok(createdPolicy);
	}

	 @GetMapping("/policies")
	    public ResponseEntity<List<HealthPolicy>> getAllPolicies() {
	        List<HealthPolicy> policies = healthPolicyService.getAllPolicies();
	        return ResponseEntity.ok(policies);
	    }

	@PutMapping("/{id}")
	public ResponseEntity<HealthPolicy> updatePolicy(@PathVariable Long id, @RequestBody HealthPolicy policy) {
		HealthPolicy updatedPolicy = healthPolicyService.updatePolicy(id, policy);
		return ResponseEntity.ok(updatedPolicy);
	}

	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePolicy(@PathVariable Long id) {
		healthPolicyService.deletePolicy(id);
		return ResponseEntity.noContent().build();
	}

	 @GetMapping("/claims")
	    public ResponseEntity<List<HealthClaim>> getAllHealthClaims() {
	        List<HealthClaim> claims = healthClaimService.getAllHealthClaims();
	        return ResponseEntity.ok(claims);
	    }


	    @GetMapping("/claims/{id}")
	    public ResponseEntity<HealthClaim> getHealthClaimById(@PathVariable Long id) {
	        Optional<HealthClaim> healthClaim = healthClaimService.getHealthClaimById(id);
	        return healthClaim.map(ResponseEntity::ok)
	                          .orElseGet(() -> ResponseEntity.notFound().build());
	    }

	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}


	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		return userService.getUserById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}


	@DeleteMapping("/users/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
		try {
			userService.deleteUser(id);
			return ResponseEntity.ok("User deleted successfully");
		} catch (RuntimeException e) {
			return ResponseEntity.status(404).body("User not found");
		}
	}
}
