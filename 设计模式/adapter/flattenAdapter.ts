export {}
/**
 * 
 * @param treeitem 
 *  [{
 *    name: ‘A’,
 *    key: 'A',
 *    children: [
 *        {
 *            name: 'A1',
 *            key: 'A1',
 *           parentKey: 'A'
 *        }
 *    ]
 * }]
 * 
 * @param array 
 */
function flattenAdapter(treeData, array) {
    treeData.forEach((item) => {
    array.push({
      name: item.name,
      key: item.key,
      
    })
    if (item.children ) {
      flattenAdapter(item.children, array);
    }
  })
  return array;
}