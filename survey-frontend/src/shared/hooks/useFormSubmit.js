import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import useFormAlert from '@/shared/hooks/useFormAlert';
import { useAppMutation } from '@/shared/hooks/useAppMutation';
import { resetPaging } from '@/shared/model/paging.slice';
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

  const { mutate, isPending } = useAppMutation(mutateFn, {
    showMessage,
    onSuccess: (response) => {
      if (doResetPaging) {
        dispatch(resetPaging({ key }));
      }
      onSuccess?.(response);
    },
  });

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
