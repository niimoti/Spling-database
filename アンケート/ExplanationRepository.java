package com.example.demo.repository;

import com.example.demo.model.Explanation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//repositoryだね
//ここでは自動的にSQLを実行してくれるよ
@Repository public interface ExplanationRepository extends JpaRepository<Explanation,String> {
}
