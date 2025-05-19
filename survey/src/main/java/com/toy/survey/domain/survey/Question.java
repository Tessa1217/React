package com.toy.survey.domain.survey;

import java.util.List;

import com.toy.survey.domain.code.Code;
import com.toy.survey.domain.common.CommonSystemField;

import jakarta.persistence.CascadeType;
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

@Entity
@Table(name = "question")
public class Question extends CommonSystemField {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "form_id", referencedColumnName = "id", nullable = false)
  private Form form;

  @Column
  private String questionText;

  @ManyToOne
  @JoinColumn(name = "question_type_id", referencedColumnName = "id", nullable = false)
  private Code questionType;

  @Column
  private Boolean isRequired;

  @Column
  private Integer questionOrder;

  @ManyToOne
  @JoinColumn(name = "option_set_id", referencedColumnName = "id")
  private OptionSet optionSet;

  @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  private List<OptionItem> optionList;

  public void assignForm(Form form) {
    this.form = form;
  }

  public void addOption(OptionItem optionItem) {
    optionList.add(optionItem);
    optionItem.assignQuestion(this);
  }

}
