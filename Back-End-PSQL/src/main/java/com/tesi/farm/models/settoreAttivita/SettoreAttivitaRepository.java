package com.tesi.farm.models.settoreAttivita;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettoreAttivitaRepository extends JpaRepository<SettoreAttivita, Integer> {
}
