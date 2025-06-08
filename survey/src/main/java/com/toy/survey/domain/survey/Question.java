package com.toy.survey.domain.survey;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.BatchSize;

import com.toy.survey.domain.code.Code;
import com.toy.survey.domain.common.CommonSystemField;
import com.toy.survey.dto.surveyForm.QuestionReq;

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
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "question")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Question extends CommonSystemField {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "form_id", referencedColumnName = "id", nullable = false)
  private Form form;

  @Column
  private String questionText;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "question_type_id", referencedColumnName = "id", nullable = false)
  private Code questionType;

  @Column
  private Boolean isRequired;

  @Column
  private Integer questionOrder;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "option_set_id", referencedColumnName = "id")
  private OptionSet optionSet;

  @Builder.Default
  @OrderBy("optionOrder ASC")
  @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
  @BatchSize(size = 100)
  private List<OptionItem> optionList = new ArrayList<>();

  public void assignForm(Form form) {
    this.form = form;
  }

  public void setOptions(List<OptionItem> options) {  
    // this.optionList = options;    
    if (options == null || options.isEmpty()) {
      this.optionList = new ArrayList<>();
      return;
    }
    for (OptionItem option : options) {
      this.addOption(option);      
    }
  }

  public void setQuestionTypeCode(Code code) {    
    this.questionType = code;
  }

  public void addOption(OptionItem optionItem) {    
    optionItem.assignQuestion(this);
    optionList.add(optionItem);    
  }

  public void update(QuestionReq req) {
    if (isSameAs(req)) {      
      return;
    }    
    this.questionText = req.getQuestionText();
    this.isRequired = req.getIsRequired();
    this.questionOrder = req.getQuestionOrder();
  }

  public boolean isSameAs(QuestionReq req) {
  return Objects.equals(this.questionText, req.getQuestionText())
      && Objects.equals(this.isRequired, req.getIsRequired())
      && Objects.equals(this.questionOrder, req.getQuestionOrder());
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Question)) {
      return false;
    }
    return id != null && id.equals(((Question) o).getId());
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }

}
