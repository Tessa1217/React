package com.toy.survey.domain.survey;

import java.util.List;

import com.toy.survey.domain.common.CommonSystemField;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "option_set")
public class OptionSet extends CommonSystemField {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 100, nullable = false)
  private String name;

  @Column
  @Lob
  private String description;

  @OneToMany(mappedBy = "optionSet", fetch = FetchType.LAZY)
  private List<OptionSetItem> optionSetItemList;

  
}
