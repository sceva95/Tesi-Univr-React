package com.tesi.farm.models.tipoPatente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoPatenteRepository extends JpaRepository<TipoPatente, String> {
    TipoPatente findBySiglaPatente(String siglaPatente);
}
