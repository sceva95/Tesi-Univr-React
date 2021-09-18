package com.tesi.farm.models.richiesta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RichiestaRepository extends JpaRepository<Richiesta, Integer> {
    List<Richiesta> findAllByAziendaid(int aziendaid);
}
