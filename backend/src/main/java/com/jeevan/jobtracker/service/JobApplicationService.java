package com.jeevan.jobtracker.service;

import com.jeevan.jobtracker.dto.StatsResponse;
import com.jeevan.jobtracker.exception.ResourceNotFoundException;
import com.jeevan.jobtracker.model.ApplicationStatus;
import com.jeevan.jobtracker.model.JobApplication;
import com.jeevan.jobtracker.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JobApplicationService {

    private final JobApplicationRepository repository;

    public JobApplicationService(JobApplicationRepository repository) {
        this.repository = repository;
    }

    public List<JobApplication> getAll(ApplicationStatus status) {
        return status == null ? repository.findAll() : repository.findByStatus(status);
    }

    public JobApplication getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id " + id));
    }

    public JobApplication create(JobApplication application) {
        application.setId(null);
        return repository.save(application);
    }

    public JobApplication update(Long id, JobApplication updated) {
        JobApplication existing = getById(id);
        existing.setCompany(updated.getCompany());
        existing.setRole(updated.getRole());
        existing.setLocation(updated.getLocation());
        existing.setJobUrl(updated.getJobUrl());
        existing.setAppliedDate(updated.getAppliedDate());
        existing.setStatus(updated.getStatus());
        existing.setNotes(updated.getNotes());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.delete(getById(id));
    }

    public StatsResponse getStats() {
        List<JobApplication> all = repository.findAll();
        Map<String, Long> byStatus = all.stream()
                .collect(Collectors.groupingBy(a -> a.getStatus().name(), Collectors.counting()));
        return new StatsResponse(all.size(), byStatus);
    }
}
