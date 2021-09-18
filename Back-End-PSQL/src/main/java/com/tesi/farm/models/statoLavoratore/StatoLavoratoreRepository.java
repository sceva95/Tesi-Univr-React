package com.tesi.farm.models.statoLavoratore;

import com.tesi.farm.models.lavoratore.Lavoratore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatoLavoratoreRepository extends JpaRepository<StatoLavoratore, Integer> {

}
