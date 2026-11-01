package com.shopease.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.shopease.backend.model.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

    boolean existsByNameIgnoreCase(String name);
}