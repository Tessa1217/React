import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import useFormAlert from '@/shared/hooks/useFormAlert';
import { useAppMutation } from '@/shared/hooks/useAppMutation';
import { resetPaging } from '@/shared/model/paging.slice';

/**
 * 폼 제출을 처리하는 공통 커스텀 훅
 *
 * @param {Object} config
 * @param {any} config.formPayload - 기본 제출 값
 * @param {Function} [config.getPayload] - 제출 시점에 payload를 생성할 함수 (formPayload보다 우선됨)
 * @param {ZodSchema} config.schema - 유효성 검사에 사용할 Zod 스키마
 * @param {Function} config.mutateFn - 서버 전송에 사용할 mutation 함수
 * @param {boolean} [config.showMessage=true] - 성공 메시지를 표시할지 여부
 * @param {boolean} [config.doResetPaging=false] - 성공 후 페이징 초기화 여부
 * @param {Function} [config.onSuccess] - 성공 후 실행할 콜백
 *
 * @returns {{
 *   isSaving: boolean,
 *   submit: () => Promise<void>
 * }}
 */
export const useFormSubmit = ({
  formPayload,
  getPayload,
  schema,
  mutateFn,
  showMessage = true,
  doResetPaging = false,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const { key } = useOutletContext();
  const showFormErrorAlert = useFormAlert();

  // mutate 설정
  const { mutate, isPending } = useAppMutation(mutateFn, {
    showMessage,
    onSuccess: (response) => {
      if (doResetPaging) {
        dispatch(resetPaging({ key }));
      }
      onSuccess?.(response);
    },
  });

  /**
   * 폼 제출 핸들러
   * - 스키마 유효성 검사 후 실패 시 alert
   * - 성공 시 mutate 실행
   */
  const submit = useCallback(async () => {
    const payload = formPayload;
    const result = await schema.safeParseAsync(payload);
    if (!result.success) {
      showFormErrorAlert(result.error?.issues[0]?.message);
      return;
    }
    mutate(getPayload ? getPayload() : payload);
  }, [mutate, formPayload, getPayload, schema, showFormErrorAlert]);

  return { isSaving: isPending, submit };
};
