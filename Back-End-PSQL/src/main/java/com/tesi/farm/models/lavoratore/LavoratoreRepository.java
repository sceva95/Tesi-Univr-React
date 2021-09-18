package com.tesi.farm.models.lavoratore;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LavoratoreRepository extends JpaRepository<Lavoratore, Integer> {
    List<Lavoratore> findAllByAgenziaid(int id);
}
