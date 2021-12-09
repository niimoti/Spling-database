package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "answer")
@NoArgsConstructor
@AllArgsConstructor
@IdClass(value = MultiplePrimary.AnswerPrimary.class)
public class Answer {

    @Id
    @Column(name = "questionnaireid")
    private String questionnaireid;

    @Id
    @Column(name = "username")
    private String username;

    @Id
    @Column(name = "companysanswer")
    private String companysanswer;

    @Column(name = "progressanswer")
    private String progressanswer;

}
