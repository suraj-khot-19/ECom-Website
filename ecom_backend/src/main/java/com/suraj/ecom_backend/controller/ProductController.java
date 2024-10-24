package com.suraj.ecom_backend.controller;

import com.suraj.ecom_backend.model.Product;
import com.suraj.ecom_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {

    @RequestMapping("/")
    public String greet(){
        return "Hello i am online";
    }

    //object of service
    @Autowired
    ProductService service;

    //get all products
    @RequestMapping("/products")
    public List<Product> getAllProducts(){
        return service.getAllProducts();
    }
}
