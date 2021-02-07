package com.capgemini.service.impl;

import com.capgemini.service.PersonneService;
import com.capgemini.domain.Personne;
import com.capgemini.repository.PersonneRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Personne}.
 */
@Service
@Transactional
public class PersonneServiceImpl implements PersonneService {

    private final Logger log = LoggerFactory.getLogger(PersonneServiceImpl.class);

    private final PersonneRepository personneRepository;

    public PersonneServiceImpl(PersonneRepository personneRepository) {
        this.personneRepository = personneRepository;
    }

    @Override
    public Personne save(Personne personne) {
        log.debug("Request to save Personne : {}", personne);
        return personneRepository.save(personne);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Personne> findAll(Pageable pageable) {
        log.debug("Request to get all Personnes");
        return personneRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Personne> findOne(Long id) {
        log.debug("Request to get Personne : {}", id);
        return personneRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Personne : {}", id);
        personneRepository.deleteById(id);
    }
}
