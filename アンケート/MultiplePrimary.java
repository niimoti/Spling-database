package com.example.demo.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class MultiplePrimary {

    public static class ReservePrimary implements Serializable {
        private String username;
        private String companyname;
    }

    public static class QualificationPrimary implements Serializable {
        private String username;
        private String qualification;
    }

    public static class AnswerPrimary implements Serializable {
        private String questionnaireid;
        private String username;
        private String companysanswer;
    }

}
