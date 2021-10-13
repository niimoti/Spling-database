package com.example.demo;

import com.example.demo.model.SampleModel;
import com.example.demo.repository.SampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MyController {

    private final SampleRepository repository;

    @Autowired
    public MyController(SampleRepository repository) {
        this.repository = repository;
    }


    @GetMapping("/")
    public String index(){
        return "index";
    }

    @PostMapping("/input")
    public String input(
            @RequestParam String sample1,
            @RequestParam String sample2,
            @RequestParam String sample3
    ) {
        repository.sampleAdd(sample1,sample2,sample3);
        return "okey";
    }

    @GetMapping("/search")
    public String search(
            @ModelAttribute SampleModel sampleModel,
            Model model
    ){
        model.addAttribute("test", repository.customFindAll());
        return "test";
    }

}
