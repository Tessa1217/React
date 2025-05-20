import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchFormListRequest } from '@/features/formViewer/model/formViewer.slice';
import FormTable from '@/features/formViewer/ui/FormTable';
const FormListContainer = () => {
  const formList = useSelector(({ formViewer }) => formViewer.formList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFormListRequest());
  }, [dispatch]);

  return <FormTable formList={formList || []} />;
};

export default FormListContainer;
