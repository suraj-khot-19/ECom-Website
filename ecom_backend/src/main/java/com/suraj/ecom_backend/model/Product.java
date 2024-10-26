package com.suraj.ecom_backend.model;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd") //store the date in format dd-mm-yyyy //M must capital
    private LocalDate release_date;
    private BigDecimal price;
    private String brand;
    private  String category;
    private boolean available;
    private int quantity;

    //image
    private String imgType;
    private String imgName;
    @Lob //large object type
    private byte[] imgData;
}
