package com.health.repository;

import com.health.model.HealthPolicy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HealthPolicyRepository extends JpaRepository<HealthPolicy, Long> {
    List<HealthPolicy> findByCustomerEmail(String customerEmail);
	
    Optional<HealthPolicy> findById(Long Id);   
    
    Optional<HealthPolicy> findByPolicyNumber(String policyNumber);
}
