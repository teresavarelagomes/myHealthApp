export const getMedicationRequest =  (medication, frequency, dropdownSelectionIndex, timeList) => {
    let numbers = "";

    dropdownSelectionIndex.forEach(element => {
        if (numbers === "") {
            numbers = (element.row + 1);
        } else {
            numbers += ';' + (element.row + 1);
        }
    });

    const timeTakes = ([...new Set(timeList.map(item => item.time))]);

    const newMedicationRequest = {
        commercialName: medication.commercialName,
        activePrinciple: medication.activePrincipleDescription,
        codificationType: "INFARMED",
        codificationIdentifier: medication.productGuid,
        numberOfTakes: timeTakes?.length,
        timeTakes
    };

    if (frequency === 0) {
        newMedicationRequest.frequency = 'DAILY';
    } else if (frequency === 1) {
        newMedicationRequest.frequency = 'WEEKLY';
        newMedicationRequest.daysOfWeek = numbers;
    } else {
        newMedicationRequest.frequency = 'MONTHLY';
        newMedicationRequest.daysOfMonth = numbers;
    }
    return newMedicationRequest;
};

export const getFrequency = (inputString) => {
    if (inputString === 'DAILY') {
        return 'Daily';
    } else if (inputString === 'MONTHLY') {
        return 'Monthly';
    } else {
        return 'Weekly';
    }
};

export const generateMedicationTakePayload = (note) => {
    return {
        take: new Date(),
        note
    };
};

export const generateMedicationFilterString = (searchTerm) => {
    const filter = `commercialName~ '*${searchTerm}*' OR activePrincipleDescription~ '*${searchTerm}*'`;

    const encodedFilter = encodeURIComponent(filter);

    return encodedFilter;
};
