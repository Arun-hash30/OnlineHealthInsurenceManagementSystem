package com.health.controller;

import com.health.dto.ClaimActionRequest;
import com.health.model.HealthClaim;
import com.health.service.HealthClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/agent")
@CrossOrigin(origins = "http://localhost:5173")
public class AgentController {

    private static final Logger logger = LoggerFactory.getLogger(AgentController.class);

    @Autowired
    private HealthClaimService healthClaimService;

    
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

    @PutMapping("/claims/by-number/{claimNumber}/approve")
    public ResponseEntity<HealthClaim> approveClaim(@PathVariable String claimNumber, @RequestBody ClaimActionRequest request) {
        logger.info("Received request to approve claim: {}", claimNumber);
        try {
            HealthClaim approvedClaim = healthClaimService.approveClaimByNumber(claimNumber, request.getApprovalDetails());
            return ResponseEntity.ok(approvedClaim);
        } catch (RuntimeException e) {
            logger.error("Error approving claim: {} - {}", claimNumber, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

   
    @PutMapping("/claims/by-number/{claimNumber}/reject")
    public ResponseEntity<HealthClaim> rejectClaim(@PathVariable String claimNumber, @RequestBody ClaimActionRequest request) {
        logger.info("Received request to reject claim: {}", claimNumber);
        try {
            HealthClaim rejectedClaim = healthClaimService.rejectClaimByNumber(claimNumber, request.getApprovalDetails());
            return ResponseEntity.ok(rejectedClaim);
        } catch (RuntimeException e) {
            logger.error("Error rejecting claim: {} - {}", claimNumber, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}
