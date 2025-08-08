package com.shopchop.dto;

public class AuthResponse {
    private String token;
    private String username;
    private Boolean isAdmin;
    private String tokenType = "Bearer";

    public AuthResponse() {
    }

    public AuthResponse(String token, String username) {
        this.token = token;
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    @Override
    public String toString() {
        return "AuthResponse{" +
                "username='" + username + '\'' +
                ", isAdmin=" + isAdmin +
                ", tokenType='" + tokenType + '\'' +
                '}';
    }
}
