package com.dimaconsulting.gestioncra.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A AffectationClient.
 */
@Entity
@Table(name = "affectation_client")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AffectationClient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_debut_mission")
    private ZonedDateTime dateDebutMission;

    @Column(name = "date_fin_mission")
    private ZonedDateTime dateFinMission;

    @ManyToOne
    private Utilisateur utilisateur;

    @ManyToOne
    private Client client;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateDebutMission() {
        return dateDebutMission;
    }

    public AffectationClient dateDebutMission(ZonedDateTime dateDebutMission) {
        this.dateDebutMission = dateDebutMission;
        return this;
    }

    public void setDateDebutMission(ZonedDateTime dateDebutMission) {
        this.dateDebutMission = dateDebutMission;
    }

    public ZonedDateTime getDateFinMission() {
        return dateFinMission;
    }

    public AffectationClient dateFinMission(ZonedDateTime dateFinMission) {
        this.dateFinMission = dateFinMission;
        return this;
    }

    public void setDateFinMission(ZonedDateTime dateFinMission) {
        this.dateFinMission = dateFinMission;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public AffectationClient utilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
        return this;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Client getClient() {
        return client;
    }

    public AffectationClient client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AffectationClient affectationClient = (AffectationClient) o;
        if (affectationClient.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, affectationClient.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "AffectationClient{" +
            "id=" + id +
            ", dateDebutMission='" + dateDebutMission + "'" +
            ", dateFinMission='" + dateFinMission + "'" +
            '}';
    }
}
