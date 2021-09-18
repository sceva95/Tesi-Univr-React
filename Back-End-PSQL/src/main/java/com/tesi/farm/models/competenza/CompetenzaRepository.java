package com.tesi.farm.models.competenza;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetenzaRepository extends JpaRepository<Competenza, Integer> {
}
