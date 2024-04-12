import moment from "moment";

export const getWeightObjectArrayDataAndSetState = (weightRequestArray, imcRequestArray, newArray, setStateFunction) => {
    
    for (let i = 0; i < weightRequestArray.length; i++) {

        const isWeightValid = weightRequestArray[i] !== undefined && weightRequestArray[i].value !== undefined;
        const isImcValid = imcRequestArray[i] !== undefined && imcRequestArray[i].value !== undefined;

        newArray.push({
            "date": moment(weightRequestArray[i].createdAt).format("DD/MM").toString(),
            "time": moment(weightRequestArray[i].createdAt).format('HH:mm').toString(),
            "weightValue": isWeightValid ? weightRequestArray[i].value.toString() : '',
            "imcValue": isImcValid ? imcRequestArray[i].value.toString() : '',
        });
    }

    setStateFunction(newArray);
};


export const getBloodPressureObjectArrayDataAndSetState = (systolicRequestArray, diastolicRequestArray, heartRateRequestArray, newArray, setStateFunction) => {
    
    for (let i = 0; i < systolicRequestArray.length; i++) {

        const isSystolicValid = systolicRequestArray[i] !== undefined;
        const isDiastolicValid = diastolicRequestArray[i] !== undefined;
        const isHeartRateValid = heartRateRequestArray[i] !== undefined;

        newArray.push({
            "date": moment(systolicRequestArray[i].createdAt).format("DD/MM").toString(),
            "time": moment(systolicRequestArray[i].createdAt).format('HH:mm').toString(),
            "systolicValue": isSystolicValid ? systolicRequestArray[i].value.toString() : '',
            "diastolicValue": isDiastolicValid ? diastolicRequestArray[i].value.toString() : '',
            "heartRateValue": isHeartRateValid ? heartRateRequestArray[i].value.toString() : '',
        });
    }

    setStateFunction(newArray);
};

export const getWeightArraysDataAndSetState = (weightRequestArray, imcRequestArray, newArray, setStateFunction) => {
    
    for (let i = 0; i < weightRequestArray.length; i++) {

        const isWeightValid = weightRequestArray[i] !== undefined;
        const isImcValid = imcRequestArray[i] !== undefined;

        const internalArray = [];
        internalArray.push(moment(weightRequestArray[i].createdAt).format("DD/MM/YYYY").toString());
        internalArray.push(moment(weightRequestArray[i].createdAt).format('HH:mm').toString());
        internalArray.push(isWeightValid ? weightRequestArray[i].value.toString() : '');
        internalArray.push(isImcValid ? imcRequestArray[i].value.toString() : '');
    
        newArray.push(internalArray);
    }
    
    setStateFunction(newArray);
};


export const getBloodPressureArraysDataAndSetState = (systolicRequestArray, diastolicRequestArray, heartRateRequestArray, newArray, setStateFunction) => {

    for (let i = 0; i < systolicRequestArray.length; i++) {

        const isSystolicValid = systolicRequestArray[i] !== undefined;
        const isDiastolicValid = diastolicRequestArray[i] !== undefined;
        const isHeartRateValid = heartRateRequestArray[i] !== undefined;
        const bloodPressure = `${isSystolicValid ? systolicRequestArray[i].value.toString() : ''}/${isDiastolicValid ? diastolicRequestArray[i].value.toString() : ''}`;

        const internalArray = [];

        internalArray.push(moment(systolicRequestArray[i].createdAt).format("DD/MM/YYYY").toString());
        internalArray.push(moment(systolicRequestArray[i].createdAt).format('HH:mm').toString());
        internalArray.push(bloodPressure);
        internalArray.push(isHeartRateValid ? heartRateRequestArray[i].value.toString() : '');
    
        newArray.push(internalArray);
    }

    setStateFunction(newArray);
};

const { v4: uuidv4 } = require('uuid');

// metricType is enum [ HEIGHT, WEIGHT, IMC, DIASTOLIC_BLOOD_PRESSURE, SYSTOLIC_BLOOD_PRESSURE, HEART_RATE]
export const generateBiometricPayload = (value, metricType) => {
     // Generate a random string for correlation ID
     const correlationId = uuidv4();
  
     // Get the current date and time
     const currentDate = new Date();
   
     // Format the current date and time
     const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}T${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}.${String(currentDate.getMilliseconds()).padStart(3, '0')}Z`;
 
     return {
       metricType,
       value,
       "humanEntry": true,
       "multiple": true,
       "createdAt": formattedDate,
       correlationId
     };
}

export const calculateImc = (height, weight) => {
    return height && weight ? Math.round(weight / ((height / 100) * (height / 100))) : "";
};

// metricType is enum [ IMC, BLOOD_PRESSURE, HEART_RATE]
export const getRegistryEllipse = ( value, metricType ) => {
    const status = getBiometricStatus(value, metricType);

    if ( status === 'bad' ) {
      return require("../assets/ellipse_red.png");
    } else if ( status === 'medium' ) {
      return require("../assets/ellipse_yellow.png");
    } else {
      return require("../assets/ellipse-green.png");
    }
  };

// metricType is enum [ IMC, BLOOD_PRESSURE, HEART_RATE]
const getBiometricStatus = ( value, metricType ) => {
    switch (metricType) {
        case 'IMC':
            return getImcStatus(value);
        case 'BLOOD_PRESSURE':
            return getBloodPressureStatus(value);
        case 'HEART_RATE':
            return getHeartRateStatus(value);
        default: 
            return "default";
    }
};

const getImcStatus = ( value ) => {
    if (value < 17 || value >= 30) {
        return "bad";
    } else if (value >= 18.5 && value < 25) {
        return "good";
    } else {
        return "medium";
    } 
};

const getHeartRateStatus = ( value ) => {
    if (value < 50 || value > 100) {
        return "bad";
    } else if (value >= 60 && value <= 90) {
        return "good";
    } else {
        return "medium";
    } 
};

const getBloodPressureStatus = ( value ) => {
    let systolicStatus = "medium";
    let diastolicStatus = "medium";

    const [systolic, diastolic] = value.split('/').map(Number);

    if (systolic >= 180 || systolic < 90) {
        systolicStatus = "bad";
    } else if (systolic >= 130 && systolic < 140) {
        systolicStatus = "good";
    }

    if (diastolic > 110 || diastolic < 60) {
        diastolicStatus = "bad";
    } else if (diastolic >= 70 && diastolic < 80) {
        diastolicStatus = "good";
    }

    if (systolicStatus === "bad" || diastolicStatus === "bad") {
        return "bad";
    } else if (systolicStatus === "medium" || diastolicStatus === "medium") {
        return "medium";
    } else {
        return "good";
    }
};

export const getBiometricUrl = (userId, metricType, page, size) => {
    const filter = `filter=metricType%20%3A%20%27${encodeURIComponent(metricType)}`;
    return `user/${userId}/bioMetric?${filter}%27&page=${page}&size=${size}&sort=asc`;
};