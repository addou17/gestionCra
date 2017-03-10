package com.dimaconsulting.gestioncra.web.rest;

import com.dimaconsulting.gestioncra.GestioncraApp;

import com.dimaconsulting.gestioncra.domain.AffectationClient;
import com.dimaconsulting.gestioncra.repository.AffectationClientRepository;
import com.dimaconsulting.gestioncra.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.dimaconsulting.gestioncra.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AffectationClientResource REST controller.
 *
 * @see AffectationClientResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestioncraApp.class)
public class AffectationClientResourceIntTest {

    private static final ZonedDateTime DEFAULT_DATE_DEBUT_MISSION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_DEBUT_MISSION = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_DATE_FIN_MISSION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_FIN_MISSION = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private AffectationClientRepository affectationClientRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAffectationClientMockMvc;

    private AffectationClient affectationClient;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AffectationClientResource affectationClientResource = new AffectationClientResource(affectationClientRepository);
        this.restAffectationClientMockMvc = MockMvcBuilders.standaloneSetup(affectationClientResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AffectationClient createEntity(EntityManager em) {
        AffectationClient affectationClient = new AffectationClient()
            .dateDebutMission(DEFAULT_DATE_DEBUT_MISSION)
            .dateFinMission(DEFAULT_DATE_FIN_MISSION);
        return affectationClient;
    }

    @Before
    public void initTest() {
        affectationClient = createEntity(em);
    }

    @Test
    @Transactional
    public void createAffectationClient() throws Exception {
        int databaseSizeBeforeCreate = affectationClientRepository.findAll().size();

        // Create the AffectationClient
        restAffectationClientMockMvc.perform(post("/api/affectation-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affectationClient)))
            .andExpect(status().isCreated());

        // Validate the AffectationClient in the database
        List<AffectationClient> affectationClientList = affectationClientRepository.findAll();
        assertThat(affectationClientList).hasSize(databaseSizeBeforeCreate + 1);
        AffectationClient testAffectationClient = affectationClientList.get(affectationClientList.size() - 1);
        assertThat(testAffectationClient.getDateDebutMission()).isEqualTo(DEFAULT_DATE_DEBUT_MISSION);
        assertThat(testAffectationClient.getDateFinMission()).isEqualTo(DEFAULT_DATE_FIN_MISSION);
    }

    @Test
    @Transactional
    public void createAffectationClientWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = affectationClientRepository.findAll().size();

        // Create the AffectationClient with an existing ID
        affectationClient.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAffectationClientMockMvc.perform(post("/api/affectation-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affectationClient)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<AffectationClient> affectationClientList = affectationClientRepository.findAll();
        assertThat(affectationClientList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAffectationClients() throws Exception {
        // Initialize the database
        affectationClientRepository.saveAndFlush(affectationClient);

        // Get all the affectationClientList
        restAffectationClientMockMvc.perform(get("/api/affectation-clients?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(affectationClient.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateDebutMission").value(hasItem(sameInstant(DEFAULT_DATE_DEBUT_MISSION))))
            .andExpect(jsonPath("$.[*].dateFinMission").value(hasItem(sameInstant(DEFAULT_DATE_FIN_MISSION))));
    }

    @Test
    @Transactional
    public void getAffectationClient() throws Exception {
        // Initialize the database
        affectationClientRepository.saveAndFlush(affectationClient);

        // Get the affectationClient
        restAffectationClientMockMvc.perform(get("/api/affectation-clients/{id}", affectationClient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(affectationClient.getId().intValue()))
            .andExpect(jsonPath("$.dateDebutMission").value(sameInstant(DEFAULT_DATE_DEBUT_MISSION)))
            .andExpect(jsonPath("$.dateFinMission").value(sameInstant(DEFAULT_DATE_FIN_MISSION)));
    }

    @Test
    @Transactional
    public void getNonExistingAffectationClient() throws Exception {
        // Get the affectationClient
        restAffectationClientMockMvc.perform(get("/api/affectation-clients/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAffectationClient() throws Exception {
        // Initialize the database
        affectationClientRepository.saveAndFlush(affectationClient);
        int databaseSizeBeforeUpdate = affectationClientRepository.findAll().size();

        // Update the affectationClient
        AffectationClient updatedAffectationClient = affectationClientRepository.findOne(affectationClient.getId());
        updatedAffectationClient
            .dateDebutMission(UPDATED_DATE_DEBUT_MISSION)
            .dateFinMission(UPDATED_DATE_FIN_MISSION);

        restAffectationClientMockMvc.perform(put("/api/affectation-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAffectationClient)))
            .andExpect(status().isOk());

        // Validate the AffectationClient in the database
        List<AffectationClient> affectationClientList = affectationClientRepository.findAll();
        assertThat(affectationClientList).hasSize(databaseSizeBeforeUpdate);
        AffectationClient testAffectationClient = affectationClientList.get(affectationClientList.size() - 1);
        assertThat(testAffectationClient.getDateDebutMission()).isEqualTo(UPDATED_DATE_DEBUT_MISSION);
        assertThat(testAffectationClient.getDateFinMission()).isEqualTo(UPDATED_DATE_FIN_MISSION);
    }

    @Test
    @Transactional
    public void updateNonExistingAffectationClient() throws Exception {
        int databaseSizeBeforeUpdate = affectationClientRepository.findAll().size();

        // Create the AffectationClient

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAffectationClientMockMvc.perform(put("/api/affectation-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(affectationClient)))
            .andExpect(status().isCreated());

        // Validate the AffectationClient in the database
        List<AffectationClient> affectationClientList = affectationClientRepository.findAll();
        assertThat(affectationClientList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAffectationClient() throws Exception {
        // Initialize the database
        affectationClientRepository.saveAndFlush(affectationClient);
        int databaseSizeBeforeDelete = affectationClientRepository.findAll().size();

        // Get the affectationClient
        restAffectationClientMockMvc.perform(delete("/api/affectation-clients/{id}", affectationClient.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AffectationClient> affectationClientList = affectationClientRepository.findAll();
        assertThat(affectationClientList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AffectationClient.class);
    }
}
