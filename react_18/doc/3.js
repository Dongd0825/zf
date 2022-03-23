// 每种更新的有优先级
let update1 = {priority: 1}
let task1 = {update: update1, priority:1};
let update2 = {priority: 2}
let task2 = {update: update2, priority:2};
let update3 = {priority: 3}
let task3 = [task1, task2, task3];
// 内部的存储结构，不是数组，是一个小顶堆
// 每次react执行任务，task
// 取堆顶，最小的，也就是优先级最高的执行