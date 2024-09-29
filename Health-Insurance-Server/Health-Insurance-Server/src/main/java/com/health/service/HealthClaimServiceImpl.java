package com.health.service;

import com.health.model.HealthClaim;
import com.health.repository.HealthClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HealthClaimServiceImpl implements HealthClaimService {

    @Autowired
    private HealthClaimRepository healthClaimRepository;

    @Override
    public List<HealthClaim> getAllHealthClaims() {
        return healthClaimRepository.findAll();
    }

    @Override
    public Optional<HealthClaim> getHealthClaimById(Long id) {
        return healthClaimRepository.findById(id);
    }

    @Override
    public Optional<HealthClaim> getHealthClaimByClaimNumber(String claimNumber) {
        return healthClaimRepository.findByClaimNumber(claimNumber);
    }

    @Override
    public HealthClaim createHealthClaim(HealthClaim healthClaim) {
        return healthClaimRepository.save(healthClaim);
    }

    @Override
    public HealthClaim updateHealthClaim(Long id, HealthClaim healthClaimDetails) {
        HealthClaim healthClaim = healthClaimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found"));
        healthClaim.setClaimAmount(healthClaimDetails.getClaimAmount());
        healthClaim.setClaimDetails(healthClaimDetails.getClaimDetails());
        healthClaim.setHospitalName(healthClaimDetails.getHospitalName());
        healthClaim.setHospitalAddress(healthClaimDetails.getHospitalAddress());
        healthClaim.setTreatmentDate(healthClaimDetails.getTreatmentDate());
        healthClaim.setTreatmentDetails(healthClaimDetails.getTreatmentDetails());
        return healthClaimRepository.save(healthClaim);
    }

    @Override
    public void deleteHealthClaim(Long id) {
        HealthClaim healthClaim = healthClaimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found"));
        healthClaimRepository.delete(healthClaim);
    }

    @Override
    public HealthClaim approveClaimByNumber(String claimNumber, String approvalDetails) {
        return changeClaimApprovalStatusByNumber(claimNumber, true, approvalDetails);
    }

    @Override
    public HealthClaim rejectClaimByNumber(String claimNumber, String approvalDetails) {
        return changeClaimApprovalStatusByNumber(claimNumber, false, approvalDetails);
    }

    private HealthClaim changeClaimApprovalStatusByNumber(String claimNumber, boolean status, String approvalDetails) {
        HealthClaim claim = getHealthClaimByClaimNumber(claimNumber)
                .orElseThrow(() -> new RuntimeException("Claim not found"));
        claim.setApproved(status);
        claim.setApprovalDetails(approvalDetails);
        claim.setStatus(status ? "approved" : "rejected");
        return healthClaimRepository.save(claim);
    }
}
