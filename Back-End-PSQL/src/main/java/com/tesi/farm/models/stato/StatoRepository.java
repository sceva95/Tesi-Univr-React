package com.tesi.farm.models.stato;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatoRepository extends JpaRepository<Stato, Integer> {
}
