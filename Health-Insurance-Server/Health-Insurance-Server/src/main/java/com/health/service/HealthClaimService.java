package com.health.service;

import com.health.model.HealthClaim;

import java.util.List;
import java.util.Optional;

public interface HealthClaimService {
    List<HealthClaim> getAllHealthClaims();

    Optional<HealthClaim> getHealthClaimById(Long id);

    Optional<HealthClaim> getHealthClaimByClaimNumber(String claimNumber);

    HealthClaim createHealthClaim(HealthClaim healthClaim);

    HealthClaim updateHealthClaim(Long id, HealthClaim healthClaimDetails);

    void deleteHealthClaim(Long id);

    HealthClaim approveClaimByNumber(String claimNumber, String approvalDetails);

    HealthClaim rejectClaimByNumber(String claimNumber, String approvalDetails);
}
