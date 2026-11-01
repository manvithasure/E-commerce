
package com.shopease.backend.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shopease.backend.dto.AddToCartRequest;
import com.shopease.backend.dto.UpdateCartRequest;
import com.shopease.backend.model.Cart;
import com.shopease.backend.service.CartService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<Cart> getCart(Principal principal) {

        Cart cart = cartService.getCart(principal.getName());

        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(
            Principal principal,
            @Valid @RequestBody AddToCartRequest request) {

        Cart cart = cartService.addToCart(
                principal.getName(), request);

        return ResponseEntity.ok(cart);
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<Cart> updateQuantity(
            Principal principal,
            @PathVariable String productId,
            @Valid @RequestBody UpdateCartRequest request) {

        Cart cart = cartService.updateQuantity(
                principal.getName(), productId, request);

        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Cart> removeFromCart(
            Principal principal,
            @PathVariable String productId) {

        Cart cart = cartService.removeFromCart(
                principal.getName(), productId);

        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Cart> clearCart(Principal principal) {

        Cart cart = cartService.clearCart(principal.getName());

        return ResponseEntity.ok(cart);
    }
}
