/**
 * Generate indexes for object creation
 * @param {object} lastIndex
 * @returns { number } nextIndex
 */
const generateIndex = ({ lastIndex }) => {
  const nextIndex = lastIndex + 1;
  return {
    nextIndex
  };
};
export default generateIndex;