-- dropping all tables if they exist
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `employees`;
DROP TABLE IF EXISTS `customers`;
DROP TABLE IF EXISTS `menu_items`;

-- creating table for menu items
CREATE TABLE `menu_items` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`item_name` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`price` decimal(6,2) NOT NULL,
	`quantity` int(11) NOT NULL,
	PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- creating table for customers
CREATE TABLE `customers`(
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`fname` varchar(255) NOT NULL,
	`lname` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`state` varchar(2) NOT NULL,
	`zipcode` int(5) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- creating table for employees
CREATE TABLE `employees` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`fName` varchar(255),
	`lName` varchar(255),
	PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- creating table for orders
CREATE TABLE `orders` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`customer_id` int(11) NOT NULL,
	`employee_id` int(11) DEFAULT NULL,
	`is_delivery` BOOLEAN NOT NULL,
	`order_date` TIMESTAMP NOT NULL,
	`delivery_date` TIMESTAMP,
	PRIMARY KEY (`id`),
	CONSTRAINT `orders_cidfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
	CONSTRAINT `orders_eidfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- creating table between orders and items in an order
CREATE TABLE `order_items`(
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`order_id` int(11) NOT NULL,
	`item_id` int(11) NOT NULL,
	`quantity` int(11) NOT NULL,
	`price` decimal(7, 2),
	PRIMARY KEY (`id`),
	CONSTRAINT `oi_oidfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
	CONSTRAINT `oi_iidfk_1` FOREIGN KEY (`item_id`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- adding in data for menu_items
INSERT INTO `menu_items` VALUES(1, 'Steak', 'Food', 24.99, 100);
INSERT INTO `menu_items` VALUES(2, 'Bud Light', 'Alcohol' , 5, 100);
INSERT INTO `menu_items`(`item_name`, `type`, `price`, `quantity`) VALUES ('Chicken Quesadilla', 'Food', 15.99, 100);
INSERT INTO `menu_items`(`item_name`, `type`, `price`, `quantity`) VALUES ('Strawberry Smoothie', 'Beverage', 4.99, 100);


-- adding in data for customers
INSERT INTO `customers` (`fname`, `lname`, `address`, `city`, `state`, `zipcode`) VALUES('John', 'Doe', '1234 Blue Street', 'Southfield', 'MI', 48076);
INSERT INTO `customers` (`fname`, `lname`, `address`, `city`, `state`, `zipcode`) VALUES('Steve', 'Smith', '1234 Elm Ave', 'Houston', 'TX', 95612);
INSERT INTO `customers` (`fname`, `lname`, `address`, `city`, `state`, `zipcode`) VALUES('Jane', 'Doe', '3123 Red Street', 'Phoenix', 'AR', 85000);
INSERT INTO `customers` (`fname`, `lname`, `address`, `city`, `state`, `zipcode`) VALUES('James', 'Johnson', '5555 Albert Street', 'Detroit', 'MI', 48076);
INSERT INTO `customers` (`fname`, `lname`, `address`, `city`, `state`, `zipcode`) VALUES('Thomas', 'Thompson', '1234 Green Street', 'St. Louis', 'MO', 63123);

-- adding in data for employees
INSERT INTO `employees` (`fName`, `lName`) VALUES ('Mike', 'Smith');
INSERT INTO `employees` (`fName`, `lName`) VALUES ('Sarah', 'Quinn');
INSERT INTO `employees` (`fName`, `lName`) VALUES ('Peter', 'Warren');
INSERT INTO `employees` (`fName`, `lName`) VALUES ('Diana', 'Rogers');
INSERT INTO `employees` (`fName`, `lName`) VALUES ('Rob', 'Hogans');

-- adding in data for orders
INSERT INTO `orders` (`customer_id`, `employee_id`, `is_delivery`, `order_date`, `delivery_date`)
VALUES (1, 1, 1, '2019-06-05 18:19:03', '2019-06-05 19:19:03');

INSERT INTO `orders` (`customer_id`, `employee_id`, `is_delivery`, `order_date`, `delivery_date`)
VALUES (2, NULL, 0, '2019-06-06 18:19:03', '2019-06-06 19:19:03');


-- adding in order items
INSERT INTO `order_items` VALUES (1, 1, 3, 2, 31.98);
INSERT INTO `order_items` VALUES (2, 1, 4, 3, 14.97);

INSERT INTO `order_items` VALUES (3, 2, 2, 10, 50.00);
INSERT INTO `order_items` VALUES (4, 2, 1, 2, 49.98);
INSERT INTO `order_items` VALUES (5, 2, 3, 1, 15.99);

