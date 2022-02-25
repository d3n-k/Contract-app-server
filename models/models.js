const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true,},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

const Admin = sequelize.define('admin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique:true},
    secret: {type: DataTypes.STRING, unique:true},
})

const Course = sequelize.define('course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.INTEGER, unique:true},
    name: {type: DataTypes.STRING(500)},
    price: {type: DataTypes.STRING},
    date: {type: DataTypes.STRING},
})

const Cathedra = sequelize.define('cathedra', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull:false},
    zav_name: {type: DataTypes.STRING, unique:true},
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

const Year = sequelize.define('year', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
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

const DocFile1 = sequelize.define('docFile1', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    file: {type: DataTypes.STRING},
})

const DocFile2 = sequelize.define('docFile2', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    file: {type: DataTypes.STRING},
})

const DocFile3 = sequelize.define('docFile3', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    file: {type: DataTypes.STRING},
})

const DocFile4 = sequelize.define('docFile4', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    file: {type: DataTypes.STRING},
})

const DocFile5 = sequelize.define('docFile5', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    file: {type: DataTypes.STRING},
})

const Contract = sequelize.define('contract', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fullname: {type: DataTypes.STRING, unique:true},
})

const Journal = sequelize.define('journal', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    organ: {type: DataTypes.STRING, allowNull: false},
    colvo: {type: DataTypes.INTEGER, allowNull: false},
    numbers: {type: DataTypes.STRING, allowNull: false},
})



User.hasOne(Admin);
Admin.belongsTo(User);

Admin.hasMany(Course);
Course.belongsTo(Admin);

Course.hasMany(Contract);
Contract.belongsTo(Course);

Course.hasMany(Journal);
Journal.belongsTo(Course);

Admin.hasMany(Customer);
Customer.belongsTo(Admin);

Admin.hasMany(Cathedra);
Cathedra.belongsTo(Admin);

Admin.hasOne(Announ);
Announ.belongsTo(Admin);

Admin.hasOne(Year);
Year.belongsTo(Admin);

Admin.hasMany(File);
File.belongsTo(Admin);

Admin.hasMany(File2);
File2.belongsTo(Admin);

Admin.hasMany(File3);
File3.belongsTo(Admin);

Admin.hasMany(DocFile1);
DocFile1.belongsTo(Admin);

Admin.hasMany(DocFile2);
DocFile2.belongsTo(Admin);

Admin.hasMany(DocFile3);
DocFile3.belongsTo(Admin);

Admin.hasMany(DocFile4);
DocFile4.belongsTo(Admin);

Admin.hasMany(DocFile5);
DocFile5.belongsTo(Admin);

module.exports = {
    User,
    Admin,
    Course,
    Cathedra,
    Customer,
    Announ,
    File,
    File2,
    File3,
    Year,
    Contract,
    Journal,
    DocFile1,
    DocFile2,
    DocFile3,
    DocFile4,
    DocFile5
}



