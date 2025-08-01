-- DROP DATABASE sales_management;
--YC1: Tạo mới một cơ sở dữ liệu với tên sales_management
CREATE DATABASE sales_management;

--YC2: Sửa cơ sở dữ liệu sales_management để thiết lập dùng tiếng
--     Việt (kiểu utf8mb4) cho cơ sở dữ liệu này.
ALTER DATABASE sales_management
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

--YC2 for testing
SELECT DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME
FROM INFORMATION_SCHEMA.SCHEMATA
WHERE SCHEMA_NAME = 'sales_management';

USE sales_management;
--YC3: Tạo bảng employee có các cột: id, full_name, mobile với
--     các kiểu dữ liệu phù hợp
CREATE TABLE employee (
    id VARCHAR(10) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    mobile VARCHAR(20)
);
--YC4: Tạo bảng customer có các cột: id, full_name, address,
--     mobile, sales với các kiểu dữ liệu phù hợp.
CREATE TABLE customer (
    id VARCHAR(10) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    mobile VARCHAR(20),
    sales DECIMAL(15, 2) DEFAULT 0
);

--YC5: Tạo bảng product có các cột: id, name, unit, origin, price
--     với các kiểu dữ liệu phù hợp.
CREATE TABLE product (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    unit VARCHAR(20),
    origin VARCHAR(100),
    price DECIMAL(15, 2)
);
--YC6: Tạo bảng invoice có các cột: id, invoice_date, customer_id,
--     employee_id, invoice_total với các kiểu dữ liệu phù hợp.
CREATE TABLE invoice (
    id INT PRIMARY KEY,
    invoice_date DATE NOT NULL,
    customer_id VARCHAR(10),
    employee_id VARCHAR(10),
    invoice_total DECIMAL(15, 2) DEFAULT 0,

    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (employee_id) REFERENCES employee(id)
);

