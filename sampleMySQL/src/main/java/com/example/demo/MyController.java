package com.example.demo;

import com.example.demo.model.Gao;
import com.example.demo.repository.GaoRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@Controller
public class MyController {

    private final JdbcTemplate jdbcTemplate;
    private final GaoRepository gaoRepository;

    public MyController(JdbcTemplate jdbcTemplate, GaoRepository gaoRepository) {
        this.jdbcTemplate = jdbcTemplate;
        this.gaoRepository = gaoRepository;
    }

    @GetMapping("/")
    public String index(Model model) {

        String sql = "select * from sample_table";
        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);

        model.addAttribute("list",list);

        return "index";
    }

    @GetMapping("/gao")
    public String gao() {
        return "gao";
    }

    @GetMapping("/gaoList")
    public String gaoList
            (
                    Model model,
                    @RequestParam String gaoId,
                    @RequestParam String gaoName
            ) {
        Gao gao = new Gao(gaoId, gaoName);
        gaoRepository.save(gao);

        model.addAttribute("gao",gaoRepository.findAll());
        return "gaoList";
    }

}
