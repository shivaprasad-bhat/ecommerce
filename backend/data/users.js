import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@ecom.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Shivaprasad',
        email: 'shivaprasad@ecom.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Modi',
        email: 'modi@ecom.com',
        password: bcrypt.hashSync('123456', 10),
    },
];

export default users;
