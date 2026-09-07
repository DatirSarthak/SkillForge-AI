package com.skillforge.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotesAnalyticsDto {

    private long totalNotes;

    private long detailedNotes;

    private long summaryNotes;

    private long bulletPointsNotes;

    private long interviewNotes;

    private long revisionNotes;
}