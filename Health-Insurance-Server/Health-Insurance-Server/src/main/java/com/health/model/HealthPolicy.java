package com.health.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "health_policies")
public class HealthPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 25)
    private String policyNumber;

    @Column(nullable = false, length = 25)
    private String policyName;

    @Column(nullable = false, length = 50)
    private String description;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal premium;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal coverageAmount;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal deductible;

    @Column(nullable = false, length = 50)
    private String coverageDetails;

    @Column(nullable = false, length = 50)
    private String providerNetwork;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    // Allow customer-related fields to be null
    @Column(nullable = true, length = 50)
    private String customerName;

    @Column(nullable = true, length = 50)
    private String customerEmail;

    @Column(nullable = true, length = 100)
    private String customerAddress;

    @Column(nullable = true, length = 15)
    private String customerPhoneNumber;

    @Column(nullable = true, length = 15)
    private String customerPayment;

    
    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPolicyNumber() {
        return policyNumber;
    }

    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPremium() {
        return premium;
    }

    public void setPremium(BigDecimal premium) {
        this.premium = premium;
    }

    public BigDecimal getCoverageAmount() {
        return coverageAmount;
    }

    public void setCoverageAmount(BigDecimal coverageAmount) {
        this.coverageAmount = coverageAmount;
    }

    public BigDecimal getDeductible() {
        return deductible;
    }

    public void setDeductible(BigDecimal deductible) {
        this.deductible = deductible;
    }

    public String getCoverageDetails() {
        return coverageDetails;
    }

    public void setCoverageDetails(String coverageDetails) {
        this.coverageDetails = coverageDetails;
    }

    public String getProviderNetwork() {
        return providerNetwork;
    }

    public void setProviderNetwork(String providerNetwork) {
        this.providerNetwork = providerNetwork;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public String getCustomerPhoneNumber() {
        return customerPhoneNumber;
    }

    public void setCustomerPhoneNumber(String customerPhoneNumber) {
        this.customerPhoneNumber = customerPhoneNumber;
    }

    public String getCustomerPayment() {
		return customerPayment;
	}

	public void setCustomerPayment(String customerPayment) {
		this.customerPayment = customerPayment;
	}

		
    @Override
	public String toString() {
		return "HealthPolicy [id=" + id + ", policyNumber=" + policyNumber + ", policyName=" + policyName
				+ ", description=" + description + ", premium=" + premium + ", coverageAmount=" + coverageAmount
				+ ", deductible=" + deductible + ", coverageDetails=" + coverageDetails + ", providerNetwork="
				+ providerNetwork + ", startDate=" + startDate + ", endDate=" + endDate + ", customerName="
				+ customerName + ", customerEmail=" + customerEmail + ", customerAddress=" + customerAddress
				+ ", customerPhoneNumber=" + customerPhoneNumber + ", customerPayment=" + customerPayment + "]";
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HealthPolicy that = (HealthPolicy) o;
        return Objects.equals(id, that.id) && 
               Objects.equals(policyNumber, that.policyNumber) &&
               Objects.equals(policyName, that.policyName) &&
               Objects.equals(description, that.description) &&
               Objects.equals(premium, that.premium) &&
               Objects.equals(coverageAmount, that.coverageAmount) &&
               Objects.equals(deductible, that.deductible) &&
               Objects.equals(coverageDetails, that.coverageDetails) &&
               Objects.equals(providerNetwork, that.providerNetwork) &&
               Objects.equals(startDate, that.startDate) &&
               Objects.equals(endDate, that.endDate) &&
               Objects.equals(customerName, that.customerName) &&
               Objects.equals(customerEmail, that.customerEmail) &&
               Objects.equals(customerAddress, that.customerAddress) &&
               Objects.equals(customerPhoneNumber, that.customerPhoneNumber) &&
               Objects.equals(customerPayment, that.customerPayment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, policyNumber, policyName, description, premium, coverageAmount, deductible, 
                            coverageDetails, providerNetwork, startDate, endDate, customerName, customerEmail, 
                            customerAddress, customerPhoneNumber, customerPayment);
    }
}
