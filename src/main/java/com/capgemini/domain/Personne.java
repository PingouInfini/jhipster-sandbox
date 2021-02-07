package com.capgemini.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.capgemini.domain.enumeration.Couleur;

/**
 * A Personne.
 */
@Entity
@Table(name = "personne")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Personne implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @NotNull
    @Column(name = "date_de_naissance", nullable = false)
    private Instant dateDeNaissance;

    @Column(name = "taille")
    private Integer taille;

    @Enumerated(EnumType.STRING)
    @Column(name = "couleur_yeux")
    private Couleur couleurYeux;

    @ManyToMany(mappedBy = "personnes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Organisation> organisations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Personne nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Personne prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Instant getDateDeNaissance() {
        return dateDeNaissance;
    }

    public Personne dateDeNaissance(Instant dateDeNaissance) {
        this.dateDeNaissance = dateDeNaissance;
        return this;
    }

    public void setDateDeNaissance(Instant dateDeNaissance) {
        this.dateDeNaissance = dateDeNaissance;
    }

    public Integer getTaille() {
        return taille;
    }

    public Personne taille(Integer taille) {
        this.taille = taille;
        return this;
    }

    public void setTaille(Integer taille) {
        this.taille = taille;
    }

    public Couleur getCouleurYeux() {
        return couleurYeux;
    }

    public Personne couleurYeux(Couleur couleurYeux) {
        this.couleurYeux = couleurYeux;
        return this;
    }

    public void setCouleurYeux(Couleur couleurYeux) {
        this.couleurYeux = couleurYeux;
    }

    public Set<Organisation> getOrganisations() {
        return organisations;
    }

    public Personne organisations(Set<Organisation> organisations) {
        this.organisations = organisations;
        return this;
    }

    public Personne addOrganisation(Organisation organisation) {
        this.organisations.add(organisation);
        organisation.getPersonnes().add(this);
        return this;
    }

    public Personne removeOrganisation(Organisation organisation) {
        this.organisations.remove(organisation);
        organisation.getPersonnes().remove(this);
        return this;
    }

    public void setOrganisations(Set<Organisation> organisations) {
        this.organisations = organisations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Personne)) {
            return false;
        }
        return id != null && id.equals(((Personne) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Personne{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", dateDeNaissance='" + getDateDeNaissance() + "'" +
            ", taille=" + getTaille() +
            ", couleurYeux='" + getCouleurYeux() + "'" +
            "}";
    }
}
