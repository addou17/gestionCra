package com.dimaconsulting.gestioncra.repository;

import com.dimaconsulting.gestioncra.domain.Action;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Action entity.
 */
@SuppressWarnings("unused")
public interface ActionRepository extends JpaRepository<Action,Long> {

}
