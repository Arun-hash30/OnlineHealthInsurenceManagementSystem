package com.health.repository;

import com.health.model.HealthClaim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HealthClaimRepository extends JpaRepository<HealthClaim, Long> {
    Optional<HealthClaim> findByClaimNumber(String claimNumber);
}
