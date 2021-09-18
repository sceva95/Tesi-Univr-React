package com.tesi.farm.models.lavoratoreRichiesta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Repository
public interface LavoratoreRichiestaRepository extends JpaRepository<LavoratoreRichiesta, LavoratoreRichiestaId> {
    List<LavoratoreRichiesta> findAllById_Lavoratoreid(int lavoratoreid);
    LavoratoreRichiesta findById_LavoratoreidAndAndId_Richiestaid(int lavoratoreid, int richiestaid);
}
