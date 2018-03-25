// @flow

type FormControls = Array<{
    dataset: {
        required: 'true' | 'false'
    },
    name: string,
    value: string,
    type?: string,
    checked?: boolean
}>;

export default function validateOfficeData(formControls: FormControls):any {
    let isRequired: string,
        errors: string[] = [],
        office: {} = {},
        officeParam: string;

    for (let formControl of formControls) {
        if (formControl.name) {
            officeParam = formControl.value.trim();
            isRequired = formControl.dataset.required;

            if (isRequired === 'false' || isRequired === 'true' && officeParam) {
                office[formControl.name] = officeParam;
            } else {
                errors.push(formControl.name);
            }

            if (formControl.type === 'checkbox') {
                office[formControl.name] = formControl.checked;
            }
        }
    }

    return new Promise((resolve, reject) => {
        if (!errors.length) {
            resolve(office);
        } else {
            reject(errors);
        }
    });
}
