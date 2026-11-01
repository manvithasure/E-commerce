
package com.shopease.backend.dto;

import jakarta.validation.constraints.Min;

public class UpdateCartRequest {

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    public UpdateCartRequest() {
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
