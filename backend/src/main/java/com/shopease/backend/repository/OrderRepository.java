
package com.shopease.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.shopease.backend.model.Order;

public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByUserIdOrderByOrderDateDesc(String userId);
}
