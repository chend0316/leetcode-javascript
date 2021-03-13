const { ListNode } = require('./leetcode');

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  let dummy = new ListNode();
  dummy.next = head;
  let pre = dummy;
  let p = head;
  while (p && p.next) {
    let post = p.next.next;
    p.next.next = p;
    pre.next = p.next;
    p.next = post;
    pre = p;
    p = post;
  }
  return dummy.next;
};

module.exports = swapPairs;