package com.health.controller;

import com.health.dto.HealthClaimDto;

import com.health.model.HealthClaim;
import com.health.model.HealthPolicy;
import com.health.model.User;
import com.health.service.HealthClaimService;
import com.health.service.HealthPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import com.health.service.UserService;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    @Autowired
    private HealthClaimService healthClaimService;

    @Autowired
    private HealthPolicyService healthPolicyService;
    @Autowired
	private UserService userService;

	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}
	
    @GetMapping("/policies")
    public ResponseEntity<List<HealthPolicy>> getAllPolicies() {
        List<HealthPolicy> policies = healthPolicyService.getAllPolicies();
        return ResponseEntity.ok(policies);
    }

    @PostMapping("/claims")
    public ResponseEntity<HealthClaim> createHealthClaim(@RequestBody HealthClaimDto healthClaimDto) {
        if (healthClaimDto.getClaimAmount() == null || healthClaimDto.getClaimAmount() <= 0) {
            return ResponseEntity.badRequest().body(null);
        }

        Optional<HealthPolicy> policyOptional = healthPolicyService.getPolicyByNumber(healthClaimDto.getPolicyNumber());

        if (!policyOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        HealthPolicy policy = policyOptional.get();

        HealthClaim healthClaim = new HealthClaim();
        healthClaim.setHealthPolicy(policy);
        healthClaim.setClaimDetails(healthClaimDto.getClaimDetails());
        healthClaim.setClaimAmount(healthClaimDto.getClaimAmount());
        healthClaim.setHospitalName(healthClaimDto.getHospitalName());
        healthClaim.setHospitalAddress(healthClaimDto.getHospitalAddress());
        healthClaim.setTreatmentDate(healthClaimDto.getTreatmentDate());
        healthClaim.setTreatmentDetails(healthClaimDto.getTreatmentDetails());
        healthClaim.setClaimNumber(generateClaimNumber());
        healthClaim.setDateOfClaim(LocalDate.now());
        healthClaim.setApproved(false); // Pending approval
        healthClaim.setApprovalDetails(null); // No details initially
        healthClaim.setStatus("pending"); 
        HealthClaim createdClaim = healthClaimService.createHealthClaim(healthClaim);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdClaim);
    }

    @GetMapping("/claims/by-number/{claimNumber}")
    public ResponseEntity<HealthClaim> getClaimStatusByNumber(@PathVariable String claimNumber) {
        Optional<HealthClaim> claim = healthClaimService.getHealthClaimByClaimNumber(claimNumber);
        return claim.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    @GetMapping("/claims")
    public ResponseEntity<List<String>> getAllHealthClaimNumbers() {
        List<String> claimNumbers = healthClaimService.getAllHealthClaims()
                                                     .stream()
                                                     .map(HealthClaim::getClaimNumber)
                                                     .collect(Collectors.toList());
        return ResponseEntity.ok(claimNumbers);
    }

    @PostMapping("/claims/{claimNumber}/approve")
    public ResponseEntity<String> approveClaimByNumber(@PathVariable String claimNumber, @RequestParam String approvalDetails) {
        try {
            HealthClaim updatedClaim = healthClaimService.approveClaimByNumber(claimNumber, approvalDetails);
            return ResponseEntity.ok("Claim approved successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Claim not found");
        }
    }

    @PostMapping("/claims/{claimNumber}/reject")
    public ResponseEntity<String> rejectClaimByNumber(@PathVariable String claimNumber, @RequestParam String approvalDetails) {
        try {
            HealthClaim updatedClaim = healthClaimService.rejectClaimByNumber(claimNumber, approvalDetails);
            return ResponseEntity.ok("Claim rejected successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Claim not found");
        }
    }

    @PostMapping("/purchase-policy")
    public ResponseEntity<String> purchasePolicy(@RequestBody HealthPolicy policy) {
        try {
            Optional<HealthPolicy> existingPolicy = healthPolicyService.getPolicyById(policy.getId());
            if (existingPolicy.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Policy not found");
            }

            HealthPolicy existingPolicyDetails = existingPolicy.get();

            existingPolicyDetails.setCustomerName(policy.getCustomerName());
            existingPolicyDetails.setCustomerEmail(policy.getCustomerEmail());
            existingPolicyDetails.setCustomerAddress(policy.getCustomerAddress());
            existingPolicyDetails.setCustomerPhoneNumber(policy.getCustomerPhoneNumber());

            healthPolicyService.updatePolicy(policy.getId(), existingPolicyDetails);
            return ResponseEntity.status(HttpStatus.CREATED).body("Policy purchased successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to purchase policy");
        }
    }


    @PostMapping("/renew-policy")
    public ResponseEntity<String> renewPolicy(@RequestBody Map<String, String> request) {
        String policyNumber = request.get("policyNumber");

        if (policyNumber == null || policyNumber.isEmpty()) {
            return ResponseEntity.badRequest().body("Policy number is required");
        }

        try {
            healthPolicyService.renewPolicy(policyNumber);
            return ResponseEntity.ok("Policy renewed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to renew policy");
        }
    }

    
    @GetMapping("/uploadpolicies")
	/*
	 * public ResponseEntity<List<HealthPolicy>> getAllPolicies() {
	 * List<HealthPolicy> policies = healthPolicyService.getAllPolicies(); return
	 * ResponseEntity.ok(policies); }
	 */
    @DeleteMapping("/claims/{id}")
    public ResponseEntity<Void> deleteHealthClaim(@PathVariable Long id) {
        try {
            healthClaimService.deleteHealthClaim(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @GetMapping("/policies/{id}")
    public ResponseEntity<HealthPolicy> getPolicyById(@PathVariable Long id) {
        Optional<HealthPolicy> policyOpt = healthPolicyService.getPolicyById(id);
        return policyOpt.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    private String generateClaimNumber() {
        // Use UUID to generate a unique claim number
        return UUID.randomUUID().toString().replace("-", "").substring(0, 12).toUpperCase();
    }
}
