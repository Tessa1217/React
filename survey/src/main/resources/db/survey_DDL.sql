-- 사용자 테이블
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY comment '사용자 ID',
    email VARCHAR(255) NOT NULL UNIQUE comment '사용자 이메일',
    password VARCHAR(255) NOT NULL comment '사용자 비밀번호',
    name VARCHAR(100) comment '사용자 명',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '생성일',
    created_by VARCHAR(100) comment '생성자',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '수정일',
    updated_by VARCHAR(100) comment '수정자'
);

ALTER TABLE users COMMENT = '사용자';

-- 코드 그룹 테이블
CREATE TABLE code_group (
    id BIGINT AUTO_INCREMENT PRIMARY KEY comment '코드 그룹 ID',
    code VARCHAR(50) NOT NULL UNIQUE comment '코드',      -- 예: QUESTION_TYPE
    name VARCHAR(100) NOT NULL comment '코드명',            -- 예: 질문 유형
    description TEXT comment '설명',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '생성일',
    created_by VARCHAR(100) comment '생성자',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '수정일',
    updated_by VARCHAR(100) comment '수정자'    
);

ALTER TABLE code_group COMMENT = '코드 그룹';

-- 코드 테이블
CREATE TABLE code (
    id BIGINT AUTO_INCREMENT PRIMARY KEY comment '코드 ID',
    code_group_id BIGINT NOT NULL comment '코드 그룹 아이디',
    code VARCHAR(50) NOT NULL comment '코드',             -- 예: SHORT_TEXT
    name VARCHAR(100) NOT NULL comment '코드명',            -- 예: 단답형
    description TEXT comment '설명',
    code_order INT comment '코드 순서',    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '생성일',
    created_by VARCHAR(100) comment '생성자',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '수정일',
    updated_by VARCHAR(100) comment '수정자',        
    UNIQUE (code_group_id, code),
    FOREIGN KEY (code_group_id) REFERENCES code_group(id)
);

ALTER TABLE code COMMENT = '코드';

-- 공통 옵션 세트 정의 (예: 5점 척도, 예/아니오 등)
CREATE TABLE option_set (
    id BIGINT AUTO_INCREMENT PRIMARY KEY comment '공통 옵션 세트 ID',
    name VARCHAR(100) NOT NULL comment '공통 옵션 세트 명칭',
    description TEXT comment '공통 옵션 세트 설명',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '생성일',
    created_by VARCHAR(100) comment '생성자',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '수정일',
    updated_by VARCHAR(100) comment '수정자'    
);

ALTER TABLE option_set COMMENT = '공통 옵션 세트';

-- 옵션 세트에 포함된 개별 항목
CREATE TABLE option_set_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY comment '공통 옵션 세트 항목 ID',
    option_set_id BIGINT NOT NULL comment '공통 옵션 세트 ID',
    option_text VARCHAR(255) NOT NULL comment '항목 텍스트',
    option_order INT comment '항목 순서',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '생성일',
    created_by VARCHAR(100) comment '생성자',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '수정일',
    updated_by VARCHAR(100) comment '수정자',    
    FOREIGN KEY (option_set_id) REFERENCES option_set(id)
);

ALTER TABLE option_set_item COMMENT = '공통 옵션 세트 항목';

