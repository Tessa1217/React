package com.toy.survey.domain.survey;

import com.toy.survey.domain.common.CommonSystemField;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "question_logic")
public class QuestionLogic extends CommonSystemField {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "source_question_id", referencedColumnName = "id", nullable = false)
  private Question sourceQuestion;

  @ManyToOne
  @JoinColumn(name = "selected_option_id", referencedColumnName = "id", nullable = false)
  private OptionItem selectedOption;

  @ManyToOne
  @JoinColumn(name = "target_question_id", referencedColumnName = "id", nullable = false)
  private Question targetQuestion;


}
