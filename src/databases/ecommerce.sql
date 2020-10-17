-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2020 at 10:38 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `place` text NOT NULL,
  `recipient_name` text NOT NULL,
  `recipient_number` text NOT NULL,
  `address_name` text NOT NULL,
  `postal_code` text NOT NULL,
  `city` text NOT NULL,
  `isPrimary` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `user_id`, `place`, `recipient_name`, `recipient_number`, `address_name`, `postal_code`, `city`, `isPrimary`, `created_at`, `updated_at`) VALUES
(1, 62, 'Rumah', 'TImo', '1234567890', 'Jalan irigasi persada baru bekasi', '17112', 'Kota Bekasi', 0, '2020-10-02 09:06:31', '2020-10-02 09:13:42'),
(2, 67, 'Office', 'Bos', '1234567890', 'Jalan irigasi persada baru bekasi', '17112', 'Kota Bekasi', 0, '2020-10-02 16:30:21', '2020-10-02 16:30:48'),
(3, 67, 'Rumah', 'Sandra', '1234567890', 'Jalan irigasi persada baru bekasi', '17112', 'Kota Bekasi', 0, '2020-10-14 05:39:36', '2020-10-14 05:39:36'),
(4, 67, 'Kantor', 'Andro', '1234567890', 'Jalan irigasi persada baru bekasi', '17112', 'Kota Bekasi', 1, '2020-10-14 05:52:23', '2020-10-14 05:52:23'),
(5, 67, 'kantor', 'supriyadi', '12345', 'Jalan cemara', '12345', 'medan', 0, '2020-10-17 10:49:25', '2020-10-17 10:49:25'),
(6, 67, 'kantor', 'supriyadi', '12345', 'Jalan cemara', '12345', 'medan', 0, '2020-10-17 10:52:00', '2020-10-17 10:52:00');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `summary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `quantity`, `summary`) VALUES
(164, 67, 55, 1, 11000000),
(165, 67, 69, 1, 45000),
(167, 67, 52, 1, 45000);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` text NOT NULL,
  `url_image` text NOT NULL,
  `category_color` text NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`, `url_image`, `category_color`, `description`, `created_at`, `updated_at`) VALUES
(2, 'Shorts', 'http://localhost:8080/uploads/67_1602396505307.png', '#1C3391', 'lorem ipsum', '2020-09-26 04:20:04', '2020-09-26 04:20:04'),
(3, 'Jacket', 'http://localhost:8080/uploads/67_1602397152902.png', '#F67B02', 'lorem ipsum', '2020-09-26 04:20:04', '2020-09-26 04:20:04'),
(4, 'Pants', 'http://localhost:8080/uploads/67_1602404388768.png', '#E31F51', 'lorem ipsum', '2020-09-26 04:20:04', '2020-09-26 04:20:04'),
(5, 'Shoes', 'http://localhost:8080/uploads/67_1602406047313.png', '#57CD9E', 'lorem ipsum', '2020-09-26 04:20:04', '2020-09-26 04:20:04'),
(6, 'High Heels', 'http://localhost:8080/uploads/67_1602406068702.png', '#B5D850', 'lorem ipsum', '2020-09-26 04:20:04', '2020-09-26 04:20:04'),
(7, 'Wristwatch', 'http://localhost:8080/uploads/67_1602394160085.svg', '#53D850', 'lorem ipsum', '2020-09-26 04:20:04', '2020-09-26 04:20:04'),
(8, 'Cap', 'http://localhost:8080/uploads/67_1602394188514.svg', '#D8BA50', 'lorem ipsum', '2020-09-26 04:20:04', '2020-09-26 04:20:04'),
(9, 'Glasses', 'http://localhost:8080/uploads/67_1602394206394.svg', '#5086D8', 'lorem ipsum', '2020-09-26 04:20:04', '2020-09-26 04:20:04'),
(10, 'Socks', 'http://localhost:8080/uploads/67_1602394282959.png', '#ff9900', 'lorem ipsum', '2020-09-26 04:20:04', '2020-09-26 04:20:04'),
(11, 'Swimsuit', 'http://localhost:8080/uploads/67_1602406135525.png', '#B5D850', 'lorem ipsum', '2020-09-26 04:20:04', '2020-09-26 04:20:04'),
(12, 'Laptop', 'http://localhost:8080/uploads/67_1602406224064.png', '#003b64', 'lorem ipsum', '2020-09-27 22:42:17', '2020-09-27 22:43:26'),
(13, 'Guitar', 'http://localhost:8080/uploads/67_1602406286582.png', '#222222', 'lorem ipsum', '2020-09-27 23:13:53', '2020-09-27 23:13:53'),
(14, 'Payung', 'http://localhost:8080/uploads/67_1602406342350.png', '#ba0c2f', 'lorem ipsum', '2020-10-01 19:56:23', '2020-10-01 19:56:23'),
(15, 'Kipas Angin', 'http://localhost:8080/uploads/67_1602406473436.png', '#81ceff', 'lorem ipsum', '2020-10-01 20:19:42', '2020-10-01 20:19:42'),
(16, 'Mesin Cuci', 'http://localhost:8080/uploads/67_1602406489096.png', '#2dbe60', 'lorem ipsum', '2020-10-01 20:22:55', '2020-10-01 20:22:55'),
(17, 'Handphone', 'http://localhost:8080/uploads/67_1602406502052.png', '#db0011', 'lorem ipsum', '2020-10-01 20:26:35', '2020-10-01 20:26:35'),
(18, 'Sepeda', 'http://localhost:8080/uploads/67_1602406513378.png', '#085856', 'lorem ipsum', '2020-10-01 20:29:15', '2020-10-01 20:29:15'),
(19, 'Handbag', 'http://localhost:8080/uploads/67_1602395103084.svg', '#50C8D8', 'lorem', '2020-10-11 12:45:03', '2020-10-11 12:45:03'),
(21, 'Tie', 'http://localhost:8080/uploads/67_1602395170407.svg', '#D8BA50', 'lorem', '2020-10-11 12:46:10', '2020-10-11 12:46:10'),
(22, 'Dress', 'http://localhost:8080/uploads/67_1602395187305.svg', '#631d76', 'lorem', '2020-10-11 12:46:27', '2020-10-11 12:46:27'),
(23, 'Formal Suit', 'http://localhost:8080/uploads/67_1602395205728.svg', '#50D8AF', 'lorem', '2020-10-11 12:46:45', '2020-10-11 12:46:45'),
(24, 'Accessories', 'http://localhost:8080/uploads/67_1602395222817.svg', '#D85050', 'lorem', '2020-10-11 12:47:02', '2020-10-11 12:47:02'),
(25, 'Bagback', 'http://localhost:8080/uploads/67_1602395299760.svg', '#2bde73', 'lorem', '2020-10-11 12:48:19', '2020-10-11 12:48:19');

-- --------------------------------------------------------

--
-- Table structure for table `conditions`
--

CREATE TABLE `conditions` (
  `id` int(11) NOT NULL,
  `condition_name` text NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `conditions`
--

INSERT INTO `conditions` (`id`, `condition_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'New', 'New Product', '2020-09-27 23:11:34', '2020-09-27 23:12:22'),
(2, 'Pre Order', 'khusus pre order', '2020-09-29 12:40:24', '2020-09-29 12:40:24');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `price`, `description`, `created_at`, `updated_at`) VALUES
(1, 'harry potter', 400000, 'chapter 1 of harry potter', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(3, 'Motorcycle', 3000000, 'A motorcycle, often called a motorbike, bike, or cycle, is a two-wheeled, or less commonly three-wheeled, motor vehicle.', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(4, 'Drum', 50000000, 'Drum adalah kelompok alat musik perkusi yang terdiri dari kulit yang direntangkan dan dipukul dengan tangan atau sebuah batang. Selain kulit, drum juga digunakan dari bahan lain, misalnya plastik. Drum terdapat di seluruh dunia dan memiliki banyak jenis, misalnya kendang, timpani, Bodhrán, Ashiko, snare drum, bass drum, tom-tom, beduk, dan lain-lain.', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(5, 'Piano', 200000000, 'Piano (yang juga disebut pianoforte) adalah instrumen musik yang diklasifikasikan sebagai instrumen perkusi yang dimainkan dengan menekan tuts – tuts pada piano. Setiap tuts tersambung ke hammer yang ada di dalam piano dan menekan senar di dalamnya, sehingga menghasilkan bunyi.', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(6, 'Bass', 15000000, 'Gitar bas elektrik (biasa disebut gitar bas, bas elektrik atau bas saja) adalah alat musik dawai yang menggunakan listrik untuk memperbesar suaranya. Penampilannya mirip dengan gitar listrik tetapi ia memiliki tubuh yang lebih besar, leher yang lebih panjang, dan biasanya memiliki empat senar (dibandingkan dengan gitar yang memiliki enam senar).', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(7, 'Laptop', 20000000, 'Laptop atau komputer jinjing adalah komputer bergerak yang berukuran relatif kecil dan ringan, beratnya berkisar dari 1–6 kg, tergantung pada ukuran, bahan, dan spesifikasi laptop tersebut. Sumber daya laptop berasal dari baterai atau adaptor A/C yang dapat digunakan untuk mengisi ulang baterai dan menyalakan laptop itu sendiri. Baterai laptop pada umumnya dapat bertahan sekitar 2 hingga 6 jam sebelum akhirnya habis, tergantung dari cara pemakaian, spesifikasi, dan ukuran baterai. Laptop terkadang disebut juga dengan komputer notebook atau notebook saja.', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(8, 'lemari baju', 1234, 'lemari baju adalah tempat menyimpan pakain', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(9, 'Rumah', 250000000, 'Dalam arti umum, rumah adalah salah satu bangunan yang dijadikan tempat tinggal selama jangka waktu tertentu. Rumah bisa menjadi tempat tinggal manusia maupun hewan, tetapi untuk istilah tempat tinggal yang khusus bagi hewan adalah sangkar, sarang, atau kandang. Dalam arti khusus, rumah mengacu pada konsep-konsep sosial-kemasyarakatan yang terjalin di dalam bangunan tempat tinggal, seperti keluarga, hidup, makan, tidur, beraktivitas, dan lain-lain.', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(10, 'harry potter', 1000, 'Telepon genggam atau telepon seluler (disingkat ponsel) atau handphone (disingkat HP) adalah perangkat telekomunikasi elektronik yang mempunyai kemampuan dasar yang sama dengan telepon konvensional saluran tetap, tetapi dapat dibawa ke mana-mana (bahasa Inggris: portable atau mobile) dan tidak perlu disambungkan dengan jaringan telepon menggunakan kabel (jadi komunikasi nirkabel, bahasa Inggris: wireless communication). Saat ini, Indonesia mempunyai dua jaringan telepon nirkabel yaitu sistem GSM (Global System for Mobile Telecommunications) dan sistem CDMA (Code Division Multiple Access). Badan yang mengatur telekomunikasi seluler Indonesia adalah Asosiasi Telekomunikasi Seluler Indonesia (ATSI).', '2020-09-11 22:05:56', '2020-09-12 00:13:14'),
(13, 'tempat tidur', 2000000, 'tempat tidur', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(14, 'tempat tidur', 2000000, 'tempat tidur', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(15, 'mesin cuci', 6000000, 'mesin cuci adalah alat otomatis untuk mencuci pakaian', '2020-09-11 22:05:56', '2020-09-11 22:29:55'),
(16, 'lemari baju', 12341, 'lemari baju adalah tempat menyimpan pakain', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(17, 'tempat tidur', 2000000, 'tempat tidur', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(18, 'tempat tidur', 2000000, 'tempat tidur', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(19, 'rak buku', 2000000, 'rak buku', '2020-09-11 22:05:56', '2020-09-11 22:06:28'),
(20, 'rak sepatu', 450000, 'rak sepatu adalah tempat menaruh sepatu dan sendal', '2020-09-11 22:05:56', '2020-09-11 22:28:23'),
(21, 'wastafel', 1500000, 'tempat cuci tangan', '2020-09-11 22:08:54', '2020-09-11 22:08:54'),
(22, 'wastafel', 1500000, 'tempat cuci tangan', '2020-09-23 23:32:32', '2020-09-23 23:32:32');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `created_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `quantity` int(50) NOT NULL,
  `price` int(100) NOT NULL,
  `description` text NOT NULL,
  `store_name` text NOT NULL,
  `image_id` int(11) NOT NULL,
  `condition_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `rating_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `quantity`, `price`, `description`, `store_name`, `image_id`, `condition_id`, `category_id`, `rating_id`, `created_at`, `updated_at`) VALUES
(32, 'Kacamata biru', 25, 100000, 'Kacamata', '', 0, 1, 9, 4, '2020-09-27 23:14:08', '2020-10-05 21:42:28'),
(33, 'Gitar', 20, 2000000, 'Gitar adalah sebuah alat musik berdawai yang dimainkan dengan cara dipetik, umumnya menggunakan jari maupun plektrum.', '', 0, 1, 13, 2, '2020-09-28 06:16:38', '2020-09-28 09:11:37'),
(34, 'Laptop Asus', 10, 7000000, 'Laptop atau komputer jinjing adalah komputer bergerak yang berukuran relatif kecil dan ringan, beratnya berkisar dari 1–6 kg, tergantung pada ukuran, bahan, dan spesifikasi laptop tersebut.', '', 0, 1, 12, 1, '2020-09-28 09:18:28', '2020-09-28 09:19:46'),
(35, 'Topi', 10, 50000, 'Topi dipakai untuk melindungi kepala dari angin, atau dipakai untuk sekedar fashion', '', 0, 1, 8, 2, '2020-09-28 09:23:10', '2020-10-01 19:53:36'),
(36, 'Short biru', 25, 100000, 'Short biru adalah celana yang tren masa kini dan sering dipakai oleh anak muda', '', 0, 1, 2, 1, '2020-09-28 14:39:21', '2020-10-05 20:06:06'),
(37, 'Jacket biru tua', 11, 250000, 'Jacket keren dibuat dengan sangat epic', '', 0, 1, 3, 1, '2020-09-28 14:40:27', '2020-09-28 14:40:27'),
(38, 'Celana hitam', 15, 2000000, 'Celana keren dibuat dengan sangat epic', '', 0, 1, 4, 2, '2020-09-28 14:41:16', '2020-09-28 14:41:16'),
(39, 'Sepatu Biru', 20, 1500000, 'Sepatu keren dibuat dengan sangat epic', '', 0, 1, 5, 2, '2020-09-28 14:41:48', '2020-09-28 14:41:48'),
(40, 'High heels putih', 20, 4000000, 'High heels untuk wanita', '', 0, 1, 6, 2, '2020-09-28 14:42:35', '2020-09-28 14:42:35'),
(41, 'Jam tangan coklat', 30, 310000, 'Jam tangan pria', '', 0, 1, 7, 1, '2020-09-28 14:43:12', '2020-09-28 14:43:12'),
(42, 'Kacamata hitam', 30, 200000, 'Kacamata santai', '', 0, 1, 9, 1, '2020-09-28 14:44:01', '2020-09-28 14:44:01'),
(43, 'Kacamata Biru', 30, 200000, 'Kacamata santai', '', 0, 1, 9, 1, '2020-09-29 12:34:25', '2020-09-29 12:34:25'),
(47, 'Kacamata Biru', 30, 200000, 'Kacamata santai', '', 0, 1, 9, 1, '2020-09-29 12:38:25', '2020-09-29 12:38:25'),
(50, 'sepatu merah', 10, 25000, 'Sepatu sekolah', '', 0, 2, 5, 1, '2020-09-29 13:28:26', '2020-09-29 13:29:34'),
(51, 'Sepatu hijau', 10, 25000, 'Sepatu santuy', '', 0, 2, 5, 1, '2020-10-01 02:03:12', '2020-10-01 02:03:12'),
(52, 'Payung', 50, 45000, 'Payung adalah suatu benda pegang yang digunakan untuk mencegah hujan ... Payung yang digunakan untuk menahan cahaya matahari disebut parasol.', '', 0, 1, 14, 1, '2020-10-01 19:56:50', '2020-10-01 19:56:50'),
(53, 'Kipas Angin', 40, 250000, 'Kipas angin dipergunakan untuk menghasilkan angin. Fungsi yang umum adalah untuk pendingin udara, penyegar udara, ventilasi, pengering. Kipas angin juga ditemukan di mesin penyedot debu dan berbagai ornamen untuk dekorasi ruangan.', '', 0, 1, 15, 1, '2020-10-01 20:19:57', '2020-10-01 20:19:57'),
(54, 'Mesin Cuci', 35, 3000000, 'Mesin cuci adalah sebuah mesin yang dirancang untuk membersihkan pakaian dan tekstil rumah tangga lainnya seperti handuk dan sprai.', '', 0, 1, 16, 1, '2020-10-01 20:23:04', '2020-10-01 20:23:04'),
(55, 'Iphone Xs max', 50, 11000000, 'Apple iPhone Xs merupakan handphone HP dengan kapasitas 2658mAh dan layar 5.8\" yang dilengkapi dengan kamera belakang 12 + 12MP', '', 0, 1, 17, 1, '2020-10-01 20:27:02', '2020-10-01 20:27:02'),
(56, 'Sepeda Gunung', 30, 3000000, 'Sepeda gunung adalah sepeda yang digunakan dalam medan yang berat. Pertama kali diperkenalkan pada tahun 1970, oleh pengguna sepeda di perbukitan San Fransisco.', '', 0, 1, 18, 1, '2020-10-01 20:29:19', '2020-10-01 20:29:19'),
(59, 'Sepatu New Balance', 20, 2000000, 'Sepatu Sneakers Wanita NEW BALANCE Wmns 997 Sport Wmns 997 Sport Grey ... Sepatu Lari NEW BALANCE Fresh Foam 1080 v10 Fresh Foam 1080 V10 ', '', 0, 1, 5, 6, '2020-10-06 02:29:47', '2020-10-06 02:29:47'),
(62, 'Sepeda', 30, 45000, 'Jam dinding', '', 0, 1, 17, 1, '2020-10-11 03:35:16', '2020-10-11 03:35:16'),
(63, 'Sepeda', 30, 45000, 'Jam dinding', '', 0, 1, 17, 1, '2020-10-11 03:37:33', '2020-10-11 03:37:33'),
(64, 'Sepeda', 30, 45000, 'Jam dinding', '', 0, 1, 17, 1, '2020-10-11 03:38:02', '2020-10-11 03:38:02'),
(65, 'Sepeda', 30, 45000, 'Jam dinding', '', 0, 1, 17, 1, '2020-10-11 03:38:23', '2020-10-11 03:38:23'),
(66, 'Sepeda', 30, 45000, 'Jam dinding', 'Seller Lusi', 0, 1, 17, 1, '2020-10-11 03:39:44', '2020-10-11 03:39:44'),
(67, 'Sepeda', 30, 45000, 'sandal jepit merah', 'Seller Lusi', 0, 1, 17, 1, '2020-10-11 04:03:17', '2020-10-11 04:03:17'),
(68, 'Sandal Jepit merah', 30, 45000, 'sandal jepit merah', 'Seller Lusi', 0, 1, 17, 1, '2020-10-11 04:03:34', '2020-10-11 04:03:34'),
(69, 'Xiaomi BlackShark 32 GB', 10, 45000, 'Handphone Xiaomi BlackShark', 'Seller Lusi', 0, 1, 17, 5, '2020-10-11 05:09:17', '2020-10-11 05:09:17');

-- --------------------------------------------------------

--
-- Table structure for table `product_color`
--

CREATE TABLE `product_color` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `hexcode` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_color`
--

INSERT INTO `product_color` (`id`, `product_id`, `name`, `hexcode`, `created_at`, `updated_at`) VALUES
(2, 35, 'hitam', '#000000', '2020-09-29 11:57:14', '2020-09-29 12:18:33'),
(3, 35, 'Kuning', '#ffffff', '2020-09-29 11:57:33', '2020-09-29 13:31:16'),
(4, 32, 'hitam', '#000000', '2020-09-29 11:58:03', '2020-09-29 13:31:05'),
(5, 34, 'Merah', '#ff0000', '2020-09-29 11:58:28', '2020-09-29 11:58:28'),
(6, 35, 'Merah', '#ff0000', '2020-09-29 11:58:31', '2020-09-29 11:58:31'),
(7, 36, 'Biru', '#0000ff', '2020-09-29 11:58:56', '2020-09-29 11:58:56'),
(8, 36, 'Biru dongker', '#00ffff', '2020-09-29 11:59:21', '2020-09-29 11:59:21'),
(9, 38, 'Hitam', '#000000', '2020-09-29 11:59:48', '2020-09-29 11:59:48'),
(11, 39, 'Biru', '#0000ff', '2020-09-29 12:00:22', '2020-09-29 12:00:22'),
(12, 40, 'Putih', '#ffffff', '2020-09-29 12:00:49', '2020-09-29 12:00:49'),
(13, 41, 'Coklat', '#964b00', '2020-09-29 12:01:22', '2020-09-29 12:01:22'),
(14, 42, 'Hitam', '#000000', '2020-09-29 12:01:40', '2020-09-29 12:01:40'),
(15, 50, 'merah', '#00ffff', '2020-09-29 13:30:21', '2020-09-29 13:30:21'),
(16, 33, 'Hitam', '#000000', '2020-10-12 01:38:54', '2020-10-12 01:38:54'),
(17, 37, 'lorem', '#000000', '2020-10-12 01:40:30', '2020-10-12 01:40:30'),
(18, 38, 'lorem', '#D84242', '2020-10-12 01:40:49', '2020-10-12 01:40:49'),
(19, 43, 'lorem', '#D84242', '2020-10-12 01:41:03', '2020-10-12 01:41:03'),
(20, 47, 'lorem', '#4290D8', '2020-10-12 01:41:12', '2020-10-12 01:41:12'),
(21, 51, 'lorem', '#42D86C', '2020-10-12 01:41:20', '2020-10-12 01:41:20'),
(22, 52, 'lorem', '#42D86C', '2020-10-12 01:41:34', '2020-10-12 01:41:34'),
(23, 53, 'lorem', '#D84242', '2020-10-12 01:41:43', '2020-10-12 01:41:43'),
(24, 54, 'lorem', '#000000', '2020-10-12 01:41:53', '2020-10-12 01:41:53'),
(25, 55, 'lorem', '#42D86C', '2020-10-12 01:42:02', '2020-10-12 01:42:02'),
(26, 56, 'lorem', '#42D86C', '2020-10-12 01:42:12', '2020-10-12 01:42:12'),
(28, 59, 'lorem', '#000000', '2020-10-12 01:42:38', '2020-10-12 01:42:38'),
(29, 62, 'lorem', '#000000', '2020-10-12 01:42:48', '2020-10-12 01:42:48'),
(30, 63, 'lorem', '#D84242', '2020-10-12 01:42:58', '2020-10-12 01:42:58'),
(31, 63, 'lorem', '#4290D8', '2020-10-12 01:43:05', '2020-10-12 01:43:05'),
(32, 64, 'lorem', '#4290D8', '2020-10-12 01:43:09', '2020-10-12 01:43:09'),
(33, 65, 'lorem', '#42D86C', '2020-10-12 01:43:15', '2020-10-12 01:43:15'),
(34, 65, 'lorem', '#42D86C', '2020-10-12 01:43:20', '2020-10-12 01:43:20'),
(35, 68, 'lorem', '#4290D8', '2020-10-12 01:43:28', '2020-10-12 01:43:28'),
(36, 69, 'lorem', '#D84242', '2020-10-12 01:43:33', '2020-10-12 01:43:33');

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `url` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`id`, `product_id`, `url`, `created_at`, `updated_at`) VALUES
(165, 36, 'uploads/63_1601559816275.jpg', '2020-10-01 20:43:36', '2020-10-18 02:55:14'),
(166, 37, 'uploads/63_1601559842243.jpg', '2020-10-01 20:44:02', '2020-10-18 02:55:14'),
(167, 38, 'uploads/63_1601559859159.jpg', '2020-10-01 20:44:19', '2020-10-18 02:55:14'),
(169, 40, 'uploads/63_1601559892530.jpg', '2020-10-01 20:44:52', '2020-10-18 02:55:14'),
(170, 41, 'uploads/63_1601559909824.jpg', '2020-10-01 20:45:09', '2020-10-18 02:55:14'),
(171, 42, 'uploads/63_1601559933899.jpg', '2020-10-01 20:45:33', '2020-10-18 02:55:14'),
(172, 43, 'uploads/63_1601559948716.jpg', '2020-10-01 20:45:48', '2020-10-18 02:55:14'),
(173, 47, 'uploads/63_1601559959358.jpg', '2020-10-01 20:45:59', '2020-10-18 02:55:14'),
(174, 50, 'uploads/63_1601559976554.jpg', '2020-10-01 20:46:16', '2020-10-18 02:55:14'),
(175, 51, 'uploads/63_1601560006420.jpg', '2020-10-01 20:46:46', '2020-10-18 02:55:14'),
(176, 52, 'uploads/63_1601560018456.jpg', '2020-10-01 20:46:58', '2020-10-18 02:55:14'),
(177, 53, 'uploads/63_1601560030949.jpg', '2020-10-01 20:47:10', '2020-10-18 02:55:15'),
(178, 54, 'uploads/63_1601560052316.jpg', '2020-10-01 20:47:32', '2020-10-18 02:55:15'),
(412, 32, 'uploads/67_1602017859083.jpg', '2020-10-07 03:57:39', '2020-10-18 02:55:14'),
(413, 33, 'uploads/67_1602017896235.jpg', '2020-10-07 03:58:16', '2020-10-18 02:55:14'),
(414, 34, 'uploads/67_1602017913608.jpg', '2020-10-07 03:58:33', '2020-10-18 02:55:14'),
(415, 35, 'uploads/67_1602018262215.jpg', '2020-10-07 04:04:22', '2020-10-18 02:55:14'),
(416, 39, 'uploads/67_1602018312873.jpg', '2020-10-07 04:05:12', '2020-10-18 02:55:14'),
(417, 59, 'uploads/67_1602018391602.jpg', '2020-10-07 04:06:31', '2020-10-18 02:55:15'),
(418, 69, 'uploads/67_1602368062912.jpg', '2020-10-11 05:14:22', '2020-10-18 02:55:15'),
(422, 55, 'uploads/67_1602453172142.jpg', '2020-10-12 04:52:52', '2020-10-18 02:55:15');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id`, `rating`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, '', '2020-09-28 08:27:51', '2020-10-05 19:48:49'),
(2, 2, '', '2020-09-28 08:28:28', '2020-10-05 19:48:49'),
(4, 3, '', '2020-10-05 19:57:09', '2020-10-05 19:57:09'),
(5, 4, '', '2020-10-05 19:57:16', '2020-10-05 19:57:16'),
(6, 5, '', '2020-10-05 19:57:19', '2020-10-05 19:57:19');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'Responsible to manage roles', '2020-09-26 13:44:47', '2020-09-26 13:54:04'),
(2, 'Seller', 'Sell Product', '2020-09-26 13:45:36', '2020-09-26 13:45:36'),
(3, 'General User', 'Customer can buy and order', '2020-09-26 13:55:05', '2020-09-27 23:16:31'),
(4, 'General User', 'Customer', '2020-09-27 19:50:34', '2020-09-27 23:16:32');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `delivery_fee` int(11) NOT NULL,
  `summary` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `phone_number` text NOT NULL,
  `address_id` int(11) DEFAULT NULL,
  `gender` text DEFAULT NULL,
  `profile_picture` text DEFAULT NULL,
  `dateOfBirth` tinytext DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `name`, `email`, `password`, `phone_number`, `address_id`, `gender`, `profile_picture`, `dateOfBirth`, `balance`, `created_at`, `updated_at`) VALUES
(7, 1, 'yusuf', 'yusuf@mail.com', '$2b$10$w5dqznwLRmIkJdT.wF.xiOI7AlhgrHYlwVxFOGVToXZ9q0f/yp8Mi', '1111', 0, '', 'http://localhost:8080/uploads/10_1601359265119.jpg', '', 0, '2020-09-28 01:36:06', '2020-09-29 13:01:05'),
(10, 1, 'timotius', 'timoty@mail.com', '$2b$10$IciWdIhsDZ24yQT0QlIBwOt2jgoVRQnjmrBTpWS40/2DeLxy5XsUq', '1234', 0, '', 'http://localhost:8080/uploads/7_1601235921381.jpg', '', 0, '2020-09-28 02:45:21', '2020-10-02 16:31:39'),
(11, 1, 'timotius', 'timoty12@mail.com', '$2b$10$j89ibY65moV6/p8PJOBHK.7X9lO/Xgtzi3hWlQAvcJtXGQtiiLsim', '1234', 0, '', 'http://localhost:8080/uploads/7_1601237144709.jpg', '', 0, '2020-09-28 03:05:45', '2020-09-28 03:05:45'),
(14, 1, 'timotius', 'tim24@mail.com', '$2b$10$ytCfplCc/V1dTtpPOx4yqeRuXaOtYl51agICVCyWRkikrSKzbG1za', '1234', 0, '', 'http://localhost:8080/uploads/7_1601240567707.jpg', '', 0, '2020-09-28 04:02:47', '2020-09-28 04:02:47'),
(15, 1, 'timotius', 'tim241@mail.com', '$2b$10$fmpocf1j1AcPxd2gOXbqa.LXi.WmPgJi0SbKEw5TWWuVN9TBYwwkO', '1234', 0, '', 'http://localhost:8080/uploads/7_1601240592067.jpg', '', 0, '2020-09-28 04:03:12', '2020-09-28 04:03:12'),
(16, 1, 'timotius', 'tim2411@mail.com', '$2b$10$dfg4gwz8LyIY7Y8IUvid2u1bAO.FUmKm4tiFhpNfKqC/4W7ddeTy2', '1234', 0, '', 'http://localhost:8080/uploads/7_1601240730520.jpg', '', 0, '2020-09-28 04:05:30', '2020-09-28 04:05:30'),
(17, 1, 'timotius', 'tim241211@mail.com', '$2b$10$bqAwVL.AwVctJLnesmt9zerpGrnqNtu8T0onF8232mkQmL0e.1Cau', '1234', 0, '', 'http://localhost:8080/uploads/7_1601240741429.jpg', '', 0, '2020-09-28 04:05:41', '2020-09-28 04:05:41'),
(18, 1, 'timotius', 'tim2412112121@mail.com', '$2b$10$bnsXg0T7WmjoghbxffxYU.dUMoq3mRQGTARBVXjfgcjF7ICoI1cZu', '1234', 0, '', 'http://localhost:8080/uploads/7_1601240838425.jpg', '', 0, '2020-09-28 04:07:18', '2020-09-28 04:07:18'),
(19, 1, 'timotius', '12@mail.com', '$2b$10$sj4Ij0Mc4sYr/sMl/4yKS.Tdjs6z.EChfG7v6yQmRM1OBxpFqSE6W', '1234', 0, '', '', '', 0, '2020-09-28 05:14:34', '2020-09-28 05:14:34'),
(20, 1, 'timotius', '123@mail.com', '$2b$10$g.DwAHSMSlIQO6ZVdRZqZ.EnWX.2l5ol5sPiPE4Swt46TIZF.0xra', '1234', 0, '', '', '', 0, '2020-09-28 05:17:13', '2020-09-28 05:17:13'),
(21, 1, 'timotius', '1234@mail.com', '$2b$10$XsYTgKMlDtyiYSJ.FB/J3eWdiN6ptDncEWD5EjwvdwvOTzviePp0y', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 11:17:00', '2020-09-28 11:17:00'),
(22, 1, 'timotius', '12345@mail.com', '$2b$10$9i65Q72KYcP5/OetCrKZa.5Flm25jidg3k6bX0UmRw.1jD/Hq2uIm', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 11:18:01', '2020-09-28 11:18:01'),
(23, 1, 'timotius', '123456@mail.com', '$2b$10$6U8XBp6EMZV2T274YhcjFut/tspQMoX9QBnbzEkdQvSl30xKnzhM.', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 11:19:55', '2020-09-28 11:19:55'),
(24, 1, 'timotius', '1234567@mail.com', '$2b$10$tyT3iLFXWilCyz.WSqKw9ObKmz77xd0X/6AonY9E6.cJKZSYsWuOO', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 11:21:57', '2020-09-28 11:21:57'),
(26, 1, 'yusuf', 'yusuf@mail.com', '$2b$10$8uwgFOeyGuhod64VKcAyVu.KZuJ1jfB29Nc/kHBOoKIweer0/zV8G', '1111', 0, '', 'http://localhost:8080/uploads/10_1601360722818.jpg', '', 0, '2020-09-28 11:24:08', '2020-09-29 13:25:22'),
(27, 1, 'timotius', '1234567892@mail.com', '$2b$10$Ze8/9LehJrlSZ8MvvFZtpOeEfatkKmGS5LQL1lZQaUDZt28LYqEi6', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 11:35:08', '2020-09-28 11:35:08'),
(28, 1, 'timotius', '123456789212@mail.com', '$2b$10$8GDc/WzSHCO8Jb44UZ0XBuUZGsHzRiO6S6ft8cgzGM9N0cyXFQsYa', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 13:31:11', '2020-09-28 13:31:11'),
(29, 1, 'timotius', '1234561789212@mail.com', '$2b$10$uhs1.cLAP/bfaTHSgQhYDuh6aGoIpHo1Ikysdr0xWQrjz7mcLJRF2', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 13:34:03', '2020-09-28 13:34:03'),
(30, 1, 'timotius', '12345611789212@mail.com', '$2b$10$eseWnQWIXRwFkiRZrKYS3OFWq9WO94aXtLD4U/KDrHzuF084p1sIi', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 13:46:10', '2020-09-28 13:46:10'),
(31, 1, 'timotius', '123456111789212@mail.com', '$2b$10$3dFkcEGQkgCvWKmPd31paO0gupbfeNzKUTNC2qmqloVPc5wUbsTHO', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 13:46:15', '2020-09-28 13:46:15'),
(32, 1, 'timotius', '1234561212111789212@mail.com', '$2b$10$SKTlMsZml0b04jKfF037mOTR.SAwlYbP6jGSMG.yeH8RZ1ZXkUz5m', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 13:47:34', '2020-09-28 13:47:34'),
(33, 1, 'timotius', '221@mail.com', '$2b$10$pqUNDwymE1BG8QaPLrOc4ewDbsaSCsVZO32iBmQY8qSwCWdIOhY8i', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 13:48:35', '2020-09-28 13:48:35'),
(34, 1, 'timotius', '2211@mail.com', '$2b$10$L52YfW93OzJabaPUaKrM/O2REhrlIQp7dGTWLBxdT5d5fgIXkwXs2', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 13:49:22', '2020-09-28 13:49:22'),
(35, 1, 'timotius', '1221@mail.com', '$2b$10$bIBIosfPegbc0qEi8.r8ee7/HAjNy6tij6ywsyC5NRm2KXdxhoIlu', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 13:50:16', '2020-09-28 13:50:16'),
(36, 1, 'timotius', '1231@mail.com', '$2b$10$N5KOpblTDgGZ4CA.Mrfwme.f3FlYzgWwNQpTieIh1KtHd.zqbkFLS', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 13:51:22', '2020-09-28 13:51:22'),
(37, 1, 'timotius', '12314@mail.com', '$2b$10$iU4/Tr1S9xcB495mZFKl.eSYNzQYFofRelOk1lZi9d8JtZkeFAMx.', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 13:52:13', '2020-09-28 13:52:13'),
(38, 1, 'timotius', '4414@mail.com', '$2b$10$n7SOpJYl14p9Cos7rPbcB.LBBjoMgc1Ao43NFKqjvO1iAm9UTnw/a', '1234', 0, '', 'http://localhost:8080/uploads/undefined', '', 0, '2020-09-28 13:53:00', '2020-09-28 13:53:00'),
(39, 1, 'timotius', '51@mail.com', '$2b$10$a/JrVhV8ijHvzYJiU8eHZeuYwMrJ5DuUxJrCyT82JfnZW0OUPr38m', '1234', 0, '', 'http://localhost:8080/uploads/7_1601276047986.jpg', '', 0, '2020-09-28 13:54:08', '2020-09-28 13:54:08'),
(40, 1, 'timotius', '516@mail.com', '$2b$10$b2zqR.5aB9DRTV7GoC.OeeN58vSKxxKPvoiFEN0A5Yj7un5Km6CxG', '1234', 0, '', 'http://localhost:8080/uploads/7_1601276212298.jpg', '', 0, '2020-09-28 13:56:52', '2020-09-28 13:56:52'),
(41, 1, 'timotius', '62@mail.com', '$2b$10$T5jF2m4IcVq3DubfFijfAOws78aGxrDu0w5bHMbXkC6HKZf7jwG5S', '1234', 0, '', 'http://localhost:8080/uploads/7_1601276252579.jpg', '', 0, '2020-09-28 13:57:32', '2020-09-28 13:57:32'),
(42, 1, 'timotius', '621@mail.com', '$2b$10$f1pqZHDJqxaxrweRUx6.Ouy6SIOsFup0gVLRnoYbeoCXGYSjw9Bfe', '1234', 0, '', 'http://localhost:8080/uploads/7_1601276367404.jpg', '', 0, '2020-09-28 13:59:27', '2020-09-28 13:59:27'),
(43, 1, 'timotius', '6211@mail.com', '$2b$10$/xQiVJlg6NKVl3qxSl3AH.p5IZ6b4zUkTS793u21fFkzXnAQhrRE6', '1234', 0, '', 'http://localhost:8080/uploads/7_1601276425278.jpg', '', 0, '2020-09-28 14:00:25', '2020-09-28 14:00:25'),
(44, 1, 'timotius', '331@mail.com', '$2b$10$6HiNwVbwBrPlz/PUAxS8Me2Q9hfBXhWTJ4l3LcYaHe7w4GwPbilsW', '1234', 0, '', 'http://localhost:8080/uploads/7_1601276543186.jpg', '', 0, '2020-09-28 14:02:23', '2020-09-28 14:02:23'),
(45, 1, 'timotius', '22@mail.com', '$2b$10$w9DBdYR62htUjQNnGUpejug944oQerG5LG01Nss/QcVZRN/FCIerS', '1234', 0, '', 'http://localhost:8080/uploads/7_1601276584162.jpg', '', 0, '2020-09-28 14:03:04', '2020-09-28 14:03:04'),
(46, 1, 'timotius', 'admin@mail.com', '$2b$10$QEw7lIkkON9az.Dg4Cr94OVSXAYcVh7sIyadE/Ld8YhTkmnebqn0S', '1234', 0, '', 'http://localhost:8080/uploads/7_1601278485469.jpg', '', 0, '2020-09-28 14:34:45', '2020-09-28 14:34:45'),
(47, 1, 'super', 'gm_admin@mail.com', '$2b$10$UhFNIPXEjWHmb5XDJlgtAuh5hncGQSbVBNUF0ZnNqUbNMRY1AQw6a', '1234', 0, '', 'http://localhost:8080/uploads/7_1601278543109.jpg', '', 0, '2020-09-28 14:35:43', '2020-09-28 14:35:43'),
(48, 3, 'andrew', 'andrew@mail.com', '$2b$10$VjZMDGG754vzTtjabXyzEOdmNapchGK42LOQAntNGevO0hRmkVWZm', '1234', 0, '', 'http://localhost:8080/uploads/47_1601280614682.jpg', '', 0, '2020-09-28 15:10:14', '2020-09-28 15:10:14'),
(49, 1, 'andrew', 'admin2@mail.com', '$2b$10$w/ryBSdLMAelAEK/YKppZuZyUmvzjT2faHqZxC1sByYJHB3HiyxgC', '1234', 0, '', 'http://localhost:8080/uploads/46_1601282407973.jpg', '', 0, '2020-09-28 15:40:08', '2020-09-28 15:40:08'),
(50, 1, 'gun', 'admin23@mail.com', '$2b$10$rufJSXDs5YOjqRFE9RPDMu3YY4pgdaRPkP1Wy.AkqoNRgZgDIMnA.', '1234', 0, '', 'http://localhost:8080/uploads/49_1601284189802.jpg', '', 0, '2020-09-28 16:09:49', '2020-09-28 16:09:49'),
(51, 3, 'gun', 'user2@mail.com', '$2b$10$xJAR8gBEcr/Emk1HYySnJO2B1DUVHIjo76ob0vnCXC7uC1UHzqJUe', '1234', 0, '', 'http://localhost:8080/uploads/49_1601284210393.jpg', '', 0, '2020-09-28 16:10:10', '2020-09-28 16:10:10'),
(52, 3, 'gundogan', 'usertest@mail.com', '$2b$10$QJLLJV8k9Nf/9/wHgCEcTeGJWricgfzVYcWv6tSX8BXF/nxti12PG', '1234', 0, '', 'http://localhost:8080/uploads/51_1601284641296.jpg', '', 0, '2020-09-28 16:17:21', '2020-09-28 16:17:21'),
(53, 3, 'super admin 5', 'superadmin@mail.com', '$2b$10$MmyQegVUAId.YB8l.bCnue.FUPiGxtI0ELIkVZx4w30GRlVuPaETK', '1234', 0, '', 'http://localhost:8080/uploads/51_1601285687358.jpg', '', 0, '2020-09-28 16:34:47', '2020-09-28 16:34:47'),
(54, 1, 'super admin 5', 'superadmin1@mail.com', '$2b$10$xUc/tyKXjanTd3LqtXTu4e8mwFjOkZr1l90EGg4vSYWuF0wdc22sa', '1234', 0, '', 'http://localhost:8080/uploads/46_1601285791626.jpg', '', 0, '2020-09-28 16:36:31', '2020-09-28 16:36:31'),
(55, 1, 'super admin 2', 'admin_2@mail.com', '$2b$10$WCLAHrEQHeSD10TWQqmv6O0oyPDDONb9OmjgOXbSgFoDffd8Vtprq', '1234', 0, '', 'http://localhost:8080/uploads/46_1601285851002.jpg', '', 0, '2020-09-28 16:37:31', '2020-09-28 16:37:31'),
(56, 1, 'super admin 3', 'admin_3@mail.com', '$2b$10$8nAY0vptfH/TJzqxHDCRhu09hvoMoOTEi56ElBDSeTW.PKt5d2tlO', '1234', 0, '', 'http://localhost:8080/uploads/54_1601285870069.jpg', '', 0, '2020-09-28 16:37:50', '2020-09-28 16:37:50'),
(57, 3, 'user', 'fake_user@mail.com', '$2b$10$TNUwPVyjGbcobja3f5GlR.QwT4zKQa9dwaRQBzJnty5erCNm.7.z2', '1234', 0, '', 'http://localhost:8080/uploads/54_1601285899113.jpg', '', 0, '2020-09-28 16:38:19', '2020-09-28 16:38:19'),
(58, 3, 'fake_admin', 'fake_admin@mail.com', '$2b$10$GBu1yTXHI5fO.QpLjMtCYebm44V4xrYnQQBPR.a7RPsEdH2ipEoEO', '1234', 0, '', 'http://localhost:8080/uploads/57_1601285950991.jpg', '', 0, '2020-09-28 16:39:11', '2020-09-28 16:39:11'),
(59, 3, 'fake_admin', 'fake_admin1@mail.com', '$2b$10$OXVL2xOiLGtrQo0ASqe1G.r29A0Ussylt4gmbsb5/VOejMq5cdPIG', '1234', 0, '', 'http://localhost:8080/uploads/57_1601286606682.jpg', '', 0, '2020-09-28 16:50:06', '2020-09-28 16:50:06'),
(60, 3, 'heru', 'heru1@mail.com', '$2b$10$JgP0onRR7SJ1QMY3rOrU0OxmuzBjXIaAPnfeNusFdsfEWDzejc0BW', '08123', 0, '', 'http://localhost:8080/uploads/10_1601360602506.jpg', '', 0, '2020-09-29 13:23:22', '2020-09-29 13:23:22'),
(61, 1, 'roy', 'roy@mail.com', '$2b$10$RuiUML65N89Mpe2Z91Ktb.GmU0zi5ymJmOPhzlyNOHkImnPzbCzBS', '08123', 0, '', 'http://localhost:8080/uploads/10_1601361622919.jpg', '', 0, '2020-09-29 13:40:23', '2020-09-29 13:40:23'),
(62, 3, 'wawan set', 'wawan@mail.com', '$2b$10$IWSGRCElKpd0IJRMFMU68u186TIOZpp0aEjq1Ei8cUl1yflSgtfPK', '21', 0, '', 'http://localhost:8080/uploads/62_1601629398566.png', '', 0, '2020-09-30 06:17:07', '2020-10-02 16:03:18'),
(63, 2, 'Seller andrew', 'andrew_store@mail.com', '$2b$10$gTNJMxKj1piiMVHnfkUB2.7vfMjRyYn0qyzDTWROBhD6QGjwQfIN2', '12345', 0, '', 'https://ui-avatars.com/api/?size=256&name=Seller andrew', '', 0, '2020-09-30 07:48:49', '2020-09-30 07:48:49'),
(64, 2, 'Seller Guna', 'guna_store@mail.com', '$2b$10$7G0KEkLxZY5kPkBel0KvUeG9tG740ChybS3f/t/m8c.9QyeQ4lfLS', '12345', NULL, '', NULL, '', 0, '2020-10-02 14:03:48', '2020-10-02 14:03:48'),
(65, 3, 'bagus', 'bagus@mail.com', '$2b$10$G370cqTZTFtdfnonGlHVBu.zmUhxbA8Z/n8LcV4YdltX45JIk/60W', '12345', NULL, '', NULL, '', 0, '2020-10-02 14:53:12', '2020-10-02 14:53:12'),
(66, 3, 'lus', 'lusi@mail.com', '$2b$10$Slg/erNo11I4QztqJ/LN2urrO6p6ektRGxZxaf77.ncxveEysCQki', '21', NULL, '', 'http://localhost:8080/uploads/66_1601630603481.jpg', '', 0, '2020-10-02 16:18:16', '2020-10-02 16:23:23'),
(67, 2, 'Lusiaaa', 'lusi_store@mail.com', '$2b$10$nIz/KApMvxGn1DimZv4WvOR7g10rjx.vjNBCFeOGKBmeigV6BlF4y', '081234567890', NULL, 'Female', 'http://localhost:8080/uploads/67_1602899748155.jpeg', '24/08/1998', 0, '2020-10-02 16:24:44', '2020-10-17 08:55:48'),
(68, 3, 'lusi', 'lusi221@mail.com', '$2b$10$1xDSXbMu8q6VAckDUYMPSuw7fNcvQDk3/TtZ3MEKBsJn7mG5SB43G', '0812', NULL, '', NULL, '', 0, '2020-10-08 08:36:18', '2020-10-08 08:36:18'),
(69, 3, 'John Doe', 'john@mail.com', '$2b$10$53PpcYfGVo7jsO5UTRq9MubSr6GjzP0ZOLD6oofZXZvF1QEYqOPU6', '0812', NULL, '', NULL, '', 0, '2020-10-08 08:59:55', '2020-10-08 08:59:55'),
(70, 3, 'John Doe', 'john21@mail.com', '$2b$10$gMYgwrvwNISmuEHeFLcTDOEDLiPX1TF437b1tEwCGSjSjoOB3thEO', '0812', NULL, '', NULL, '', 0, '2020-10-08 09:04:02', '2020-10-08 09:04:02'),
(71, 3, 'john', 'john2@mail.com', '$2b$10$qi1oZb2mdMNLElOY58HOPedZO7QWN7zePn20ISPBdPAYxoO.d4T9i', '1234', NULL, '', NULL, '', 0, '2020-10-08 09:34:05', '2020-10-08 09:34:05'),
(72, 3, 'asd', '111@mail.com', '$2b$10$iSiEafMysceGYRm4MZC/hemazZ6ugpekc7DCNc9UuwCl4/Fu0iDKe', '', NULL, '', NULL, '', 0, '2020-10-08 22:17:31', '2020-10-08 22:17:31'),
(73, 3, 'tes', '111123231@mail.com', '$2b$10$KQqq3TUEd7lhvLMgOxXaUOSr65ua7F59.EXSaCu8/DCcWINGhO3di', '', NULL, '', NULL, '', 0, '2020-10-08 22:38:21', '2020-10-08 22:38:21'),
(74, 3, 'timotius', '111@mail.comsaddasd', '$2b$10$36YmpKGOAyYGg2h5yDep8e9xkhWASIjTNR.Tc9ERBRcPppLI6/qlm', '', NULL, '', NULL, '', 0, '2020-10-08 22:46:01', '2020-10-08 22:46:01'),
(75, 3, 'timotius', '111121212@mail.com', '$2b$10$z/CMfbm2/uoFwjXBbgicLOn91PLVf/AtAZ11moxDOF1aWNoQmz3zO', '', NULL, '', NULL, '', 0, '2020-10-08 22:49:04', '2020-10-08 22:49:04'),
(76, 3, 'timotius', '111@mail.com2112', '$2b$10$gdDsmZ8.8PZTvtIbig9XNeEhXYIwbd.5AxjInjv7ownM0ysHYbc32', '', NULL, '', NULL, '', 0, '2020-10-08 23:47:26', '2020-10-08 23:47:26'),
(77, 3, 'awada', '6466@mail.com', '$2b$10$iC3PTcNImTW/Xd3wrLHdB.go7ZtaAYHaZA8tgoaG7lXxyMvlPnhgW', '', NULL, '', NULL, '', 0, '2020-10-09 02:30:32', '2020-10-09 02:30:32'),
(78, 3, 'timotius', '1112221@mail.com', '$2b$10$G0L1LmD3B2lQ12mrzfpISO1yOdVMVnFhwp/hu1Ijtd/I.XHTzt/Sa', '', NULL, '', NULL, '', 0, '2020-10-09 02:33:11', '2020-10-09 02:33:11'),
(79, 3, 'timotius', '11144d@mail.com', '$2b$10$AdQ08HoDGzZIjR9SqfXEm.UwpwIfIi6bZRlhMCWpqBpn.CbdHLtgS', '', NULL, '', NULL, '', 0, '2020-10-09 02:37:35', '2020-10-09 02:37:35'),
(80, 3, 'timotius', '11131@mail.com', '$2b$10$jMr0dnm8DDNGxROHYHH4nexERC.04cNLe37ApXXmRHxgk4.g.mH0.', '', NULL, '', NULL, '', 0, '2020-10-09 02:38:38', '2020-10-09 02:38:38'),
(81, 3, 'timotius', '111333@mail.com', '$2b$10$cY2uVFgnQoInbNmWrAmB4.7NWmIywottTcYF34mwQCSDhnuMb.ur2', '', NULL, '', NULL, '', 0, '2020-10-09 02:40:40', '2020-10-09 02:40:40'),
(82, 3, 'timotius', '111333331@mail.com', '$2b$10$mCGZJG/ZCtCdoq06wgE4vuN7iqpItvvITtpvA3vGZH9GoyQ3UzphG', '', NULL, '', NULL, '', 0, '2020-10-09 02:40:56', '2020-10-09 02:40:56'),
(83, 3, 'lia', 'lia@mail.com', '$2b$10$gCt6IxfKz5Cp4ubSxDViC.Qjjbp6TAEWIENdJ6HQsYn8Vyq23w1.K', '', NULL, '', NULL, '', NULL, '2020-10-12 10:10:31', '2020-10-12 10:10:31'),
(84, 3, 'lia', 'lia@gmail.com', '$2b$10$WK.3FLX00moUsh/d3lL59OjwqSXyuSdURRY87YQ7WTTmNlqQW3iIq', '', NULL, '', NULL, '', NULL, '2020-10-12 10:11:38', '2020-10-12 10:11:38'),
(85, 3, 'lisa', 'lusi@gmail.com', '$2b$10$fUCTXvDjSJTKmJEyEv7d6.VOfKnM44KaBzePdkAVpvfr4VdjkaFY2', '', NULL, '', NULL, '', NULL, '2020-10-12 11:37:53', '2020-10-12 11:37:53'),
(86, 3, 'Timotius Simanjuntak', 'timotiussimanjuntak24@gmail.com', '$2b$10$3IDZFb.mX3TdxBJFugqGXOmFv.8KTM0oUnQXBMme42swobueQNbo.', '', NULL, '', NULL, '', NULL, '2020-10-13 04:33:45', '2020-10-13 04:33:45'),
(87, 3, 't', 'timoti@mail.com', '$2b$10$/ljJZM77E51mCRV5564KyuFF16ESEwtRPBz0O6BjQU9MQNnCSK5sC', '', NULL, '', NULL, '', NULL, '2020-10-13 07:19:31', '2020-10-13 07:19:31'),
(88, 3, 'timotius', 'lusi_store@mail.comaaa', '$2b$10$q2renT2hWjxJiA6b8l9oDuXNP/lePAv8lIZMM4tHnD02Sg/kFmdo.', '', NULL, NULL, NULL, NULL, NULL, '2020-10-18 00:23:44', '2020-10-18 00:23:44'),
(89, 3, 'timotius', 'yesi@mail.com', '$2b$10$qTg.soh8l./r6Meczb2jlOcoiR1I7G7ppDeg7x/5D7qcAMUl7nge2', '', NULL, NULL, NULL, NULL, NULL, '2020-10-18 00:24:30', '2020-10-18 00:24:30'),
(90, 3, 'timotius', '11112112121@mail.com', '$2b$10$xz15YCpbl3AX9cYJcGX8p.f8/G8qGjaPLBVVZW7ef1TxeWkBqoYx2', '', NULL, NULL, NULL, NULL, NULL, '2020-10-18 02:14:43', '2020-10-18 02:14:43'),
(91, 3, 'timotius', 'lusi123@mail.com', '$2b$10$NJ/NKQtcGXE630HIHP1ajOsm6HhBXgcKtyxZFcibc2PSY1Plj.fvy', '', NULL, NULL, NULL, NULL, NULL, '2020-10-18 02:21:26', '2020-10-18 02:21:26'),
(92, 3, 'timotius', '123timo@mail.com', '$2b$10$vvw4nUFOaj.S/XvH.3xFUORO.pJRLhangq/j54VCMWnYdVfdIb3A2', '', NULL, NULL, NULL, NULL, NULL, '2020-10-18 02:22:44', '2020-10-18 02:22:44'),
(93, 3, 'timotius', 'lusi_store4545@mail.com', '$2b$10$6LXqwhPEmndAjeGymkawtu3o.0volesGyGuG23ymuFuIXZS5kn8VG', '', NULL, NULL, NULL, NULL, NULL, '2020-10-18 02:27:02', '2020-10-18 02:27:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conditions`
--
ALTER TABLE `conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `condition_id` (`condition_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `rating_id` (`rating_id`),
  ADD KEY `image_id` (`image_id`);

--
-- Indexes for table `product_color`
--
ALTER TABLE `product_color`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `address_id` (`address_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `conditions`
--
ALTER TABLE `conditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `product_color`
--
ALTER TABLE `product_color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=423;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`condition_id`) REFERENCES `conditions` (`id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`rating_id`) REFERENCES `rating` (`id`);

--
-- Constraints for table `product_color`
--
ALTER TABLE `product_color`
  ADD CONSTRAINT `product_color_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
