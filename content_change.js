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

module.exports = splitData;