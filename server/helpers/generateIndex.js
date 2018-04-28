/**
 * Generate indexes for object creation
 * @param {object} lastIndex
 * @returns { object } nextIndex
 */
const generateIndex = ({ lastIndex }) => {
  const nextIndex = lastIndex + 1;
  return {
    nextIndex
  };
};
export default generateIndex;