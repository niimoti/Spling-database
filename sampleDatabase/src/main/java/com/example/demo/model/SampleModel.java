package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class SampleModel {

    @Id
    private String sample1;

    private String sample2;

    private String sample3;

}
