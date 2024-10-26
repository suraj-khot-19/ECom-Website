package com.suraj.ecom_backend.service;

import com.suraj.ecom_backend.model.Product;
import com.suraj.ecom_backend.repository.ProductRepository;
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
    public Product updateProduct(int id, Product product, MultipartFile file) throws IOException {
        //search product
        Product searchProduct=repo.findById(id).orElse(null);

        //if found
        if(searchProduct!=null){
            searchProduct.setName(product.getName());
            searchProduct.setBrand(product.getBrand());
            searchProduct.setDisc(product.getDisc());
            searchProduct.setAvailable(product.isAvailable()); //for true false is... is come
            searchProduct.setCategory(product.getCategory());
            searchProduct.setPrice(product.getPrice());
            searchProduct.setRelease_date(product.getRelease_date());
            searchProduct.setQuantity(product.getQuantity());
        //handel file
        if(file!=null && !file.isEmpty())
        {
            product.setImgType(file.getContentType());
            product.setImgData(file.getBytes());
            product.setImgName(file.getName());
        }

        //save it
        return repo.save(searchProduct);
        }
        return  null;
    }

    //delete product
    public void deleteProductById(int id) {
        repo.deleteById(id);
    }
}
