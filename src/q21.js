const {ListNode} = require('./leetcode');

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  let dummy = new ListNode();
  let p = dummy;
  while (l1 || l2) {
    if (l2 == null || (l1 != null && l1.val < l2.val)) {
      p.next = new ListNode(l1.val);
      l1 = l1.next;
    } else {
      p.next = new ListNode(l2.val);
      l2= l2.next;
    }
    p = p.next;
  }
  return dummy.next;
};

module.exports = mergeTwoLists;
