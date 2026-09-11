package com.jeevan.jobtracker.dto;

import java.util.Map;

public record StatsResponse(long total, Map<String, Long> byStatus) {}
