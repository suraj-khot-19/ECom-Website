package com.suraj.ecom_backend.repository;

import com.suraj.ecom_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT p from Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.disc) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProductByKeyword(String keyword);

    //product by category
    @Query("SELECT p FROM Product p WHERE "+
            "LOWER(p.category) LIKE LOWER(CONCAT('%',:cat,'%'))"
    )
    List<Product> getProductByCategory(String cat);
}
