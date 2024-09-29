package com.health.service;

import com.health.model.HealthPolicy;

import java.util.List;
import java.util.Optional;

public interface HealthPolicyService {
    HealthPolicy createPolicy(HealthPolicy policy);
    List<HealthPolicy> getAllPolicies();
    Optional<HealthPolicy> getPolicyByNumber(String policyNumber);
    Optional<HealthPolicy> getPolicyById(Long id);
    HealthPolicy updatePolicy(Long id, HealthPolicy policyDetails);
    void deletePolicy(Long id);
    void renewPolicy(String policyNumber);
}
