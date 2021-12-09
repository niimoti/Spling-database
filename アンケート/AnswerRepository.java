package com.example.demo.repository;

import com.example.demo.model.Answer;
import com.example.demo.model.MultiplePrimary;
import com.example.demo.model.Reserve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, MultiplePrimary.AnswerPrimary> {
    List<Answer> findByUsername(String username);
    List<Answer> findByquestionnaireid(String questionnaireid);
}
