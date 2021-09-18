package com.tesi.farm.models.patenteRichiesta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatenteRichiestaRepository extends JpaRepository<PatenteRichiesta, PatenteRichiestaId> {
    List<PatenteRichiesta> findAllById_RichiestaId(int richiestaid);
}
