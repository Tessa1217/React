package com.toy.survey.domain.survey;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.toy.survey.domain.common.CommonSystemField;
import com.toy.survey.domain.user.User;
import com.toy.survey.dto.surveyForm.FormReq;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "form")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Form extends CommonSystemField {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  @Column(length = 255)
  private String title;

  @Column
  @Lob
  private String description;

  @Column
  private Boolean isPublic;

  @Column
  private Boolean requiresLogin;

  @Column
  private LocalDate expiresAt;

  @Builder.Default
  @OneToMany(mappedBy = "form", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<Question> questionList = new ArrayList<>();

  public void addQuestions(List<Question> questions) {
    for (Question question : questions) {
      addQuestion(question);
    }
  }

  public void addQuestion(Question question) {
    question.assignForm(this);
    questionList.add(question);    
  }

  public void setQuestions(List<Question> questions) {
    this.questionList = questions;
    for (Question question : questions) {
      question.assignForm(this);
    }
  }

  public void setUser(User user) {
    this.user = user;
  }

  public void update(FormReq req) {
    this.title = req.getTitle();
    this.expiresAt = req.getExpiresAt();
    this.description = req.getDescription();
    this.isPublic = req.getIsPublic();
    this.requiresLogin = req.getRequiresLogin();    
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Form)) {
      return false;
    }
    return id != null && id.equals(((Form) o).getId());
  }    
  
}
