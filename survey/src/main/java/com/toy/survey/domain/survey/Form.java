package com.toy.survey.domain.survey;

import java.time.LocalDateTime;
import java.util.List;

import com.toy.survey.domain.common.CommonSystemField;
import com.toy.survey.domain.user.User;

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

@Entity
@Table(name = "form")
public class Form extends CommonSystemField {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
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
  private LocalDateTime expiresAt;

  @OneToMany(mappedBy = "form", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Question> questionList;

  public void addQuestion(Question question) {
    questionList.add(question);
    question.assignForm(this);
  }
  
}
