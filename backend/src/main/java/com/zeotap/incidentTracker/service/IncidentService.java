package com.zeotap.incidentTracker.service;

import com.zeotap.incidentTracker.dto.IncidentUpdateRequest;
import com.zeotap.incidentTracker.entity.IncidentPO;
import com.zeotap.incidentTracker.enums.Severity;
import com.zeotap.incidentTracker.enums.Status;
import com.zeotap.incidentTracker.repository.IncidentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.persistence.criteria.Predicate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class IncidentService {

    private final IncidentRepository repo;

    public IncidentService(IncidentRepository repo) {
        this.repo = repo;
    }

    public IncidentPO create(IncidentPO incident) {
        incident.setStatus(Status.OPEN);
        return repo.save(incident);
    }

    public Page<IncidentPO> getAll(String search, Severity severity, Status status, String service, Pageable pageable) {
        Specification<IncidentPO> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("title")), "%" + search.toLowerCase() + "%"));
            }
            if (severity != null) {
                predicates.add(cb.equal(root.get("severity"), severity));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            if (service != null) {
                predicates.add(cb.equal(root.get("service"), service));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return repo.findAll(spec, pageable);
    }

    public IncidentPO get(UUID id) {
        return repo.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Incident not found with id: " + id));
    }

    public IncidentPO update(UUID id, IncidentPO update) {
        IncidentPO existing = get(id);

        if (update.getStatus() != null) {
            existing.setStatus(update.getStatus());
        }
        if (update.getOwner() != null) {
            existing.setOwner(update.getOwner());
        }
        if (update.getSummary() != null) {
            existing.setSummary(update.getSummary());
        }

        return repo.save(existing);
    }

    public IncidentPO updateIncident(UUID id, IncidentUpdateRequest req) {
        IncidentPO inc = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found"));

        if (req.getSeverity() != null)
            inc.setSeverity(Severity.valueOf(req.getSeverity()));

        if (req.getStatus() != null) {
            inc.setStatus(Status.valueOf(req.getStatus()));
            if (!List.of("OPEN","MITIGATED","RESOLVED").contains(req.getStatus()))
                throw new IllegalArgumentException("Invalid status");
        }

        if (req.getOwner() != null)
            inc.setOwner(req.getOwner());

        if (req.getSummary() != null)
            inc.setSummary(req.getSummary());

        inc.setUpdatedAt(LocalDateTime.now());

        return repo.save(inc);
    }

}
