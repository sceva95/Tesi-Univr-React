package com.tesi.farm.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class CentroNotifiche {

    @Autowired
    private JavaMailSender javaMailSender;


    public void senMail(String emailTo, String oggetto, String testo) throws MailException {
        SimpleMailMessage smm = new SimpleMailMessage();
        smm.setFrom("farmapp2021@gmail.com");
        smm.setTo(emailTo);
        smm.setSubject(oggetto);
        smm.setText(testo);

        javaMailSender.send(smm);
    }
}
