/** Turns a list into a list of unique values
 * @param list of duplicates (possible)
 *
 * @return singletons
 */
const getSingletons = list => {
  return list.filter((value, i, self) => {
    return self.indexOf(value) === i;
  });
};

export default getSingletons;
