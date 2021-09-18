package com.tesi.farm.models.linguaLavoratore;

import com.tesi.farm.models.linguaRichiesta.LinguaRichiesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LinguaLavoratoreRepository extends JpaRepository<LinguaLavoratore, LinguaLavoratoreId> {
    List<LinguaLavoratore> findAllById_Lavoratoreid(int lavoratoreid);
}
