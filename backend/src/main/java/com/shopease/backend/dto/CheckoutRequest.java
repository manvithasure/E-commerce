
package com.shopease.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CheckoutRequest {

    @NotBlank(message = "Shipping address is required")
    @Size(max = 300, message = "Address cannot exceed 300 characters")
    private String shippingAddress;

    public CheckoutRequest() {
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
}
