package com.example.CodeThread.entity;

import jakarta.persistence.*;
import lombok.*;

import com.example.CodeThread.entity.CodeDocument;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "review_sessions")
public class ReviewSession extends BaseEntity {

    @Column(nullable = false,unique = true)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @OneToMany(mappedBy = "reviewSession")
    private List<CodeDocument> documents;

    @OneToMany(mappedBy = "reviewSession")
    private List<ReviewSessionMember> members;

}
