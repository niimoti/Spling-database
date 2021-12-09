package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Setter
@Getter
@Entity
@Table(name = "explanation")
@NoArgsConstructor
@AllArgsConstructor

public class Explanation {

    @Id
    @Column(name = "companysname")
    private String companysname;

    @Column(name = "reservedate")
    private String reservedate;

    @Column(name = "reservedeadline")
    private String reservedeadline;

    @Column(name = "contents")
    private String contents;

    @Column(name = "place")
    private String place;

    @Column(name = "url")
    private String url;

    @Column(name = "file")
    private String file;

    @Column(name = "candidate")
    private int candidate;
}