--YC7: Tạo bảng invoice_detail có các cột: id, invoice_id, product_id,
--     amount với các kiểu dữ liệu phù hợp.
CREATE TABLE invoice_detail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT NOT NULL,
    product_id VARCHAR(10) NOT NULL,
    amount INT DEFAULT 1,

    FOREIGN KEY (invoice_id) REFERENCES invoice(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

--YC8: Thêm các dòng dữ liệu phù hợp vào tất cả các bảng đã tạo như sau:
INSERT INTO employee (id, full_name, mobile) VALUES
('NV01','Nguyen Nhu Nhut','927345678'),
('NV02','Le Thi Phi Yen','987567390'),
('NV03','Nguyen Van B','997047382'),
('NV04','Ngo Thanh Tuan','913758498'),
('NV05','Nguyen Thi Truc Thanh','918590387');

INSERT INTO customer (id, full_name, address, mobile, sales) VALUES
('KH01','Nguyen Van A','731 Tran Hung Dao, Q5, TpHCM','8823451',13060000),
('KH02','Tran Ngoc Han','23/5 Nguyen Trai, Q5, TpHCM','908256478',280000),
('KH03','Tran Ngoc Linh','45 Nguyen Canh Chan, Q1, TpHCM','938776266',3860000),
('KH04','Tran Minh Long','50/34 Le Dai Hanh, Q10, TpHCM','917325476',250000),
('KH05','Le Nhat Minh','34 Truong Dinh, Q3, TpHCM','8246108',21000),
('KH06','Le Hoai Thuong','227 Nguyen Van Cu, Q5, TpHCM','8631738',915000),
('KH07','Nguyen Van Tam','32/3 Tran Binh Trong, Q5, TpHCM','916783565',12500),
('KH08','Phan Thi Thanh','45/2 An Duong Vuong, Q5, TpHCM','938435756',365000),
('KH09','Le Ha Vinh','873 Le Hong Phong, Q5, TpHCM','8654763',70000),
('KH10','Ha Duy Lap','34/34B Nguyen Trai, Q1, TpHCM','8768904',67500);

INSERT INTO product (id, name, unit, origin, price) VALUES
('BC01','But chi','cay','Singapore',3000),
('BC02','But chi','cay','Singapore',5000),
('BC03','But chi','cay','Viet Nam',3500),
('BC04','But chi','hop','Viet Nam',30000),
('BB01','But bi','cay','Viet Nam',5000),
('BB02','But bi','cay','Trung Quoc',7000),
('BB03','But bi','hop','Thai Lan',100000),
('TV01','Tap 100 giay mong','quyen','Trung Quoc',2500),
('TV02','Tap 200 giay mong','quyen','Trung Quoc',4500),
('TV03','Tap 100 giay tot','quyen','Viet Nam',3000),
('TV04','Tap 200 giay tot','quyen','Viet Nam',5500),
('TV05','Tap 100 trang','chuc','Viet Nam',23000),
('TV06','Tap 200 trang','chuc','Viet Nam',53000),
('TV07','Tap 100 trang','chuc','Trung Quoc',34000),
('ST01','So tay 500 trang','quyen','Trung Quoc',40000),
('ST02','So tay loai 1','quyen','Viet Nam',55000),
('ST03','So tay loai 2','quyen','Viet Nam',51000),
('ST04','So tay','quyen','Thai Lan',55000),
('ST05','So tay mong','quyen','Thai Lan',20000),
('ST06','Phan viet bang','hop','Viet Nam',5000),
('ST07','Phan khong bui','hop','Viet Nam',7000),
('ST08','Bong bang','cai','Viet Nam',1000),
('ST09','But long','cay','Viet Nam',5000),
('ST10','But long','cay','Trung Quoc',7000);

INSERT INTO invoice (id, invoice_date, customer_id, employee_id, invoice_total) VALUES
(1001,'2006-03-27','KH01','NV01',320000),
(1002,'2006-08-12','KH01','NV02',840000),
(1003,'2006-08-23','KH02','NV01',100000),
(1004,'2006-01-09','KH02','NV01',180000),
(1005,'2006-10-20','KH01','NV02',3800000),
(1006,'2006-10-16','KH01','NV03',2430000),
(1007,'2006-10-28','KH03','NV03',510000),
(1008,'2006-10-28','KH01','NV03',440000),
(1009,'2006-10-28','KH03','NV04',200000),
(1010,'2006-11-01','KH01','NV01',5200000),
(1011,'2006-11-04','KH04','NV03',250000),
(1012,'2006-11-30','KH05','NV03',21000),
(1013,'2006-12-12','KH06','NV01',5000),
(1014,'2006-12-13','KH03','NV02',3150000),
(1015,'2007-01-01','KH06','NV01',910000),
(1016,'2007-01-01','KH07','NV02',12500),
(1017,'2007-01-02','KH08','NV03',35000),
(1018,'2007-01-13','KH08','NV03',330000),
(1019,'2007-01-13','KH01','NV03',30000),
(1020,'2007-01-14','KH09','NV04',70000),
(1021,'2007-01-16','KH10','NV03',67500),
(1022,'2007-01-16',NULL,'NV03',7000),
(1023,'2007-01-17',NULL,'NV01',330000);

INSERT INTO invoice_detail (invoice_id, product_id, amount) VALUES
(1001,'TV02',10), (1001,'ST01',5), (1001,'BC01',5), (1001,'BC02',10),
(1001,'ST08',10), (1002,'BC04',20), (1002,'BB01',20), (1002,'BB02',20),
(1003,'BB03',10), (1004,'TV01',20), (1004,'TV02',10), (1004,'TV03',10),
(1004,'TV04',10), (1005,'TV05',50), (1005,'TV06',50), (1006,'TV07',20),
(1006,'ST01',30), (1006,'ST02',10), (1007,'ST03',10), (1008,'ST04',8),
(1009,'ST05',10), (1010,'TV07',50), (1010,'ST07',50), (1010,'ST08',100),
(1010,'ST04',50), (1010,'TV03',100), (1011,'ST06',50), (1012,'ST07',3),
(1013,'ST08',5), (1014,'BC02',80), (1014,'BB02',100), (1014,'BC04',60),
(1014,'BB01',50), (1015,'BB02',30), (1015,'BB03',7), (1016,'TV01',5),
(1017,'TV02',1), (1017,'TV03',1), (1017,'TV04',5), (1018,'ST04',6),
(1019,'ST05',1), (1019,'ST06',2), (1020,'ST07',10), (1021,'ST08',5),
(1021,'TV01',7), (1021,'TV02',10), (1022,'ST07',1), (1023,'ST04',6);

--yc9: Tạo các ràng buộc khóa ngoại cần thiết cho 2 bảng invoice và invoice_detail.

ALTER TABLE invoice
ADD CONSTRAINT fk_invoice_customer
FOREIGN KEY (customer_id) REFERENCES customer(id);

ALTER TABLE invoice
ADD CONSTRAINT fk_invoice_employee
FOREIGN KEY (employee_id) REFERENCES employee(id);

ALTER TABLE invoice_detail
ADD CONSTRAINT fk_invoice_detail_invoice
FOREIGN KEY (invoice_id) REFERENCES invoice(id);

ALTER TABLE invoice_detail
ADD CONSTRAINT fk_invoice_detail_product
FOREIGN KEY (product_id) REFERENCES product(id);
