package com.tesi.farm.models.linguaRichiesta;

import com.tesi.farm.models.lingua.Lingua;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LinguaRichiestaRepository extends JpaRepository<LinguaRichiesta, LinguaRichiestaId> {
    List<LinguaRichiesta> findAllById_Richiestaid(int richiestaid);
}
