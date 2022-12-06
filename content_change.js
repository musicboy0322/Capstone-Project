const period_change = array => {
    if(array[6] == '1') {
        array[6] == '早上';
        return array;
    } else if (array[6] == '2') {
        array[6] == '下午';
        return array;
    } else {
        array[6] == '晚上';
        return array;
    }
};

const operation_type_change = array => {
    if(array[8] == '1') {
        array[8] == '緊急手術';
    } else if (array[8] == '2') {
        array[8] == '預約手術';
    } else if (array[8] == '3') {
        array[8] == '當日手術';
    } else {
        array[8] == '危急手術';
    }
};

const return_or_not_change = array => {
    if(array[9] == 'N') {
        array[9] == '否';
    } else {
        array[9] == '是';
    }
};

const ana_kind_change = array => {
    if(array[10] == '0') {
        array[10] == 'LA';
    } else if (array[10] == '1') {
        array[10] == 'GA';
    } else if (array[10] == '2') {
        array[10] == 'GA+EA';
    } else if (array[10] == '3'){
        array[10] == 'IVG';
    } else if (array[10] == '4') {
        array[10] == 'SA';
    } else if (array[10] == '5') {
        array[10] == 'EA';
    } else if (array[10] == '6'){
        array[10] == 'Reg.Block';
    } else {
        array[10] == 'DLGA+EA+ICU'
    }
};

module.exports = {period_change, operation_type_change, return_or_not_change, ana_kind_change};

