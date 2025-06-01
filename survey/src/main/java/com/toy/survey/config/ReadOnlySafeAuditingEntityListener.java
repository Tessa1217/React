package com.toy.survey.config;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.transaction.support.TransactionSynchronizationManager;

public class ReadOnlySafeAuditingEntityListener extends AuditingEntityListener {

  @Override
  public void touchForUpdate(Object target) {
    boolean isReadOnly = TransactionSynchronizationManager.isCurrentTransactionReadOnly();
    if (isReadOnly) {
      // 읽기 전용 트랜잭션이면 업데이트 무시
      return;
    }    
    super.touchForUpdate(target);    
  }
  
}
