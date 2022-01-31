package com.example.demo.controller;

import com.example.demo.java.ExString;
import com.example.demo.model.*;
import com.example.demo.java.Time;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class StudentController {

    //学生Controller
//    private final ExplanationRepository explanationRepository;
    private final InformationSessionRepository informationSessionRepository;
    private final UserRepository userRepository;
    private final ReserveRepository reserveRepository;
    private final StudentRepository studentRepository;
    private final AnswerRepository answerRepository;
    private final QuestionnaireRepository questionnaireRepository;
    private final QualificationRepository qualificationRepository;
    private final ExpiredStudentRepository expiredStudentRepository;
    private final CompanysRepository companysRepository;

    Time time = new Time();

    @Autowired
    public StudentController(
//            ExplanationRepository explanationRepository,
            InformationSessionRepository informationSessionRepository,
            UserRepository userRepository,
            ReserveRepository reserveRepository,
            StudentRepository studentRepository,
            AnswerRepository answerRepository,
            QuestionnaireRepository questionnaireRepository,
            QualificationRepository qualificationRepository,
            ExpiredStudentRepository expiredStudentRepository,
            CompanysRepository companysRepository) {
//        this.explanationRepository = explanationRepository;
        this.informationSessionRepository = informationSessionRepository;
        this.userRepository = userRepository;
        this.reserveRepository = reserveRepository;
        this.studentRepository = studentRepository;
        this.answerRepository = answerRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.qualificationRepository = qualificationRepository;
        this.expiredStudentRepository = expiredStudentRepository;
        this.companysRepository = companysRepository;
    }


    @GetMapping("")
    public String studentMenu() { return ""; }

    //ここを自身のアカウントを検索するようにしなければならない
    //また遷移先のhtmlもかえろ
//    @GetMapping("/student/ReserveSample")
//    public String ReserveSample(
//            Model model,
//            @RequestParam(required = false) String company
//    ) {
//        System.out.println(company);
//        model.addAttribute("list", informationSessionRepository.findAll());
//        model.addAttribute("company", company);
//        return "student/ReserveSample";
//    }

    @PostMapping("/student/Reservation")
    public String Reservation(
            Model model,
            @RequestParam String comname,
            Authentication loginUser
    ) {
        Reserve reserve = new Reserve();
        String timeStr = time.NowTime();
        String stuname = loginUser.getName();
        reserve.setCompanyname(comname);
        reserve.setUsername(stuname);
        reserve.setResdatetime(timeStr);
        reserveRepository.save(reserve);
        model.addAttribute("comname",comname);
        model.addAttribute("stuname",stuname);
        return "student/ReserveConfirm";
    }

    @GetMapping("/student/Reservationlist")
    public String Reservationlist(
            Model model,
            Authentication loginUser
    ) {
        String stuname = loginUser.getName();
        model.addAttribute("users", userRepository.findByUsername(stuname));
        model.addAttribute("reservation",reserveRepository.findByUsername(stuname));
//        model.addAttribute("explanation", explanationRepository.findAll());
        model.addAttribute("explanation", informationSessionRepository.findAll());
        return "student/Reservationlist";
    }

    @GetMapping("/student/Profile")
    public String Profile(
            Model model,
            Authentication loginUser
    ) {
        String stuname = loginUser.getName();
        model.addAttribute("users", userRepository.findByUsername(stuname));
        model.addAttribute("qualification", qualificationRepository.findByUsername(stuname));
        model.addAttribute("student", studentRepository.findByUsername(stuname));
        return "student/Profile";
    }

    @GetMapping("/student/ProfileChange")
    public String ProfileChange(
            Model model,
            Authentication loginUser
    ) {
        String stuname = loginUser.getName();
        model.addAttribute("users", userRepository.findByUsername(stuname));
        model.addAttribute("qualification", qualificationRepository.findByUsername(stuname));
        model.addAttribute("student", studentRepository.findByUsername(stuname));
        return "student/ProfileChange";
    }

    @PostMapping("/student/ProfileChange")
    public String ProfileChange2(
            Model model,
            Authentication loginUser,
            @RequestParam String pro,
            @RequestParam String sendtext,
            @RequestParam(required = false) String className
    ) {
        System.out.println(pro);
        System.out.println(sendtext);
        String stuname = loginUser.getName();
        if (pro.equals("取得資格")) {
            Qualification qualification = new Qualification();
            qualification.setUsername(stuname);
            qualification.setQualification(sendtext);
            qualificationRepository.save(qualification);
        } else if (pro.equals("希望職種")) {
            Student student = new Student();
            student.setUsername(stuname);
            student.setIndustry(sendtext);
            student.setClassName(className);
            studentRepository.save(student);
        }
        model.addAttribute("qualification", qualificationRepository.findByUsername(stuname));
        model.addAttribute("student", studentRepository.findByUsername(stuname));
        model.addAttribute("item", pro);
        return "student/ProfileConfirm";
    }

    @GetMapping("/student/AnswerGraph")
    public String AnswerGarph(
            Model model,
            Authentication loginUser
    ) {
        String stuname = loginUser.getName();
        model.addAttribute("answer", answerRepository.findAll());
        model.addAttribute("student", studentRepository.findAll());
        model.addAttribute("questionnaire",questionnaireRepository.findAll());
        model.addAttribute("nowtime", time.NowTime());
        model.addAttribute("stu", stuname);
        return "student/AnswerGraph";
    }

    @GetMapping("/student/QuestionnaireSample")
    public String QuestionnaireSample(
            Model model,
            Authentication loginUser
    ) {
        String stuname = loginUser.getName();
        model.addAttribute("answer",answerRepository.findByUsername(stuname));
//        model.addAttribute("company", explanationRepository.findAll());
        model.addAttribute("company", informationSessionRepository.findAll());
        model.addAttribute("question", questionnaireRepository.findAll());
        model.addAttribute("nowtime", time.NowTime());
        return "student/QuestionnaireSample";
    }

    @PostMapping(value = "/student/QuestionnaireAnswer")
    public String QuestionnaireAnswer(
            Model model,
            Authentication loginUser,
            @RequestParam String sendcom,
            @RequestParam(required = false) String sendpro,
            @RequestParam String id
            ) {

        System.out.println(sendcom + " : " + sendpro + " : " + id);

        Answer answer = new Answer();
        answer.setUsername(loginUser.getName());
        answer.setQuestionnaireid(id);
        String[] spcom = sendcom.split(",");
        String[] sppro = sendpro.split(",");
        for (int i = 0; spcom.length > i; i++) {
            answer.setCompanysanswer(spcom[i]);
            answer.setProgressanswer(sppro[i]);
            answerRepository.save(answer);
        }
        model.addAttribute("answer", answerRepository.findByUsernameAndQuestionnaireid(loginUser.getName(), id));
        return "student/QuestionnaireAnswer";
    }

    @GetMapping("/student/ISSearch")
    public String ketsuANA(
            @ModelAttribute InformationSessionModel informationSessionModel,
            Model model
    ) {
        model.addAttribute("ketsu", informationSessionRepository.findAll());
        return "student/ISSearch";
    }

    @GetMapping("/student/ISSearchByCompany")
    public String CompanySearch(
            Model model,
            @RequestParam String kName
    ) {
        try {
            model.addAttribute("ketsu",informationSessionRepository.findBykNameContaining(kName));
        } catch (Exception e) {
            model.addAttribute("ketsu",informationSessionRepository.findAll());
        }
        model.addAttribute("ketsu",informationSessionRepository.findBykNameContaining(kName));
        return "student/ISSearch";
    }

    @PostMapping("/student/ISprint")
    public String ISPrint(
            Model model,
            @RequestParam String isId,
            @ModelAttribute InformationSessionModel informationSessionModel
    ) {
        ExString exString = new ExString();
        model.addAttribute("filePath2",informationSessionRepository.findAllById(exString.getLong(isId)));
        return "student/ISprint";
    }

    @GetMapping("/student/Recommendation")
    public String Recommendation(
            Model model,
            Authentication loginUser
    ){
        Time time = new Time();
        model.addAttribute("pro", studentRepository.findByUsername(loginUser.getName()).getIndustry());
        model.addAttribute("stu", loginUser.getName());
        model.addAttribute("qua", qualificationRepository.findAll());
        model.addAttribute("exstu", expiredStudentRepository.findAll());
//        model.addAttribute("com", informationSessionRepository.findByDeadlineGreaterThanEqualOrderByEcpdatetimeDesc(time.NowTime()));
        model.addAttribute("info", informationSessionRepository.findByDeadlineGreaterThanEqualOrderByEcpdatetimeDesc(time.ConvertTime("20210410000000")));
        model.addAttribute("com", companysRepository.findAll());

        return "student/Recommendation";
    }
}