const { json } = require("body-parser");

const or_apn_change = array => {
    for(let j = 0; j < array.length; j++) {
        if(array[j] == '1') {
            array[j] = '早上';
        } else if (array[j] == '2') {
            array[j] = '下午';
        } else {
            array[j] = '晚上';
        }
    }
    return array;
};

const or_type_2_change = array => {
    for(let j = 0; j < array.length; j++) {
        if(array[j] == '1') {
            array[j] = '緊急手術';
        } else if (array[j] == '2') {
            array[j] = '預約手術';
        } else if (array[j] == '3') {
            array[j] = '當日手術';
        } else {
            array[j] = '危急手術';
        }
    }
    return array;
};

const return_flag_change = array => {
    for(let j = 0; j < array.length; j++) {
        if(array[j] == 'N') {
            array[j] = '否';
        } else {
            array[j] = '是';
        }
    }
    return array;
};

const an_class_2_change = array => {
    for(let j = 0; j < array.length; j++) {
        if(array[j] == '0') {
            array[j] = 'LA';
        } else if (array[j] == '1') {
            array[j] = 'GA';
        } else if (array[j] == '2') {
            array[j] = 'GA+EA';
        } else if (array[j] == '3'){
            array[j] = 'IVG';
        } else if (array[j] == '4') {
            array[j] = 'SA';
        } else if (array[j] == '5') {
            array[j] = 'EA';
        } else if (array[j] == '6'){
            array[j] = 'Reg.Block';
        } else {
            array[j] = 'DLGA+EA+ICU'
        }
    }
    return array
};

const time_change = array => {
    for(let j = 0; j < array.length; j++) {
        if(array[j].length == 3) {
            array[j] = '0' + array[j];
            split = array[j].split('');
            array[j] = split[0] + split[1] + ':' + split[2] + split[3];
        } else if(array[j].length == 2) {
            array[j] = '00' + array[j];
            split = array[j].split('');
            array[j] = split[0] + split[1] + ':' + split[2] + split[3];
        } else if(array[j].length == 1) {
            array[j] = '000' + array[j];
            split = array[j].split('');
            array[j] = split[0] + split[1] + ':' + split[2] + split[3];
        }
        else {
            split = array[j].split('');
            array[j] = split[0] + split[1] + ':' + split[2] + split[3];
        }
    }
    return array;
}

const date_change = array => {
    for(let j = 0; j < array.length; j++) {
        split = array[j].split('');
        array[j] = split[0] + split[1] + split[2] + '/' + split[3] + split[4] + '/' + split[5] + split[6];
    }
    return array;
}

module.exports = {or_apn_change, or_type_2_change, return_flag_change, an_class_2_change, time_change, date_change};

/*
const splitData = (operationData , totalOperation) => {
    bed = []
    operationRoom = []
    estimateTime = []
    anaYesNo = []
    operationName = []
    chart = []
    operationKind = []
    time = []
    operationAgain = []
    estimateStartTime = []
    fastingDate = []
    fastingTime = []
    anaKind = []
    diagnosisCode = []
    diagnosisName = []
    operationCode = []

    for(let b = 0; b < totalOperation; b++) {
        bed.push(operationData[b]['床號']);
    }

    for(let b = 0; b < totalOperation; b++) {
        operationRoom.push(operationData[b]['房號']);
    }

    for(let b = 0; b < totalOperation; b++) {
        estimateTime.push(operationData[b]['開刀預估時間']);
    }

    for(let b = 0; b < totalOperation; b++) {
        anaYesNo.push(operationData[b]['是否麻醉']);
    }

    for(let b = 0; b < totalOperation; b++) {
        operationName.push(operationData[b]['手術名稱']);
    }

    for(let b = 0; b < totalOperation; b++) {
        chart.push(operationData[b]['病歷號']);
    }

    for(let b = 0; b < totalOperation; b++) {
        operationKind.push(operationData[b]['手術別']);
    }

    for(let b = 0; b < totalOperation; b++) {
        time.push(operationData[b]['時段']);
    }

    for(let b = 0; b < totalOperation; b++) {
        operationAgain.push(operationData[b]['重返手術']);
    }

    for(let b = 0; b < totalOperation; b++) {
        estimateStartTime.push(operationData[b]['預估開始時間']);
    }

    for(let b = 0; b < totalOperation; b++) {
        fastingDate.push(operationData[b]['禁食日期']);
    }

    for(let b = 0; b < totalOperation; b++) {
        fastingTime.push(operationData[b]['禁食時間']);
    }

    for(let b = 0; b < totalOperation; b++) {
        anaKind.push(operationData[b]['麻醉類別']);
    }

    for(let b = 0; b < totalOperation; b++) {
        diagnosisCode.push(operationData[b]['術前診斷代碼']);
    }

    for(let b = 0; b < totalOperation; b++) {
        diagnosisName.push(operationData[b]['術前診斷']);
    }

    for(let b = 0; b < totalOperation; b++) {
        operationCode.push(operationData[b]['手術代碼']);
    }

    return {bed: bed, operationRoom: operationRoom, estimateTime: estimateTime, anaYesNo: anaYesNo, operationName: operationName, chart: chart,
            operationKind: operationKind, time: time, operationAgain: operationAgain, estimateStartTime: estimateStartTime,fastingDate: fastingDate,
            fastingTime: fastingTime, anaKind: anaKind, diagnosisCode: diagnosisCode, diagnosisName: diagnosisName, operationCode: operationCode
            }
}
*/
