package com.dimaconsulting.gestioncra.repository;

import com.dimaconsulting.gestioncra.domain.AffectationClient;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the AffectationClient entity.
 */
@SuppressWarnings("unused")
public interface AffectationClientRepository extends JpaRepository<AffectationClient,Long> {

}
