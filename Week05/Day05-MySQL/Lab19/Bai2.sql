-- yc1: Lấy ra tất cả các sản phẩm với mã, tên, xuất xứ ở Trung Quốc
SELECT id, name, origin
FROM product
WHERE origin = 'Trung Quoc';

-- yc2: Lấy ra tất cả các sản phẩm với mã, tên, đơn vị là cây (cay) hoặc quyển (quyen)
SELECT id, name, unit
FROM product
WHERE unit IN ('cay', 'quyen');

-- yc3: Lấy ra danh sách sản phẩm với mã, tên với tên bắt đầu bằng chữ ‘B’ và kết thúc với ‘01’
SELECT id, name
FROM product
WHERE name LIKE 'B%' AND id LIKE '%01';

-- yc4: Lấy ra danh sách sản phẩm với mã, tên , sản xuất tại Trung Quốc và có giá khoảng từ 30000->40000
SELECT id, name, origin, price
FROM product
WHERE origin = 'Trung Quoc' AND price BETWEEN 30000 AND 40000;

-- yc5: Lấy ra danh sách sản phẩm với mã, tên, sản xuất tại Trung Quốc hoặc Thái Lan và có giá khoảng từ 30000->40000
SELECT id, name, origin, price
FROM product
WHERE origin IN ('Trung Quoc', 'Thai Lan') AND price BETWEEN 30000 AND 40000;


-- yc6: Lấy ra danh sách hóa đơn với mã, tổng hóa đơn từ ngày ‘1/1/2007’ đến ngày ‘2/1/2007’
SELECT id, invoice_total, invoice_date
FROM invoice
WHERE invoice_date BETWEEN '2007-01-01' AND '2007-01-02';

-- yc7: Lấy ra danh sách hóa đơn với mã, tổng hóa đơn trong ngày ‘1/1/2007’ sắp xếp tăng dần theo ngày và giảm dần theo tổng hóa đơn
SELECT id, invoice_date, invoice_total
FROM invoice
WHERE invoice_date = '2007-01-01'
ORDER BY invoice_date ASC, invoice_total DESC;

-- yc8: Lấy ra danh sách khách hàng với mã, tên những người đã mua hàng trong ngày ‘1/1/2007’
SELECT c.id, c.full_name, i.invoice_date
FROM customer c
JOIN invoice i ON c.id = i.customer_id
WHERE i.invoice_date = '2007-01-01';

-- yc9: Lấy ra danh sách hóa đơn với mã, tổng hóa đơn được tạo ra bởi nhân viên có tên ‘Nguyen Van B’ trong ngày ‘28/01/2006’
SELECT i.id, i.invoice_total
FROM invoice i
JOIN employee e ON i.employee_id = e.id
WHERE e.full_name = 'Nguyen Van B' AND i.invoice_date = '2006-01-28';

-- yc10: Lấy ra danh sách các mã hóa đơn đã thanh toán cho các sản phẩm có mã là ‘BB01’ hoặc ‘BB02’
SELECT invoice_id, product_id
FROM invoice_detail
WHERE product_id IN ('BB01', 'BB02');

-- yc11: Lấy ra danh sách các mã hóa đơn đã thanh toán cho các sản phẩm có mã là ‘BB01’ hoặc ‘BB02’
-- và mỗi sản phẩm có tổng số từ 10 đến 20
SELECT invoice_id, product_id, SUM(amount) AS total_amount
FROM invoice_detail
WHERE product_id IN ('BB01', 'BB02')
GROUP BY invoice_id, product_id
HAVING total_amount BETWEEN 10 AND 20;


-- yc12: Lấy ra hóa đơn có tổng lớn nhất và hóa đơn có tổng nhỏ nhất
(SELECT id, invoice_total
 FROM invoice
 ORDER BY invoice_total DESC
 LIMIT 1)
UNION
(SELECT id, invoice_total
 FROM invoice
 ORDER BY invoice_total ASC
 LIMIT 1);

-- yc13: Tính trung bình tất cả tổng các hóa đơn trong năm 2006
SELECT AVG(invoice_total) AS avg_total
FROM invoice
WHERE YEAR(invoice_date) = 2006;

-- yc14: Tính tổng lợi nhuận kiếm được năm 2006
-- Lợi nhuận = giá sản phẩm * số lượng (trên từng dòng hóa đơn)
SELECT SUM(p.price * idt.amount) AS total_profit
FROM invoice i
JOIN invoice_detail idt ON i.id = idt.invoice_id
JOIN product p ON idt.product_id = p.id
WHERE YEAR(i.invoice_date) = 2006;

-- yc15: Lấy ra 3 mã, tên những khách hàng có số lượng mua hàng lớn nhất
SELECT c.id, c.full_name, SUM(idt.amount) AS total_quantity
FROM customer c
JOIN invoice i ON c.id = i.customer_id
JOIN invoice_detail idt ON i.id = idt.invoice_id
GROUP BY c.id, c.full_name
ORDER BY total_quantity DESC
LIMIT 3;

-- yc16: Tính số lượng sản phẩm có xuất xứ ở Trung Quốc
SELECT origin,COUNT(*) AS total_china_products
FROM product
WHERE origin = 'Trung Quoc';

-- yc17: Tính số lượng sản phẩm có xuất xứ ở Trung Quốc hoặc Thái Lan
SELECT COUNT(*) AS total_cn_th_products
FROM product
WHERE origin IN ('Trung Quoc', 'Thai Lan');

-- yc18: Tính số lượng sản phẩm mỗi quốc gia có trong cơ sở dữ liệu
SELECT origin, COUNT(*) AS total_products
FROM product
GROUP BY origin;

-- yc19: Với mỗi quốc gia, tìm giá lớn nhất, nhỏ nhất và trung bình của tất cả các sản phẩm
SELECT origin,
       MAX(price) AS max_price,
       MIN(price) AS min_price,
       AVG(price) AS avg_price
FROM product
GROUP BY origin;

-- yc20: Tính lợi nhuận mỗi ngày
-- Lợi nhuận = giá * số lượng trong từng chi tiết hóa đơn
SELECT i.invoice_date,
       SUM(p.price * idt.amount) AS daily_profit
FROM invoice i
JOIN invoice_detail idt ON i.id = idt.invoice_id
JOIN product p ON idt.product_id = p.id
GROUP BY i.invoice_date
ORDER BY i.invoice_date;
