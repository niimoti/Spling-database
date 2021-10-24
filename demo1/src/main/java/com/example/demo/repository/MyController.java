package com.example.demo.repository;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MyController {

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("samplePath", "sample.pdf");
        model.addAttribute("renPath", "練習.pdf");
        return "index";
    }

    @PostMapping("print")
    public String print(
            Model model,
            @RequestParam String path
    ) {
        System.out.println(path);
        model.addAttribute("filePath", path);
        return "print";
    }

}
