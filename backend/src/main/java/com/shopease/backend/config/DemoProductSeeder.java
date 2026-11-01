package com.shopease.backend.config;

import java.util.List;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.shopease.backend.model.Product;
import com.shopease.backend.repository.ProductRepository;

@Configuration
public class DemoProductSeeder {

    @Bean
    @ConditionalOnProperty(
            name = "shopease.catalog.seed-demo-products",
            havingValue = "true")
    ApplicationRunner seedDemoProducts(ProductRepository productRepository) {
        return args -> demoProducts().stream()
                .filter(product ->
                        !productRepository.existsByNameIgnoreCase(product.getName()))
                .forEach(productRepository::save);
    }

    private List<Product> demoProducts() {
        return List.of(
                new Product(
                        "Classic Wristwatch",
                        "A timeless everyday watch with a clean, versatile design.",
                        "Accessories", 2499.00, 18,
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Portable Bluetooth Speaker",
                        "Enjoy clear, room-filling sound at home or on the go.",
                        "Electronics", 3299.00, 14,
                        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Digital Camera",
                        "Capture everyday moments with this compact digital camera.",
                        "Electronics", 24999.00, 8,
                        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Running Shoes",
                        "Lightweight, cushioned shoes made for daily movement.",
                        "Footwear", 4599.00, 22,
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Everyday Backpack",
                        "A practical backpack with room for work, travel, and essentials.",
                        "Accessories", 2799.00, 16,
                        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Classic Sunglasses",
                        "A lightweight frame with a simple style for sunny days.",
                        "Accessories", 1799.00, 20,
                        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Pour-Over Coffee Set",
                        "A simple coffee brewing set for a fresh cup at home.",
                        "Home", 2199.00, 12,
                        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Wireless Earbuds",
                        "Compact wireless earbuds for music, calls, and commuting.",
                        "Electronics", 3999.00, 18,
                        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Smartphone",
                        "A sleek smartphone for photos, video, and everyday tasks.",
                        "Electronics", 18999.00, 11,
                        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Tablet",
                        "A lightweight tablet for reading, streaming, and browsing.",
                        "Electronics", 15999.00, 9,
                        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Laptop",
                        "A portable laptop for work, study, and entertainment.",
                        "Electronics", 54999.00, 7,
                        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Soft Cotton Hoodie",
                        "A comfortable everyday hoodie with a relaxed fit.",
                        "Clothing", 2299.00, 24,
                        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Leather Crossbody Bag",
                        "A compact crossbody bag for carrying daily essentials.",
                        "Accessories", 3499.00, 13,
                        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Insulated Water Bottle",
                        "A reusable bottle designed to keep drinks at the right temperature.",
                        "Home", 899.00, 30,
                        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Yoga Mat",
                        "A supportive non-slip mat for stretching and home workouts.",
                        "Fitness", 1599.00, 17,
                        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Ceramic Table Lamp",
                        "A warm accent lamp for a bedside table or reading corner.",
                        "Home", 2899.00, 10,
                        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Indoor Potted Plant",
                        "A leafy indoor plant to bring a touch of green to your space.",
                        "Home", 1199.00, 15,
                        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80"),
                new Product(
                        "Hardcover Notebook",
                        "A hardcover notebook for notes, plans, and everyday ideas.",
                        "Stationery", 499.00, 40,
                        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80"));
    }
}
