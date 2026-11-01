
package com.shopease.backend.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shopease.backend.dto.CheckoutRequest;
import com.shopease.backend.model.Order;
import com.shopease.backend.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<Order> placeOrder(
            Principal principal,
            @Valid @RequestBody CheckoutRequest request) {

        Order order = orderService.placeOrder(
                principal.getName(), request);

        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> getMyOrders(
            Principal principal) {

        List<Order> orders = orderService.getMyOrders(
                principal.getName());

        return ResponseEntity.ok(orders);
    }
}
