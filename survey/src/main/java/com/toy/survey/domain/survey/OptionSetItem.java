package com.toy.survey.domain.survey;

import com.toy.survey.domain.common.CommonSystemField;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "option_set_item")
public class OptionSetItem extends CommonSystemField {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "option_set_id", referencedColumnName = "id")
  private OptionSet optionSet;

  @Column(name = "option_text", length = 255)
  private String optionText;

  @Column(name = "option_order")
  private Integer optionOrder;
  
}
