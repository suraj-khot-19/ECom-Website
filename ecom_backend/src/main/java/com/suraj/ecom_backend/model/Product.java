package com.suraj.ecom_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity //create table for me
@Data // hey lombok keep and manage my data
@AllArgsConstructor // hey lombok generate all Arguments Constructor
@NoArgsConstructor // hey lombok generate no Arguments Constructor
public class Product {

    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //generate id automatically and in sequence
    private int id;
    private String name;
    private String disc;
    private Date release_date;
    private BigDecimal price;
    private String brand;
    private  String category;
    private boolean available;
    private int quantity;
}
