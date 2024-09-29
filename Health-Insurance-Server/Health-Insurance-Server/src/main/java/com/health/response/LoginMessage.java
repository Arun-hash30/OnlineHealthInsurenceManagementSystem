package com.health.response;

public class LoginMessage {
    private String message;
    private boolean success;
    private String role;
    private Long userId;
    private String token;

    // Default constructor
    public LoginMessage() {}

    // Parameterized constructor
    public LoginMessage(String message, boolean success, String role, Long userId, String token) {
        this.message = message;
        this.success = success;
        this.role = role;
        this.userId = userId;
        this.token = token;
    }

    // Getter and Setter methods
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
