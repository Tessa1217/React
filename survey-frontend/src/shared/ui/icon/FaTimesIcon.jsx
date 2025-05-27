import { memo } from 'react';
import { FaTimes } from 'react-icons/fa';
const FaTimesIcon = memo((props) => {
  return (
    <>
      <FaTimes {...props} />
    </>
  );
});
export default FaTimesIcon;
