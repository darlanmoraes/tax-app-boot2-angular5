package com.darlan.taxclient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Created by darlan on 13/04/18.
 */
@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
interface ClientRepository extends JpaRepository<Client, Long> {}