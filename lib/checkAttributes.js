function checkAttr(obj, attr_array, sameFlag){
    const targ_attr_set = new Set(attr_array);
    const obj_attr_set = new Set();
    for(let key in obj){
        obj_attr_set.add(key);
    }
    const same_attr_set = new Set([...targ_attr_set].filter(x=>obj_attr_set.has(x)));

    // 交集参数数目不等于传递的参数数目，一定传递了错误参数
    if(same_attr_set.size !== obj_attr_set.size){
        return false;
    }
    if(sameFlag && obj_attr_set.size !== targ_attr_set.size){
        return false;
    }
    return true;
}

export default checkAttr;