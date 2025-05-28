package com.toy.survey.domain.survey;

import com.toy.survey.domain.common.CommonSystemField;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "form_answer")
public class FormAnswer extends CommonSystemField {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "response_id", referencedColumnName = "id", nullable = false)
  private FormResponse response;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "question_id", referencedColumnName = "id", nullable = false)
  private Question question;

  @Column
  @Lob
  private String answerText;

  @ManyToOne
  @JoinColumn(name = "selected_option_id", referencedColumnName = "id")
  private OptionItem selectedOption;


}
