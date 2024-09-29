package com.health.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "health_claims")
public class HealthClaim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "health_policy_number", referencedColumnName = "policyNumber", nullable = false)
    private HealthPolicy healthPolicy;

    @Column(nullable = false, length = 50)
    private String claimNumber;

    @Column(nullable = false)
    private LocalDate dateOfClaim;

    @Column(nullable = false, length = 50)
    private String claimDetails;

    @Column(nullable = false)
    private Double claimAmount;

    @Column(nullable = false)
    private boolean isApproved = false;

    @Column(length = 50)
    private String approvalDetails;

    @Column(nullable = false, length = 25)
    private String hospitalName;

    @Column(nullable = false, length = 50)
    private String hospitalAddress;

    @Column(nullable = false)
    private LocalDate treatmentDate;

    @Column(nullable = false, length = 50)
    private String treatmentDetails;

    @Column(nullable = false, length = 20)
    private String status;  // Ensure this is not null

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public HealthPolicy getHealthPolicy() {
        return healthPolicy;
    }

    public void setHealthPolicy(HealthPolicy healthPolicy) {
        this.healthPolicy = healthPolicy;
    }

    public String getClaimNumber() {
        return claimNumber;
    }

    public void setClaimNumber(String claimNumber) {
        this.claimNumber = claimNumber;
    }

    public LocalDate getDateOfClaim() {
        return dateOfClaim;
    }

    public void setDateOfClaim(LocalDate dateOfClaim) {
        this.dateOfClaim = dateOfClaim;
    }

    public String getClaimDetails() {
        return claimDetails;
    }

    public void setClaimDetails(String claimDetails) {
        this.claimDetails = claimDetails;
    }

    public Double getClaimAmount() {
        return claimAmount;
    }

    public void setClaimAmount(Double claimAmount) {
        this.claimAmount = claimAmount;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    public String getApprovalDetails() {
        return approvalDetails;
    }

    public void setApprovalDetails(String approvalDetails) {
        this.approvalDetails = approvalDetails;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public String getHospitalAddress() {
        return hospitalAddress;
    }

    public void setHospitalAddress(String hospitalAddress) {
        this.hospitalAddress = hospitalAddress;
    }

    public LocalDate getTreatmentDate() {
        return treatmentDate;
    }

    public void setTreatmentDate(LocalDate treatmentDate) {
        this.treatmentDate = treatmentDate;
    }

    public String getTreatmentDetails() {
        return treatmentDetails;
    }

    public void setTreatmentDetails(String treatmentDetails) {
        this.treatmentDetails = treatmentDetails;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
