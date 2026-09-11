package com.jeevan.jobtracker.repository;

import com.jeevan.jobtracker.model.ApplicationStatus;
import com.jeevan.jobtracker.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByStatus(ApplicationStatus status);

    List<JobApplication> findByCompanyContainingIgnoreCase(String company);
}
