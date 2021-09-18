package com.tesi.farm.models.comune;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComuneRepository extends JpaRepository<Comune, Integer> {
    public List<Comune> findAllByProvincia(String provincia);
}
