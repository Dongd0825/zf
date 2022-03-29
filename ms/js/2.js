/*
 Semantic/sɪˈmæntɪk/ Versioning是一个前端通用的版本定义规范。格式为“{MAJOR}.{MINOR}.{PATCH}-{alpha|beta|rc}.{number)"，要求实现compare(a,b)方法，比较ab两个版本大小。
   + 当a>b是返回1;
   + 当a=b是返回0;
   + 当a<b是返回-1;
   其中：rc>beta>alpha，major>minor>patch;
   例子：1.2.3<1.2.4<1.3.0-alpha.1<1.3.0-alpha.2<1.3.0-beta.1<1.3.0-rc.1<1.3.0

 课后：
   输入: ['1.1', '2.3.3', '4.3.5', '0.3.1', '0.302.1', '4.20.0', '4.3.5.1', '1.2.3.4.5']
   输出: ['0.3.1', '0.302.1', '1.1', '1.2.3.4.5', '2.3.3', '4.3.5', '4.3.5.1', '4.20.0'] 
 */

  function compare(a, b) {
    debugger
    let reg = /^\d+(\.\d+){2}(-(alpha|beta|rc)\.\d+)?$/i,
      n = -1,
      diff,
      flag;

    if (!reg.test(a) || !reg.test(b)) throw new TypeError('请输入正确的版本号!');
    a = a.split(/(?:\.|-)/g);
    b = b.split(/(?:\.|-)/g);

    const recur = () => {
      debugger
      n++;
      let item1 = a[n];
      let item2 = b[n];

      // 比较到末位才会出现的情况
      if (!item1 || !item2) {
        flag = (!item1 && !item2) ? 0 : (!item1 ? 1 : -1);
        //直接return
        return;
      }

      diff = (isNaN(item1) || isNaN(item2)) ? item1.localeCompare(item2) : item1 - item2
      if (diff === 0) {
        recur();
        return;
      }
      flag = diff > 0 ? 1 : -1;
    }
    recur();
    return flag;
  }

  function compare1(a, b) {
    debugger
    let reg = /^\d+(\.\d+){2}(-(alpha|beta|rc)\.\d+)?$/i,
      n = -1,
      diff,
      flag;

    // if (!reg.test(a) || !reg.test(b)) throw new TypeError('请输入正确的版本号!');
    a = a.split(/(?:\.|-)/g);
    b = b.split(/(?:\.|-)/g);

    const recur = () => {
      n++;
      let item1 = a[n];
      let item2 = b[n];

      // 比较到末位才会出现的情况
      if (!item1 || !item2) {
        flag = (!item1 && !item2) ? 0 : (!item1 ? 1 : -1);
        //直接return
        return;
      }

      diff = (isNaN(item1) || isNaN(item2)) ? item1.localeCompare(item2) : item1 - item2
      if (diff === 0) {
        recur();
        return;
      }
      flag = diff > 0 ? 1 : -1;
    }
    recur();
    return flag;
  }

  // console.log(compare('1.2.3', '1.3.0-alpha.1'));
  console.log(['1.1', '2.3.3', '4.3.5', '0.3.1', '0.302.1', '4.20.0', '4.3.5.1', '1.2.3.4.5'].sort(compare1))