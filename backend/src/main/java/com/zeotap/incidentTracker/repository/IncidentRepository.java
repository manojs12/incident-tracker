package com.zeotap.incidentTracker.repository;

import com.zeotap.incidentTracker.entity.IncidentPO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@EnableJpaRepositories
public interface IncidentRepository extends JpaRepository<IncidentPO, UUID>, JpaSpecificationExecutor<IncidentPO> {

}
