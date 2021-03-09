const { TreeNode } = require('./leetcode');

/**
 * 二重遍历
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  function heightOfTree(root) {
    if (root == null) return 0;
    return 1 + Math.max(heightOfTree(root.left), heightOfTree(root.right));
  }
  if (root == null) return 0;
  var res = heightOfTree(root.left) + heightOfTree(root.right);
  return Math.max(res, diameterOfBinaryTree(root.left), diameterOfBinaryTree(root.right));
};

/**
 * 后序遍历，一重循环
 * @param {TreeNode} root 
 * @returns {number}
 */
var diameterOfBinaryTree2 = function(root) {
  var res = 0;
  function postTrav(root) {
    var height;
    if (root == null) {
      height = 0;
    } else {
      var lHeight = postTrav(root.left);
      var rHeight = postTrav(root.right);
      height = Math.max(lHeight, rHeight) + 1;
      res = Math.max(res, lHeight + rHeight);
    }
    return height;
  }
  postTrav(root);
  return res;
};


module.exports = diameterOfBinaryTree;
