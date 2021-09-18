package com.tesi.farm.models.richiestaCompetenza;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RichiestaCompetenzaRepository extends JpaRepository<RichiestaCompetenza, RichiestaCompetenzaId> {
    List<RichiestaCompetenza> findAllById_Richiestaid(int richiestaid);
}
