-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Dec 19, 2025 at 05:56 PM
-- Server version: 10.7.3-MariaDB-1:10.7.3+maria~focal
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `brushtip`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `comment_text` varchar(255) DEFAULT NULL,
  `upload_date` timestamp NULL DEFAULT NULL,
  `like_count` int(11) DEFAULT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `comment_text`, `upload_date`, `like_count`, `post_id`, `user_id`) VALUES
(34, 'sdsadsa', '2025-12-19 15:56:48', 0, 34, 8),
(36, '11', '2025-12-19 16:53:28', 0, 35, 8),
(37, 'naujas', '2025-12-19 16:55:11', 0, 35, 8),
(38, 'naujausias', '2025-12-19 16:55:16', 0, 35, 8);

-- --------------------------------------------------------

--
-- Table structure for table `comment_likes`
--

CREATE TABLE `comment_likes` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comment_replies`
--

CREATE TABLE `comment_replies` (
  `comment_id` int(11) NOT NULL,
  `reply_to_comment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment_replies`
--

INSERT INTO `comment_replies` (`comment_id`, `reply_to_comment_id`) VALUES
(38, 37);

-- --------------------------------------------------------

--
-- Table structure for table `fonts`
--

CREATE TABLE `fonts` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fonts`
--

INSERT INTO `fonts` (`id`, `name`) VALUES
(1, 'Aria'),
(2, 'Times New Roman');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `upload_date` timestamp NULL DEFAULT NULL,
  `comment_count` int(11) DEFAULT NULL,
  `like_count` int(11) DEFAULT NULL,
  `post_type` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `isActive` tinyint(1) DEFAULT 0,
  `needsCheck` tinyint(1) DEFAULT 0,
  `AI_percent` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `description`, `upload_date`, `comment_count`, `like_count`, `post_type`, `user_id`, `isActive`, `needsCheck`, `AI_percent`) VALUES
(2, 'How do you blend colors digitally im insaneaaa?', 'I’m struggling with smooth blending in Procreate.', '2025-10-06 00:00:00', 2, 10, 1, 1, 1, 0, 0),
(3, 'Best drawing tablets in 2025?', 'Looking for recommendations under $500.', '2025-10-03 00:00:00', 1, 5, 1, 3, 1, 0, 0),
(10, 'How do you blend colors digitally im insane?', 'I’m struggling with smooth blending in Procreate.', '2025-10-06 00:00:00', 2, 10, 1, 5, 1, 0, 0),
(34, 'POSSSTAS', 'NAMAS', '2025-12-18 14:26:56', 2, 1, 2, 8, 0, 0, 0),
(35, 'postaass', 'sdasd', '2025-12-19 16:07:46', 3, 2, 2, 11, 0, 0, 0),
(36, 'asdaSA', 'sAS', '2025-12-19 17:08:41', 0, 0, 1, 8, 1, 0, 0),
(37, 'naujas postas ', 'dasda', '2025-12-19 17:47:30', 0, 1, 1, 11, 1, 0, 0),
(38, 'sdasdas', 'sdasda', '2025-12-19 18:12:51', 0, 0, 2, 11, 0, 0, 0),
(39, 'naujausias top', 'ada', '2025-12-18 18:14:38', 0, 0, 1, 11, 1, 0, 0),
(40, '123123', '12312', '2025-12-19 19:20:29', 0, 0, 2, 11, 0, 0, 0.301007),
(42, 'asdasda', 'dasdasdas', '2025-12-19 19:39:11', 0, 0, 2, 11, 0, 0, 0.50871);

-- --------------------------------------------------------

--
-- Table structure for table `post_images`
--

CREATE TABLE `post_images` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_images`
--

INSERT INTO `post_images` (`id`, `image`, `post_id`) VALUES
(12, 'assets/1766147216543-836169628-20240724_212014.jpg', 34),
(13, 'assets/1766153266066-814345432-wp5252093-lord-of-the-rings-4k-wallpapers.jpg', 35),
(14, NULL, 36),
(15, NULL, 37),
(16, 'assets/1766160771362-367694208-pizza.jpg', 38),
(17, NULL, 39),
(18, 'assets/1766164829423-865466885-20240724_212014.jpg', 40),
(20, 'assets/1766165951372-585742836-489336628_1173324457915231_3519716289397238315_n.jpg', 42);

-- --------------------------------------------------------

--
-- Table structure for table `post_likes`
--

CREATE TABLE `post_likes` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_likes`
--

INSERT INTO `post_likes` (`post_id`, `user_id`) VALUES
(34, 11),
(35, 8),
(35, 11);

-- --------------------------------------------------------

--
-- Table structure for table `post_types`
--

