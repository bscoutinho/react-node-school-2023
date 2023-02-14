function find_max(nums) {
    let max_num = Number.NEGATIVE_INFINITY; // smaller than all other numbers
    for (let num of nums) {
        if (num > max_num) {
        // if num is greater than max_num, then update max_num
            max_num = num;
        }
    }
    return max_num
}

// Path: test.js
