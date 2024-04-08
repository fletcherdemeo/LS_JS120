function joinOr(arr, delimiter = ', ', finalDelimiter = 'or ') {
  let lastInd = arr.length - 1;
  let str1 = arr.slice(0, lastInd).join(delimiter);
  let str2 = `${finalDelimiter} ${arr[lastInd]}`;
  return `${str1} ${str2}`;
}

// obj is the context for `joinOr`; replace it with the correct context.
joinOr([1, 2])                   // # => "1 or 2"
joinOr([1, 2, 3])                // # => "1, 2, or 3"
joinOr([1, 2, 3], '; ')          // # => "1; 2; or 3"
joinOr([1, 2, 3], ', ', 'and')   // # => "1, 2, and 3"

