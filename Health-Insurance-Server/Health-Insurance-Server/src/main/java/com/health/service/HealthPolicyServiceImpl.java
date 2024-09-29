package com.health.service;

import com.health.model.HealthPolicy;

import com.health.repository.HealthPolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class HealthPolicyServiceImpl implements HealthPolicyService {

    @Autowired
    private HealthPolicyRepository healthPolicyRepository;

    @Override
    public List<HealthPolicy> getAllPolicies() {
        return healthPolicyRepository.findAll();
    }

    @Override
    public Optional<HealthPolicy> getPolicyByNumber(String policyNumber) {
        return healthPolicyRepository.findByPolicyNumber(policyNumber);
    }

    @Override
    public Optional<HealthPolicy> getPolicyById(Long id) {
        return healthPolicyRepository.findById(id);
    }

    @Override
    public HealthPolicy createPolicy(HealthPolicy policy) {
        policy.setStartDate(LocalDate.now());
        policy.setEndDate(LocalDate.now().plusYears(1));
        return healthPolicyRepository.save(policy);
    }

    @Override
    public HealthPolicy updatePolicy(Long id, HealthPolicy policyDetails) {
        return healthPolicyRepository.findById(id)
            .map(policy -> {
                policy.setCoverageAmount(policyDetails.getCoverageAmount());
                policy.setDescription(policyDetails.getDescription());
                policy.setPolicyName(policyDetails.getPolicyName());
                policy.setPremium(policyDetails.getPremium());
                policy.setDeductible(policyDetails.getDeductible());
                policy.setCoverageDetails(policyDetails.getCoverageDetails());
                policy.setProviderNetwork(policyDetails.getProviderNetwork());
                return healthPolicyRepository.save(policy);
            }).orElseThrow(() -> new RuntimeException("Policy not found"));
    }

    @Override
    public void deletePolicy(Long id) {
        if (!healthPolicyRepository.existsById(id)) {
            throw new RuntimeException("Policy not found");
        }
        healthPolicyRepository.deleteById(id);
    }

    @Override
    public void renewPolicy(String policyNumber) {
        Optional<HealthPolicy> policyOptional = healthPolicyRepository.findByPolicyNumber(policyNumber);

        if (!policyOptional.isPresent()) {
            throw new RuntimeException("Policy not found with policy number: " + policyNumber);
        }

        HealthPolicy policy = policyOptional.get();
        LocalDate newExpiryDate = policy.getEndDate().plusYears(1);
        policy.setEndDate(newExpiryDate);
        healthPolicyRepository.save(policy);
    }
}
