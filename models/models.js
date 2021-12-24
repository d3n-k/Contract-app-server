const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true,},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

const Contract_free = sequelize.define('contract_free', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    serial_number: {type: DataTypes.INTEGER},
    direction_number: {type: DataTypes.INTEGER, unique: true},
    full_name: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull:false},
})

const Contract_pay = sequelize.define('contract_pay', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    serial_number: {type: DataTypes.INTEGER},
    direction_number: {type: DataTypes.INTEGER, unique: true},
    full_name: {type: DataTypes.STRING, allowNull:false},
    address: {type: DataTypes.STRING, allowNull:false},
})

const Contract_for_organ = sequelize.define('contract_for_organ', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    serial_number: {type: DataTypes.INTEGER},
    direction_number: {type: DataTypes.INTEGER, unique: true},
    full_name: {type: DataTypes.STRING, allowNull:false},
    address: {type: DataTypes.STRING, allowNull:false},
})

const Admin = sequelize.define('admin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique:true},
    secret: {type: DataTypes.STRING, unique:true},
})

const Course = sequelize.define('course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.INTEGER, unique:true},
    name: {type: DataTypes.STRING(500), unique:true},
    price: {type: DataTypes.STRING},
    date: {type: DataTypes.STRING},
})

const Cathedra = sequelize.define('cathedra', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull:false},
    zav_name: {type: DataTypes.STRING, unique:true, allowNull:false},
    address: {type: DataTypes.STRING},
    telephone: {type: DataTypes.STRING, unique: true},
})

const Customer = sequelize.define('customer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const Announ = sequelize.define('announ', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(2000)},
})

const File = sequelize.define('file', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    file: {type: DataTypes.STRING},
})

const File2 = sequelize.define('file2', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    file: {type: DataTypes.STRING},
})

const File3 = sequelize.define('file3', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    file: {type: DataTypes.STRING},
})



User.hasOne(Contract_free);
Contract_free.belongsTo(User);

User.hasOne(Contract_pay);
Contract_pay.belongsTo(User);

User.hasOne(Contract_for_organ);
Contract_for_organ.belongsTo(User);

User.hasOne(Admin);
Admin.belongsTo(User);

Admin.hasMany(Course);
Course.belongsTo(Admin);

Admin.hasMany(Customer);
Customer.belongsTo(Admin);

Admin.hasMany(Cathedra);
Cathedra.belongsTo(Admin);

Admin.hasOne(Announ);
Announ.belongsTo(Admin);

Admin.hasMany(File);
File.belongsTo(Admin);

Admin.hasMany(File2);
File2.belongsTo(Admin);

Admin.hasMany(File3);
File3.belongsTo(Admin);

module.exports = {
    User,
    Admin,
    Course,
    Cathedra,
    Customer,
    Contract_free,
    Contract_pay,
    Contract_for_organ,
    Announ,
    File,
    File2,
    File3
}



