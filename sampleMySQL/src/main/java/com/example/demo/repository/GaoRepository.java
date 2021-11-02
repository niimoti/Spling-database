package com.example.demo.repository;

import com.example.demo.model.Gao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GaoRepository extends JpaRepository<Gao, String> {
}
