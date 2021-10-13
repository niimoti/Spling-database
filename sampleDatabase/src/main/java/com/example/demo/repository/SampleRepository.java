package com.example.demo.repository;

import com.example.demo.model.SampleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface SampleRepository extends JpaRepository<SampleModel, Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO sample_model (sample1,sample2,sample3) values (?1,?2,?3)",nativeQuery = true)
    void sampleAdd(String sample1,String sample2,String sample3);

    @Query(value = "SELECT * FROM sample_model", nativeQuery = true)
    List<SampleModel> customFindAll();

}
