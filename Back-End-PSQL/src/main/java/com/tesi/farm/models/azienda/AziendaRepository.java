package com.tesi.farm.models.azienda;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AziendaRepository extends JpaRepository<Azienda, Integer> {
    Azienda findByUsername(String username);
    List<Azienda> findAllByAgenziaid(int agenziaid);
}
