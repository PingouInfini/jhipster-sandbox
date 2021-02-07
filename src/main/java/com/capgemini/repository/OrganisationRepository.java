package com.capgemini.repository;

import com.capgemini.domain.Organisation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Organisation entity.
 */
@Repository
public interface OrganisationRepository extends JpaRepository<Organisation, Long> {

    @Query(value = "select distinct organisation from Organisation organisation left join fetch organisation.personnes",
        countQuery = "select count(distinct organisation) from Organisation organisation")
    Page<Organisation> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct organisation from Organisation organisation left join fetch organisation.personnes")
    List<Organisation> findAllWithEagerRelationships();

    @Query("select organisation from Organisation organisation left join fetch organisation.personnes where organisation.id =:id")
    Optional<Organisation> findOneWithEagerRelationships(@Param("id") Long id);
}
