package com.zeotap.incidentTracker.controller;

import com.zeotap.incidentTracker.dto.IncidentUpdateRequest;
import com.zeotap.incidentTracker.entity.IncidentPO;
import com.zeotap.incidentTracker.enums.Severity;
import com.zeotap.incidentTracker.enums.Status;
import com.zeotap.incidentTracker.service.IncidentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin
public class IncidentController {

    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }


    @PostMapping
    public IncidentPO create(@RequestBody IncidentPO incidentPO){
        return incidentService.create(incidentPO);
    }

    @GetMapping
    public Page<IncidentPO> list(
            @RequestParam(required=false) String search,
            @RequestParam(required=false) Severity severity,
            @RequestParam(required=false) Status status,
            @RequestParam(required=false) String service,
            Pageable pageable){
        return incidentService.getAll(search, severity, status, service, pageable);
    }

    @GetMapping("/{id}")
    public IncidentPO get(@PathVariable UUID id){
        return incidentService.get(id);
    }

    @PatchMapping("/{id}")
    public IncidentPO updateIncident(
            @PathVariable UUID id,
            @RequestBody IncidentUpdateRequest req) {

        return incidentService.updateIncident(id, req);
    }}
