package com.toy.survey.domain.user;

import java.util.HashSet;
import java.util.Set;

import com.toy.survey.domain.common.CommonSystemField;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "USERS")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends CommonSystemField {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 50, nullable = false)
  private String userId;

  @Column(length = 255, nullable = false)
  private String email;

  @Column(length = 255)
  private String password;

  @Column(length = 100)
  private String name;

  @Builder.Default
  @ManyToMany(fetch = FetchType.LAZY, cascade = {
                CascadeType.PERSIST,
                CascadeType.MERGE
            })
  @JoinTable(
      name = "user_roles",
      joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "role_id")
  )
  private Set<Role> roles = new HashSet<>();  

  public void setEncodedPassword(String encodedPassword) {
    this.password = encodedPassword;
  }

  public void setRole(Role role) {
    this.roles.add(role);
    role.setUser(this);
  }

}
