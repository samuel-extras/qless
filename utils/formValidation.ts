export const formValidation = (type: string, value: string): boolean => {
    if (value?.trim() === "") return false;
    switch (type) {
        case "email":
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
                return true;
            else return false;
            break;
        default:
            return true;
            break;
    }
};

type ObjectValues<T> = T[keyof T];

export function checkError(obj: any) {
    const transformedObj: any = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            transformedObj[key] = !obj[key];
        }
    }

    return transformedObj;
}

export const isError = (obj: any) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === true) {
            return true;
        }
    }
    return false;
};

export const getFormData = (e: any) => {
    const formData = {};

    Array.from(e.currentTarget.elements).map((item: any) => {
        if (!item.name) return null;

        (formData as any)[item.name] = item.value;
    });
    return formData;
};
