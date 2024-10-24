package com.suraj.ecom_backend.service;

import com.suraj.ecom_backend.model.Product;
import com.suraj.ecom_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    //object of repo
    @Autowired
    ProductRepository repo;

    //get all products
    public List<Product> getAllProducts(){
        return repo.findAll();
    }

    //get product by its id
    public Product getProductById(int id) {
        return repo.findById(id).orElse(new Product());
    }
}
