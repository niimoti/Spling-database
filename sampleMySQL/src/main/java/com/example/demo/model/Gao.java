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
@Table(name = "sample_table")
@NoArgsConstructor
@AllArgsConstructor
public class Gao {

    @Id
    @Column(name = "id")
    private String gaoId;

    @Column(name = "name")
    private String gaoName;


}
