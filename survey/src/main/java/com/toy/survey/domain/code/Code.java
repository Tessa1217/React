package com.toy.survey.domain.code;

import com.toy.survey.domain.common.CommonSystemField;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "code")
public class Code extends CommonSystemField {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "code_group_id", referencedColumnName = "id")
  private CodeGroup codeGroup;

  @Column(length = 50, nullable = false)
  private String code;

  @Column(length = 100, nullable = false)
  private String name;

  @Column
  @Lob
  private String description;

  @Column(name = "code_order")
  private Integer codeOrder;
  
}
