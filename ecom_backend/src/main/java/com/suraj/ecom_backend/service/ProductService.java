package com.suraj.ecom_backend.service;

import com.suraj.ecom_backend.model.Product;
import com.suraj.ecom_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
        return repo.findById(id).orElse(null);
    }

    public Product addProduct(Product product, MultipartFile file) throws IOException {
        //getting image and its prop
        product.setImgType(file.getContentType());
        product.setImgName(file.getOriginalFilename());
        product.setImgData(file.getBytes());
     return repo.save(product);
    }
}
