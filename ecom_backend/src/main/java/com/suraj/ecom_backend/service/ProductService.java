package com.suraj.ecom_backend.service;

import com.suraj.ecom_backend.model.Product;
import com.suraj.ecom_backend.repository.ProductRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
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

    //add new product
    public Product addProduct(Product product, MultipartFile file) throws IOException {
        //getting image and its prop
        product.setImgType(file.getContentType());
        product.setImgName(file.getOriginalFilename());
        product.setImgData(file.getBytes());
        return repo.save(product);
    }

    //update product
    public Product updateProduct(Product product, MultipartFile file) throws IOException {
        //handel file
        product.setImgType(file.getContentType());
        product.setImgData(file.getBytes());
        product.setImgName(file.getName());

        //save it
        return repo.save(product);
    }

    //delete product
    public void deleteProductById(int id) {
        repo.deleteById(id);
    }
}
