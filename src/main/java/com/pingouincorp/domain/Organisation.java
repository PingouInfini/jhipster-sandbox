package com.pingouincorp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Organisation.
 */
@Entity
@Table(name = "organisation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Organisation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "appellation", nullable = false)
    private String appellation;

    @Column(name = "description")
    private String description;

    @Column(name = "date_creation")
    private Instant dateCreation;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "organisation_personne",
               joinColumns = @JoinColumn(name = "organisation_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "personne_id", referencedColumnName = "id"))
    private Set<Personne> personnes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAppellation() {
        return appellation;
    }

    public Organisation appellation(String appellation) {
        this.appellation = appellation;
        return this;
    }

    public void setAppellation(String appellation) {
        this.appellation = appellation;
    }

    public String getDescription() {
        return description;
    }

    public Organisation description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getDateCreation() {
        return dateCreation;
    }

    public Organisation dateCreation(Instant dateCreation) {
        this.dateCreation = dateCreation;
        return this;
    }

    public void setDateCreation(Instant dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Set<Personne> getPersonnes() {
        return personnes;
    }

    public Organisation personnes(Set<Personne> personnes) {
        this.personnes = personnes;
        return this;
    }

    public Organisation addPersonne(Personne personne) {
        this.personnes.add(personne);
        personne.getOrganisations().add(this);
        return this;
    }

    public Organisation removePersonne(Personne personne) {
        this.personnes.remove(personne);
        personne.getOrganisations().remove(this);
        return this;
    }

    public void setPersonnes(Set<Personne> personnes) {
        this.personnes = personnes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Organisation)) {
            return false;
        }
        return id != null && id.equals(((Organisation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Organisation{" +
            "id=" + getId() +
            ", appellation='" + getAppellation() + "'" +
            ", description='" + getDescription() + "'" +
            ", dateCreation='" + getDateCreation() + "'" +
            "}";
    }
}
