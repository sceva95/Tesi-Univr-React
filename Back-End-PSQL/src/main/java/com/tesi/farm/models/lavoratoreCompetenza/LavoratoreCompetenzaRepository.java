package com.tesi.farm.models.lavoratoreCompetenza;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LavoratoreCompetenzaRepository extends JpaRepository<LavoratoreCompetenza, LavoratoreCompetenzaId> {
    List<LavoratoreCompetenza> findAllByLavoratoreCompetenzaId_Lavoratoreid(int lavoratoreid);
}
