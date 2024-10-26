package com.suraj.ecom_backend.controller;

import com.suraj.ecom_backend.model.Product;
import com.suraj.ecom_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {

    //object of service
    @Autowired
    ProductService service;

    @RequestMapping("/")
    public String greet() {
        return "Hello i am online";
    }

    //get all products
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<>(service.getAllProducts(), HttpStatus.OK);
    }

    //get one product by it id
    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Product product = service.getProductById(id);
        if (product != null)
            return new ResponseEntity<>(product, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //add a product(with product and image also)
    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestPart Product product, @RequestPart MultipartFile file) {
        try {
            Product productX = service.addProduct(product, file);
            return new ResponseEntity<>(productX, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //get product image
    @GetMapping("/product/{id}/image")
    public ResponseEntity<byte[]> getProductImageById(@PathVariable int id) {
        Product product = service.getProductById(id);

        return ResponseEntity.
                ok(). //status
                        contentType(MediaType.valueOf(product.getImgType())).  //content type
                        body(product.getImgData()); //image in byte
    }

    //update an existing product
    @PutMapping("/product/update")
    public ResponseEntity<?> updateProduct(@RequestPart int id, @RequestPart Product product, @RequestPart MultipartFile file) {
        // check if product is there
        Product product1 = service.getProductById(id);
        if (product1 == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        //if there ask service to update it
        else {
            //as it contains byte file may throw exception
            try {
                service.updateProduct(product,file);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (Exception e) {
                return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    //delete a product
    @DeleteMapping("product/delete/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable int id){
        //check product exist
        Product product=service.getProductById(id);
        if(product!=null) {
            service.deleteProductById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
