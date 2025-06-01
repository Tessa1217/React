package com.toy.survey.domain.survey;

import java.time.LocalDateTime;
import java.util.List;

import com.toy.survey.domain.common.CommonSystemField;
import com.toy.survey.domain.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "form_response")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FormResponse extends CommonSystemField {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "form_id", referencedColumnName = "id", nullable = false)
  private Form form;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
  private User user;

  @Column(name = "submitted_at", nullable = false)
  private LocalDateTime submittedAt;

  @OneToMany(mappedBy = "response", fetch = FetchType.LAZY)
  private List<FormAnswer> formAnswers;

  public void addFormAnswer(FormAnswer formAnswer) {
    this.formAnswers.add(formAnswer);
    formAnswer.assignFormResponse(this);
  }
}
