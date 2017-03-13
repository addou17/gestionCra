package com.dimaconsulting.gestioncra.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Activite.
 */
@Entity
@Table(name = "activite")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Activite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "owner")
    private Long owner;

    @Column(name = "date")
    private ZonedDateTime date;

    @Column(name = "est_valide")
    private Boolean estValide;

    @Column(name = "commentaire")
    private String commentaire;

    @OneToMany(mappedBy = "activite")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Action> activites = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOwner() {
        return owner;
    }

    public Activite owner(Long owner) {
        this.owner = owner;
        return this;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Activite date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Boolean isEstValide() {
        return estValide;
    }

    public Activite estValide(Boolean estValide) {
        this.estValide = estValide;
        return this;
    }

    public void setEstValide(Boolean estValide) {
        this.estValide = estValide;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public Activite commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public Set<Action> getActivites() {
        return activites;
    }

    public Activite activites(Set<Action> actions) {
        this.activites = actions;
        return this;
    }

    public Activite addActivite(Action action) {
        this.activites.add(action);
        action.setActivite(this);
        return this;
    }

    public Activite removeActivite(Action action) {
        this.activites.remove(action);
        action.setActivite(null);
        return this;
    }

    public void setActivites(Set<Action> actions) {
        this.activites = actions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Activite activite = (Activite) o;
        if (activite.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, activite.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Activite{" +
            "id=" + id +
            ", owner='" + owner + "'" +
            ", date='" + date + "'" +
            ", estValide='" + estValide + "'" +
            ", commentaire='" + commentaire + "'" +
            '}';
    }
}