-- 설문지 테이블
CREATE TABLE form (
    id BIGINT AUTO_INCREMENT PRIMARY KEY comment '설문지 ID',
    user_id BIGINT NOT NULL comment '설문지 작성 사용자 ID',
    title VARCHAR(255) NOT NULL comment '설문지 제목',
    description TEXT comment '설문지 설명',
    is_public BOOLEAN DEFAULT FALSE comment '공개 여부',
    requires_login BOOLEAN DEFAULT FALSE comment '로그인 필요 여부',
    expires_at TIMESTAMP NULL comment '만료일',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '생성일',
    created_by VARCHAR(100) comment '생성자',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '수정일',
    updated_by VARCHAR(100) comment '수정자',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE form COMMENT = '설문지';

-- 질문 테이블
CREATE TABLE question (
    id BIGINT AUTO_INCREMENT PRIMARY KEY comment '',
    form_id BIGINT NOT NULL comment '',
    question_text TEXT NOT NULL comment '',
    question_type_id BIGINT NOT NULL comment '질문 유형', -- 예: SHORT_TEXT, MULTIPLE_CHOICE, SCALE 등
    is_required BOOLEAN DEFAULT FALSE comment '필수 질문 여부',
    question_order INT comment '질문 순서',
    option_set_id BIGINT NULL comment '공통 옵션 세트 ID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '생성일',
    created_by VARCHAR(100) comment '생성자',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '수정일',
    updated_by VARCHAR(100) comment '수정자',    
    FOREIGN KEY (form_id) REFERENCES form(id),
    FOREIGN KEY (option_set_id) REFERENCES option_set(id),
    FOREIGN KEY (question_type_id) REFERENCES code(id)
);

ALTER TABLE question COMMENT = '질문';

-- 선택지 (객관식 등) 테이블
CREATE TABLE option_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY comment '',
    question_id BIGINT NOT NULL comment '',
    option_text VARCHAR(255) NOT NULL comment '',
    option_order INT comment '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '생성일',
    created_by VARCHAR(100) comment '생성자',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '수정일',
    updated_by VARCHAR(100) comment '수정자',    
    FOREIGN KEY (question_id) REFERENCES question(id)
);

ALTER TABLE option_item COMMENT = '질문 옵션';

-- 질문 논리 조건 테이블 (분기 로직)
CREATE TABLE question_logic (
    id BIGINT AUTO_INCREMENT PRIMARY KEY comment '질문 논리 조건 ID',
    source_question_id BIGINT NOT NULL comment '출처 문제 ID',
    selected_option_id BIGINT NOT NULL comment '선택 옵션 ID',
    target_question_id BIGINT NOT NULL comment '대상 문제 ID',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '생성일',
    created_by VARCHAR(100) comment '생성자',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '수정일',
    updated_by VARCHAR(100) comment '수정자',
    FOREIGN KEY (source_question_id) REFERENCES question(id),
    FOREIGN KEY (selected_option_id) REFERENCES option_item(id),
    FOREIGN KEY (target_question_id) REFERENCES question(id)
);

ALTER TABLE question_logic COMMENT = '질문 논리 조건';

-- 설문 응답 테이블
CREATE TABLE form_response (
    id BIGINT AUTO_INCREMENT PRIMARY KEY comment '설문 응답 ID',
    form_id BIGINT NOT NULL comment '설문지 ID',
    user_id BIGINT NULL comment '사용자 ID',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '응답 제출일',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '생성일',
    created_by VARCHAR(100) comment '생성자',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '수정일',
    updated_by VARCHAR(100) comment '수정자',    
    FOREIGN KEY (form_id) REFERENCES form(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE form_response COMMENT = '설문 응답';

-- 답변 테이블
CREATE TABLE form_answer (
    id BIGINT AUTO_INCREMENT PRIMARY KEY comment '답변 ID',
    response_id BIGINT NOT NULL comment '설문 응답 ID',
    question_id BIGINT NOT NULL comment '문제 ID',
    answer_text TEXT comment '답변 텍스트',
    selected_option_id BIGINT NULL comment '선택 항목 ID', -- 객관식이면 선택된 보기
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '생성일',
    created_by VARCHAR(100) comment '생성자',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '수정일',
    updated_by VARCHAR(100) comment '수정자',    
    FOREIGN KEY (response_id) REFERENCES form_response(id),
    FOREIGN KEY (question_id) REFERENCES question(id),
    FOREIGN KEY (selected_option_id) REFERENCES option_item(id)
);

ALTER TABLE form_answer COMMENT = '설문 답변';