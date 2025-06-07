package com.toy.survey.domain.survey;

import java.util.Objects;

import com.toy.survey.domain.common.CommonSystemField;
import com.toy.survey.dto.surveyForm.OptionItemReq;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "option_item")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OptionItem extends CommonSystemField {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "question_id", referencedColumnName = "id", nullable = false)
  private Question question;

  @Column(name = "option_text", length = 255, nullable = false)
  private String optionText;

  @Column(name = "option_order")
  private Integer optionOrder;

  public void assignQuestion(Question question) {
    this.question = question;
  }

  public void update(OptionItemReq req) {
    if (isSameAs(req)) {
      return;
    }
    this.optionText = req.getOptionText();
    this.optionOrder = req.getOptionOrder();    
  }

  public boolean isSameAs(OptionItemReq req) {
    return (
      Objects.equals(this.optionText, req.getOptionText()) &&
      Objects.equals(this.optionOrder, req.getOptionOrder())
    );
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof OptionItem)) {
      return false;
    }
    return id != null && id.equals(((OptionItem) o).getId());
  }  

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }

}
