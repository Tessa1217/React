import AddEtcOptionButton from '@/entities/question/ui/edit/AddEtcOptionButton';
import AddOptionButton from '@/entities/question/ui/edit/AddOptionButton';
const AddOptionButtonGroup = ({ id, onAddOption }) => {
  return (
    <div className='flex flex-row justify-center items-center gap-2'>
      <AddOptionButton id={id} onAddOption={onAddOption} />
      <AddEtcOptionButton id={id} onAddEtcOption={onAddOption} />
    </div>
  );
};
export default AddOptionButtonGroup;
