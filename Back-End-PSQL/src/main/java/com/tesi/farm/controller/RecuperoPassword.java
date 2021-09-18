package com.tesi.farm.controller;

import com.tesi.farm.mail.CentroNotifiche;
import com.tesi.farm.models.LoginForm;
import com.tesi.farm.models.agenzia.Agenzia;
import com.tesi.farm.models.agenzia.AgenziaRepository;
import com.tesi.farm.models.agenzia.AgenziaRowMapper;
import com.tesi.farm.models.azienda.Azienda;
import com.tesi.farm.models.azienda.AziendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.Random;

@RestController
@RequestMapping("recupero")
@CrossOrigin
public class RecuperoPassword {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private AgenziaRepository agenziaRepository;

    @Autowired
    private AziendaRepository aziendaRepository;

    @Autowired
    private CentroNotifiche centroNotifiche;

    @PostMapping("/password")
    private void recupero(@RequestBody LoginForm loginForm) throws Exception {
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        try {
            Agenzia agenzia = agenziaRepository.findByUsername(loginForm.getUsername());
            if (agenzia.getEmail().equals(loginForm.getPassword())) {

                System.out.println(generatedString);
                jdbcTemplate.update("update agenzia set password=crypt('" + generatedString + "' , gen_salt('bf')) where id=" + agenzia.getId() + " ;");

                centroNotifiche.senMail(agenzia.getEmail(), "Password Modificata", "FarmApp\n\nAbbiamo aggiornato la tua password\nLa nuova password è: " + generatedString + " .\n\nBuona giornata");

            } else {
                throw new Exception("error");
            }
        } catch (NullPointerException e) {
            Azienda azienda = aziendaRepository.findByUsername(loginForm.getUsername());
            if (azienda.getEmail().equals(loginForm.getPassword())) {

                System.out.println(generatedString);
                jdbcTemplate.update("update azienda set password=crypt('" + generatedString + "' , gen_salt('bf')) where id=" + azienda.getId() + " ;");

                centroNotifiche.senMail(azienda.getEmail(), "Password Modificata", "FarmApp\n\nAbbiamo aggiornato la tua password\nLa nuova password è: " + generatedString + " .\n\nBuona giornata");
            } else {
                throw new Exception("error");
            }
        }
    }
}
