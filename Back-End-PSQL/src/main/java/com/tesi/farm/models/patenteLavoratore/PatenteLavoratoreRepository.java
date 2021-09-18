package com.tesi.farm.models.patenteLavoratore;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatenteLavoratoreRepository extends JpaRepository<PatenteLavoratore, PatenteLavoratoreId> {
    List<PatenteLavoratore> findAllById_LavoratoreId(int lavoratoreid);
}
