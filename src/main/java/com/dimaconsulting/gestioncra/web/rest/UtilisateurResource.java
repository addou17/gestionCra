package com.dimaconsulting.gestioncra.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dimaconsulting.gestioncra.domain.Utilisateur;

import com.dimaconsulting.gestioncra.repository.UtilisateurRepository;
import com.dimaconsulting.gestioncra.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Utilisateur.
 */
@RestController
@RequestMapping("/api")
public class UtilisateurResource {

    private final Logger log = LoggerFactory.getLogger(UtilisateurResource.class);

    private static final String ENTITY_NAME = "utilisateur";
        
    private final UtilisateurRepository utilisateurRepository;

    public UtilisateurResource(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    /**
     * POST  /utilisateurs : Create a new utilisateur.
     *
     * @param utilisateur the utilisateur to create
     * @return the ResponseEntity with status 201 (Created) and with body the new utilisateur, or with status 400 (Bad Request) if the utilisateur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/utilisateurs")
    @Timed
    public ResponseEntity<Utilisateur> createUtilisateur(@RequestBody Utilisateur utilisateur) throws URISyntaxException {
        log.debug("REST request to save Utilisateur : {}", utilisateur);
        if (utilisateur.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new utilisateur cannot already have an ID")).body(null);
        }
        Utilisateur result = utilisateurRepository.save(utilisateur);
        return ResponseEntity.created(new URI("/api/utilisateurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /utilisateurs : Updates an existing utilisateur.
     *
     * @param utilisateur the utilisateur to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated utilisateur,
     * or with status 400 (Bad Request) if the utilisateur is not valid,
     * or with status 500 (Internal Server Error) if the utilisateur couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/utilisateurs")
    @Timed
    public ResponseEntity<Utilisateur> updateUtilisateur(@RequestBody Utilisateur utilisateur) throws URISyntaxException {
        log.debug("REST request to update Utilisateur : {}", utilisateur);
        if (utilisateur.getId() == null) {
            return createUtilisateur(utilisateur);
        }
        Utilisateur result = utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, utilisateur.getId().toString()))
            .body(result);
    }

    /**
     * GET  /utilisateurs : get all the utilisateurs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of utilisateurs in body
     */
    @GetMapping("/utilisateurs")
    @Timed
    public List<Utilisateur> getAllUtilisateurs() {
        log.debug("REST request to get all Utilisateurs");
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();
        return utilisateurs;
    }

    /**
     * GET  /utilisateurs/:id : get the "id" utilisateur.
     *
     * @param id the id of the utilisateur to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the utilisateur, or with status 404 (Not Found)
     */
    @GetMapping("/utilisateurs/{id}")
    @Timed
    public ResponseEntity<Utilisateur> getUtilisateur(@PathVariable Long id) {
        log.debug("REST request to get Utilisateur : {}", id);
        Utilisateur utilisateur = utilisateurRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(utilisateur));
    }

    /**
     * DELETE  /utilisateurs/:id : delete the "id" utilisateur.
     *
     * @param id the id of the utilisateur to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/utilisateurs/{id}")
    @Timed
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        log.debug("REST request to delete Utilisateur : {}", id);
        utilisateurRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
