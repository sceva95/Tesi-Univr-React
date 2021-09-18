package com.tesi.farm.models.agenzia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgenziaRepository extends JpaRepository<Agenzia, Integer> {
    Agenzia findByUsername(String usernameI);
}
