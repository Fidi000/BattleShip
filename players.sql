-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2020 at 10:26 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `accountinfo`
--

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `gamesplayed` int(3) UNSIGNED NOT NULL,
  `timeplayed` int(10) UNSIGNED NOT NULL,
  `gameswon` int(3) UNSIGNED NOT NULL,
  `readytoplay` int(1) NOT NULL,
  `turn` int(1) DEFAULT NULL,
  `coords` blob DEFAULT NULL,
  `currentopponent` varchar(50) DEFAULT NULL,
  `gameisdone` int(1) DEFAULT NULL,
  `superpower` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`username`, `password`, `gamesplayed`, `timeplayed`, `gameswon`, `readytoplay`, `turn`, `coords`, `currentopponent`, `gameisdone`, `superpower`) VALUES
('a', 'a', 4, 767536, 4, 0, 0, NULL, NULL, 0, NULL),
('James', 'T9zLMTQR', 174, 1653192, 250, 0, NULL, NULL, NULL, NULL, NULL),
('John', 'NrnvxT6F', 196, 2880684, 234, 0, NULL, NULL, NULL, NULL, NULL),
('Robert', 'mUuAvQNm', 398, 1194966, 126, 0, NULL, NULL, NULL, NULL, NULL),
('Micheal', 'fXWEdJC7', 60, 2389580, 460, 0, NULL, NULL, NULL, NULL, NULL),
('William', 'pJjPYRxA', 432, 1519449, 214, 0, NULL, NULL, NULL, NULL, NULL),
('David', 'c6KAlRWE', 224, 301336, 86, 0, NULL, NULL, NULL, NULL, NULL),
('Richard', '75E1KNrb', 314, 1341149, 255, 0, NULL, NULL, NULL, NULL, NULL),
('Joseph', 'WffZdj8a', 227, 1907366, 111, 0, NULL, NULL, NULL, NULL, NULL),
('Thomas', '7fuXvO21', 457, 2151388, 440, 0, NULL, NULL, NULL, NULL, NULL),
('Charles', 'ybZfQd2e', 162, 3022125, 337, 0, NULL, NULL, NULL, NULL, NULL),
('Christopher', 'MgkbujOr', 409, 941163, 361, 0, NULL, NULL, NULL, NULL, NULL),
('Daniel', '2DZi1bea', 243, 2020608, 65, 0, NULL, NULL, NULL, NULL, NULL),
('Matthew', 'atIJj2K0', 237, 1351927, 386, 0, NULL, NULL, NULL, NULL, NULL),
('Donald', 'RhdKfeHb', 159, 1877804, 97, 0, NULL, NULL, NULL, NULL, NULL),
('Anthony', 'YB2wZXlw', 194, 3453847, 421, 0, NULL, NULL, NULL, NULL, NULL),
('Mark', 'xHnkHSGS', 460, 2499006, 313, 0, NULL, NULL, NULL, NULL, NULL),
('Paul', 'lzRt7Jxs', 306, 2963305, 455, 0, NULL, NULL, NULL, NULL, NULL),
('Steven', 'Dchr3Xt2', 292, 717969, 472, 0, NULL, NULL, NULL, NULL, NULL),
('Andrew', 'EnzOTer3', 423, 1028344, 364, 0, NULL, NULL, NULL, NULL, NULL),
('Kenneth', 'U1fTHCHM', 433, 855648, 130, 0, NULL, NULL, NULL, NULL, NULL),
('Joshua', 'l3yevtzU', 93, 2049333, 59, 0, NULL, NULL, NULL, NULL, NULL),
('Kevin', 'QLsGBzkN', 309, 1157350, 443, 0, NULL, NULL, NULL, NULL, NULL),
('Brian', 'XaR7WPxG', 407, 483520, 482, 0, NULL, NULL, NULL, NULL, NULL),
('George', 'H8g4a83v', 27, 1178019, 499, 0, NULL, NULL, NULL, NULL, NULL),
('Edward', 'Oy5VFoJO', 180, 1606986, 481, 0, NULL, NULL, NULL, NULL, NULL),
('Timothy', 'NtlKNsFG', 425, 2753610, 484, 0, NULL, NULL, NULL, NULL, NULL),
('Jason', 'BCXQ2Mti', 327, 241180, 230, 0, NULL, NULL, NULL, NULL, NULL),
('Jeffrey', 'qWtkaKkP', 323, 2854699, 272, 0, NULL, NULL, NULL, NULL, NULL),
('Ronald', '7BTxYtp6', 261, 3261179, 495, 0, NULL, NULL, NULL, NULL, NULL),
('friend', 'a', 0, 0, 0, 0, 0, NULL, NULL, 0, NULL),
('b', 'b', 4, 523379, 0, 0, 0, NULL, NULL, 0, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