CREATE TABLE `post_types` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_types`
--

INSERT INTO `post_types` (`id`, `name`) VALUES
(1, 'question'),
(2, 'art_post');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `banner_img` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `profile_font` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `description`, `profile_img`, `banner_img`, `is_admin`, `profile_font`) VALUES
(1, 'alice', 'alice@example.com', 'hashed_pw1', 'I’m a digital artist who paints with pixels and emotion. My art is inspired by dreams, nature, and the quiet magic in everyday life. I love experimenting with light, texture, and surreal themes to tell stories that blur the line between reality and fantasy.', 'alice_profile.jpg', 'alice_banner.jpg', 0, 1),
(2, 'bob', 'bob@example.com', 'hashed_pw2', 'Aspiring photographer', 'bob_profile.png', 'bob_banner.png', 0, 2),
(3, 'charlie', 'charlie@example.com', 'hashed_pw3', 'Developer & tech enthusiast', 'charlie_profile.jpg', 'charlie_banner.jpg', 1, 1),
(4, 'diana', 'diana@example.com', 'hashed_pw4', 'Art student learning 3D modeling', 'diana_profile.png', 'diana_banner.png', 0, 1),
(5, 'eima', 'test@gmail.com', '$2b$10$rtzJ3suijp0A2LIkK82fQubradstPH59RzWQz83pMtNwtooliFRUq', 'No description', 'No profile_img', 'No banner_img', 0, 1),
(6, 'test', 'test', '$2b$10$5qszMFER73h8kYAhVCJ/Mu9YTDoS6xRJHsUovsyVtlZQrqMup9D9e', 'No description', 'No profile_img', 'No banner_img', 0, 1),
(7, '', '', '$2b$10$D0ywE97bFv6TWZ78bIMLwuDwVcScB/SCXRhAjGPybYWl5ovU6l83C', 'No description', 'No profile_img', 'No banner_img', 0, 1),
(8, 'Benas', 'test@gmail.com', '$2b$10$Pn5IvMcHY/i1z4d1n2yT2u.PERSNrvMTqKJbTw8m4.r3ZuqhuDi4y', 'Uzpiso reactas ir nextjs nesamone sorry eima del formos pasikeitimo styling pamete gpt', 'assets/1766091726527-843163036-pizza.jpg', 'assets/1766091726525-553366196-1664370213839.jpg', 0, 1),
(11, 'eimaa', 'jkasdhb@jsakld.com', '$2b$10$fY9VeZm7J25840CbDSFzwu879AjTsu7QlyjamKUnAuzmGTUwDU1Um', 'No description', 'No profile_img', 'No banner_img', 0, 1),
(12, 'adminas', 'adminas@admin.con', '$2b$10$LT.Xb5lnfZMjHpsYHGMLCe3fXEk7C9hqYzoeLb3Stx.HPWm15KBfS', 'No description', 'No profile_img', 'No banner_img', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_followers`
--

CREATE TABLE `user_followers` (
  `user_id` int(11) NOT NULL,
  `follower_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_followers`
--

INSERT INTO `user_followers` (`user_id`, `follower_id`) VALUES
(8, 11),
(11, 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `comment_likes`
--
ALTER TABLE `comment_likes`
  ADD PRIMARY KEY (`comment_id`,`user_id`),
  ADD KEY `comment_likes_user_fk` (`user_id`);

--
-- Indexes for table `comment_replies`
--
ALTER TABLE `comment_replies`
  ADD PRIMARY KEY (`comment_id`,`reply_to_comment_id`),
  ADD KEY `reply_to_comment_id` (`reply_to_comment_id`);

--
-- Indexes for table `fonts`
--
ALTER TABLE `fonts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_type` (`post_type`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `post_images`
--
ALTER TABLE `post_images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `post_id` (`post_id`);

--
-- Indexes for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`post_id`,`user_id`),
  ADD KEY `post_likes_user_fk` (`user_id`);

--
-- Indexes for table `post_types`
--
ALTER TABLE `post_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profile_font` (`profile_font`);

--
-- Indexes for table `user_followers`
--
ALTER TABLE `user_followers`
  ADD PRIMARY KEY (`user_id`,`follower_id`),
  ADD KEY `follower_id` (`follower_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `fonts`
--
ALTER TABLE `fonts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `post_images`
--
ALTER TABLE `post_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `post_types`
--
ALTER TABLE `post_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comment_likes`
--
ALTER TABLE `comment_likes`
  ADD CONSTRAINT `comment_likes_comment_fk` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_likes_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comment_replies`
--
ALTER TABLE `comment_replies`
  ADD CONSTRAINT `comment_replies_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_replies_ibfk_2` FOREIGN KEY (`reply_to_comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`post_type`) REFERENCES `post_types` (`id`),
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_images`
--
ALTER TABLE `post_images`
  ADD CONSTRAINT `post_images_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD CONSTRAINT `post_likes_post_fk` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_likes_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`profile_font`) REFERENCES `fonts` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `user_followers`
--
ALTER TABLE `user_followers`
  ADD CONSTRAINT `user_followers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_followers_ibfk_2` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
