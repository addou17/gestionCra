package com.dimaconsulting.gestioncra.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.dimaconsulting.gestioncra.domain.enumeration.TypeUtilisateur;

/**
 * A Utilisateur.
 */
@Entity
@Table(name = "utilisateur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "telephone")
    private Long telephone;

    @Column(name = "mail")
    private String mail;

    @Column(name = "adresse")
    private String adresse;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_utilisateur")
    private TypeUtilisateur typeUtilisateur;

    @OneToMany(mappedBy = "utilisateur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AffectationClient> utilisateurs = new HashSet<>();

    @OneToMany(mappedBy = "utilisateur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Activite> utilisateur1S = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Utilisateur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Utilisateur prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Long getTelephone() {
        return telephone;
    }

    public Utilisateur telephone(Long telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(Long telephone) {
        this.telephone = telephone;
    }

    public String getMail() {
        return mail;
    }

    public Utilisateur mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getAdresse() {
        return adresse;
    }

    public Utilisateur adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public TypeUtilisateur getTypeUtilisateur() {
        return typeUtilisateur;
    }

    public Utilisateur typeUtilisateur(TypeUtilisateur typeUtilisateur) {
        this.typeUtilisateur = typeUtilisateur;
        return this;
    }

    public void setTypeUtilisateur(TypeUtilisateur typeUtilisateur) {
        this.typeUtilisateur = typeUtilisateur;
    }

    public Set<AffectationClient> getUtilisateurs() {
        return utilisateurs;
    }

    public Utilisateur utilisateurs(Set<AffectationClient> affectationClients) {
        this.utilisateurs = affectationClients;
        return this;
    }

    public Utilisateur addUtilisateur(AffectationClient affectationClient) {
        this.utilisateurs.add(affectationClient);
        affectationClient.setUtilisateur(this);
        return this;
    }

    public Utilisateur removeUtilisateur(AffectationClient affectationClient) {
        this.utilisateurs.remove(affectationClient);
        affectationClient.setUtilisateur(null);
        return this;
    }

    public void setUtilisateurs(Set<AffectationClient> affectationClients) {
        this.utilisateurs = affectationClients;
    }

    public Set<Activite> getUtilisateur1S() {
        return utilisateur1S;
    }

    public Utilisateur utilisateur1S(Set<Activite> activites) {
        this.utilisateur1S = activites;
        return this;
    }

    public Utilisateur addUtilisateur1(Activite activite) {
        this.utilisateur1S.add(activite);
        activite.setUtilisateur(this);
        return this;
    }

    public Utilisateur removeUtilisateur1(Activite activite) {
        this.utilisateur1S.remove(activite);
        activite.setUtilisateur(null);
        return this;
    }

    public void setUtilisateur1S(Set<Activite> activites) {
        this.utilisateur1S = activites;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Utilisateur utilisateur = (Utilisateur) o;
        if (utilisateur.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, utilisateur.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Utilisateur{" +
            "id=" + id +
            ", nom='" + nom + "'" +
            ", prenom='" + prenom + "'" +
            ", telephone='" + telephone + "'" +
            ", mail='" + mail + "'" +
            ", adresse='" + adresse + "'" +
            ", typeUtilisateur='" + typeUtilisateur + "'" +
            '}';
    }
}
