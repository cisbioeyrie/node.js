-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: curseyou
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` varchar(10) NOT NULL,
  `st_name` varchar(20) DEFAULT NULL,
  `pw` varchar(255) DEFAULT NULL,
  `courses_id` varchar(45) DEFAULT '1,2,3',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('s2020001','LI Yuen Man','fa','1,2,3'),('s2020002','WONG Yin Hang Marco','fa','1,2,3'),('s2020003','CHOI Pak Hong Erick','fa','1,2,3'),('s2020004','CHEUNG Ho Kai','thisisme',''),('s2020005','LIU Jinkun','fa','1,2'),('s2020006','SIMARJEET-SINGH','fa','1,3'),('s2020007','YIP Sze Man','fa','1,2,3'),('s2020008','JE Ho Wang','fa','1,2,3'),('s2020009','TANG Tsz Ho','fa','1,2,3'),('s2020010','LEUNG Pak Wai Ryan','fa','1,2,3'),('s2020011','WONG Hin Jun','fa','1,2,3'),('s2020012','CHUNG Shun Lok','fa','1,2,3'),('s2020013','TANG Audric Pak Hang','fa','1,2,3'),('s2020014','LEE Ho Yin','fa','1,2,3'),('s2020015','LING Tsz Wo','fa','1,2,3'),('s2020016','ZHOU Huipeng','fa','1,2,3'),('s2020017','CHEUNG Siu Fung','fa','1,2,3'),('s2020018','SHERAAZ-RAFIQ','fa','1,2,3'),('s2020019','LAM Man Wai','fa','1,2,3'),('s2020020','AU Wing Kin','fa','1,2,3'),('s2020021','MAK Tsz Fung','fa','1,2,3'),('s2020022','LEUNG Yui Chit','fa','1,2,3'),('s2020023','CHOI Chun Leuk','fa','1,2,3'),('s2020024','KONG Kin Chun','fa','1,2,3'),('s2020025','LEE Ho Ming','fa','1,2,3'),('s2020026','XING Yutong','fa','1,2,3'),('s2020027','HE Jingshen','fa','1,2,3'),('s2020028','CHAN Tsz Long','fa','1,2,3'),('s2020029','LIN Hon Chuen','fa','1,2,3'),('s2020030','NG Tai Fung','fa','1,2,3'),('s2020031','CHAN Chun Fung','fa','1,2,3'),('s2020032','LAU Wai Sum','fa','1,2,3'),('s2020033','FAN Cheuk Nam','fa','1,2,3'),('s2020034','WONG Chun Kit','fa','1,2,3'),('s2020035','FONG Siu Tung','fa','1,2,3'),('s2020036','YIP Shi Shing','fa','1,2,3'),('s2020037','XU Jiaying','fa','1,2,3'),('s2020038','XIE Qichen','fa','1,2,3'),('s2020039','LI Hongzhou','fa','1,2,3'),('s2020040','CAI Yide','fa','1,2,3'),('s2020041','YUEN Chun Ho','fa','1,2,3'),('s2020042','KWONG Tak Wai','fa','1,2,3'),('s2020043','CHAN Kam Ming','fa','1,2,3'),('s2020044','OUYANG Xiaolong','fa','1,2,3'),('s2020045','FUNG Kwan Tai','fa','1,2,3'),('s2020046','PANG Chu Man','fa','1,2,3'),('s2020047','FAN Ho Wang','fa','1,2,3'),('s2020048','CHAN Yuet Chi','fa','1,2,3'),('s2020049','HO Man Ho','fa','1,2,3'),('s2020050','CHONG Chi Ho','fa','1,2,3'),('s2020051','HOI Wai San','fa','1,2,3'),('s2020052','LAM Pui Chung','fa','1,2,3'),('s2020053','HO Tsz King','fa','1,2,3'),('s2020054','CHEUNG Chin Hang','fa','1,2,3'),('s2020055','LO Hon Chak','fa','1,2,3'),('s2020056','WONG Shuk Kwan','fa','1,2,3'),('s2020057','YAN Haochen','fa','1,2,3'),('s2020058','YEUNG Tak Hei','fa','1,2,3'),('s2020059','LEUNG Wing Shing','fa','3'),('s2020060','BHATT Arun Datt','fa','2,3');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-09 12:58:35
