package com.jeevan.jobtracker.controller;

import com.jeevan.jobtracker.dto.StatsResponse;
import com.jeevan.jobtracker.model.ApplicationStatus;
import com.jeevan.jobtracker.model.JobApplication;
import com.jeevan.jobtracker.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class JobApplicationController {

    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<JobApplication> getAll(@RequestParam(required = false) ApplicationStatus status) {
        return service.getAll(status);
    }

    @GetMapping("/{id}")
    public JobApplication getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/stats")
    public StatsResponse getStats() {
        return service.getStats();
    }

    @PostMapping
    public ResponseEntity<JobApplication> create(@Valid @RequestBody JobApplication application) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(application));
    }

    @PutMapping("/{id}")
    public JobApplication update(@PathVariable Long id, @Valid @RequestBody JobApplication application) {
        return service.update(id, application);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
