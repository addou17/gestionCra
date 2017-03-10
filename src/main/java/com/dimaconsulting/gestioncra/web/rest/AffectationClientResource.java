package com.dimaconsulting.gestioncra.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dimaconsulting.gestioncra.domain.AffectationClient;

import com.dimaconsulting.gestioncra.repository.AffectationClientRepository;
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
 * REST controller for managing AffectationClient.
 */
@RestController
@RequestMapping("/api")
public class AffectationClientResource {

    private final Logger log = LoggerFactory.getLogger(AffectationClientResource.class);

    private static final String ENTITY_NAME = "affectationClient";
        
    private final AffectationClientRepository affectationClientRepository;

    public AffectationClientResource(AffectationClientRepository affectationClientRepository) {
        this.affectationClientRepository = affectationClientRepository;
    }

    /**
     * POST  /affectation-clients : Create a new affectationClient.
     *
     * @param affectationClient the affectationClient to create
     * @return the ResponseEntity with status 201 (Created) and with body the new affectationClient, or with status 400 (Bad Request) if the affectationClient has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/affectation-clients")
    @Timed
    public ResponseEntity<AffectationClient> createAffectationClient(@RequestBody AffectationClient affectationClient) throws URISyntaxException {
        log.debug("REST request to save AffectationClient : {}", affectationClient);
        if (affectationClient.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new affectationClient cannot already have an ID")).body(null);
        }
        AffectationClient result = affectationClientRepository.save(affectationClient);
        return ResponseEntity.created(new URI("/api/affectation-clients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /affectation-clients : Updates an existing affectationClient.
     *
     * @param affectationClient the affectationClient to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated affectationClient,
     * or with status 400 (Bad Request) if the affectationClient is not valid,
     * or with status 500 (Internal Server Error) if the affectationClient couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/affectation-clients")
    @Timed
    public ResponseEntity<AffectationClient> updateAffectationClient(@RequestBody AffectationClient affectationClient) throws URISyntaxException {
        log.debug("REST request to update AffectationClient : {}", affectationClient);
        if (affectationClient.getId() == null) {
            return createAffectationClient(affectationClient);
        }
        AffectationClient result = affectationClientRepository.save(affectationClient);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, affectationClient.getId().toString()))
            .body(result);
    }

    /**
     * GET  /affectation-clients : get all the affectationClients.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of affectationClients in body
     */
    @GetMapping("/affectation-clients")
    @Timed
    public List<AffectationClient> getAllAffectationClients() {
        log.debug("REST request to get all AffectationClients");
        List<AffectationClient> affectationClients = affectationClientRepository.findAll();
        return affectationClients;
    }

    /**
     * GET  /affectation-clients/:id : get the "id" affectationClient.
     *
     * @param id the id of the affectationClient to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the affectationClient, or with status 404 (Not Found)
     */
    @GetMapping("/affectation-clients/{id}")
    @Timed
    public ResponseEntity<AffectationClient> getAffectationClient(@PathVariable Long id) {
        log.debug("REST request to get AffectationClient : {}", id);
        AffectationClient affectationClient = affectationClientRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(affectationClient));
    }

    /**
     * DELETE  /affectation-clients/:id : delete the "id" affectationClient.
     *
     * @param id the id of the affectationClient to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/affectation-clients/{id}")
    @Timed
    public ResponseEntity<Void> deleteAffectationClient(@PathVariable Long id) {
        log.debug("REST request to delete AffectationClient : {}", id);
        affectationClientRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
