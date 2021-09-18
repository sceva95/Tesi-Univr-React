package com.tesi.farm.models.tipoContratto;

import com.tesi.farm.models.statoLavoratore.StatoLavoratore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoContrattoRepository extends JpaRepository<TipoContratto, Integer> {
}
