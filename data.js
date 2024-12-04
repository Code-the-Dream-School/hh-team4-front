const storeInfo = [
    {
        name: 'DrugStore1',
        id: '1234567',
        address: '1234 Walgreens Drive, Durham, NC 27519',
        storeRoles: ['Admin', 'Inventory Manager', 'Clerk'],
    },
    {
        name: 'DrugStore2',
        id: '123456788',
        address: '122 Harris Drive, Durham, NC 27519',
        storeRoles: ['Admin', 'Inventory Manager', 'Clerk'],
    },
];

const userInfo = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        role: 'Admin',
        id: 'admin1234567',
        storeID: '1234567',
        password: 'jd1234567',
    },
    {
        firstName: 'Mary',
        lastName: 'Sue',
        email: 'marysue@gmail.com',
        role: 'Inventory Manager',
        id: 'inventorymanager1234567',
        storeID: '1234567',
        password: 'ms1234567',
    },
    {
        firstName: 'Mark',
        lastName: 'Mayhem',
        email: 'markmayhem@gmail.com',
        role: 'Clerk',
        id: 'clerk1234567',
        storeID: '1234567',
        password: 'mm1234567',
    },
    {
        firstName: 'Miles',
        lastName: 'Dhean',
        email: 'milesDhean@gmail.com',
        role: 'Clerk',
        id: 'clerk123456789',
        storeID: '1234567',
        password: 'md1234567',
    },
];

//CLASS IS THERAPEUTIC CLASS
const drugData = [
    {
        name: 'Albuterol',
        generic: 'albuterol sulfate',
        class: 'Bronchodilators',
        quantity: '400',
        expiration: '03/25/2025',
        lot: '1',
        id: '112233',
        storeId: '1234567',
        employeeId: 'inventorymanager1234567',
        ndc: '3847762793088899',
        threshold: '500',
    },
    {
        name: 'salmeterol',
        generic: 'salmeterol',
        class: 'bronchodilators',
        quantity: '200',
        expiration: '04/11/2025',
        lot: '2',
        id: '334455',
        storeId: '1234567',
        employeeId: 'inventorymanager1234567',
        ndc: '12039493890',
        threshold: '400',
    },
    {
        name: 'Coumadin',
        generic: 'Warfarin',
        class: 'Anticoagulants',
        quantity: '100',
        expiration: '02/14/2025',
        lot: '3',
        id: '445566',
        storeId: '1234567',
        employeeId: 'inventorymanager1234567',
        ndc: '345456575322',
        threshold: '200',
    },
    {
        name: 'Tamiflu',
        generic: 'Oseltamivir',
        class: 'Antiviral',
        quantity: '0',
        expiration: '01/20/2025',
        lot: '4',
        id: '556677',
        storeId: '1234567',
        employeeId: 'inventorymanager1234567',
        ndc: '23789477088734',
        threshold: '20',
    },
    {
        name: 'Cymbalta',
        generic: 'duloxetine',
        class: 'Antidepressants',
        quantity: '06',
        expiration: '01/05/2025',
        lot: '5',
        id: '667788',
        storeId: '1234567',
        employeeId: 'inventorymanager1234567',
        ndc: '347373877658',
        threshold: '05',
    },
    {
        name: 'Prozac',
        generic: 'fluoxetine',
        class: 'Antidepressant',
        quantity: '10',
        expiration: '01/01/2025',
        lot: '6',
        id: '889900',
        storeId: '1234567',
        employeeId: 'inventorymanager1234567',
        ndc: '34737387765800',
        threshold: '05',
    },
];
const drugFormData = [
    {
        name: '',
        generic: '',
        class: [
            'Analgesics',
            'Antibiotics',
            'Antidepressants',
            'Antipsychotics',
            'Antihypertensives',
            'Anticoagulants',
            'Bronchodilators',
            'Diruretics',
            'Antivirals',
        ],
        quantity: '',
        expiration: '',
        lot: '',
        ndc: '',
    },
];

const drugClasses = [
    'Analgesics',
    'Antibiotics',
    'Antidepressants',
    'Antipsychotics',
    'Antihypertensives',
    'Anticoagulants',
    'Bronchodilators',
    'Diruretics',
    'Antivirals',
];

export { drugClasses, drugFormData, drugData, storeInfo, userInfo };
