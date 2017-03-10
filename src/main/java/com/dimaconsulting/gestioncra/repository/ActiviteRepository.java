package com.dimaconsulting.gestioncra.repository;

import com.dimaconsulting.gestioncra.domain.Activite;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Activite entity.
 */
@SuppressWarnings("unused")
public interface ActiviteRepository extends JpaRepository<Activite,Long> {

}
