package com.toy.survey.domain.code;

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
@Table(name = "code_group")
public class CodeGroup extends CommonSystemField {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 50, nullable = false)
  private String code;

  @Column(length = 100, nullable = false)
  private String name;

  @Column
  @Lob
  private String description;

  @OneToMany(mappedBy = "codeGroup", fetch = FetchType.LAZY)
  private List<Code> codeList;

  
}
