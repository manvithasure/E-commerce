
package com.shopease.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.shopease.backend.dto.AddToCartRequest;
import com.shopease.backend.dto.UpdateCartRequest;
import com.shopease.backend.model.Cart;
import com.shopease.backend.model.CartItem;
import com.shopease.backend.model.Product;
import com.shopease.backend.repository.CartRepository;
import com.shopease.backend.repository.ProductRepository;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository,
                       ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    public Cart getCart(String userId) {

        return cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(new Cart(userId)));
    }

    public Cart addToCart(String userId, AddToCartRequest request) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Product not found"));

        if (request.getQuantity() > product.getStock()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Insufficient stock");
        }

        Cart cart = getCart(userId);

        boolean found = false;

        for (CartItem item : cart.getItems()) {

            if (item.getProductId().equals(product.getId())) {

                int newQuantity = item.getQuantity() + request.getQuantity();

                if (newQuantity > product.getStock()) {
                    throw new ResponseStatusException(
                            HttpStatus.BAD_REQUEST, "Insufficient stock");
                }

                item.setQuantity(newQuantity);
                found = true;
                break;
            }
        }

        if (!found) {

            CartItem item = new CartItem(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    request.getQuantity(),
                    product.getImageUrl()
            );

            cart.getItems().add(item);
        }

        return cartRepository.save(cart);
    }

    public Cart updateQuantity(String userId, String productId,
                               UpdateCartRequest request) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Product not found"));

        if (request.getQuantity() > product.getStock()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Insufficient stock");
        }

        Cart cart = getCart(userId);

        for (CartItem item : cart.getItems()) {

            if (item.getProductId().equals(productId)) {
                item.setQuantity(request.getQuantity());
                return cartRepository.save(cart);
            }
        }

        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Product not found in cart");
    }

    public Cart removeFromCart(String userId, String productId) {

        Cart cart = getCart(userId);

        boolean removed = cart.getItems().removeIf(
                item -> item.getProductId().equals(productId));

        if (!removed) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Product not found in cart");
        }

        return cartRepository.save(cart);
    }

    public Cart clearCart(String userId) {

        Cart cart = getCart(userId);
        cart.getItems().clear();

        return cartRepository.save(cart);
    }
}
