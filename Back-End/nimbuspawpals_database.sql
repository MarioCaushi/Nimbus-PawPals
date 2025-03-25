-- MySQL dump 10.13  Distrib 9.1.0, for macos14 (arm64)
--
-- Host: localhost    Database: PawPalsDB
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Bill`
--

DROP TABLE IF EXISTS `Bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bill` (
  `BillID` int NOT NULL AUTO_INCREMENT,
  `TotalAmount` decimal(10,2) NOT NULL,
  `Date` datetime NOT NULL,
  `PaymentMethod` varchar(50) NOT NULL,
  `ClientID` int NOT NULL,
  PRIMARY KEY (`BillID`),
  UNIQUE KEY `Date` (`Date`),
  KEY `ClientID` (`ClientID`),
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`ClientID`) REFERENCES `Client` (`ClientID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bill`
--

LOCK TABLES `Bill` WRITE;
/*!40000 ALTER TABLE `Bill` DISABLE KEYS */;
INSERT INTO `Bill` VALUES (1,45.00,'2025-04-03 14:03:34','Credit Card',1),(2,35.50,'2025-04-04 15:47:55','Debit Card',2),(3,134.97,'2025-04-05 17:16:50','Cash',3),(4,159.98,'2025-04-06 17:55:55','Credit Card',6),(5,99.98,'2025-04-07 19:45:18','Credit Card',9),(6,94.98,'2025-04-01 16:10:25','Credit Card',11),(7,60.25,'2025-04-02 20:53:38','Debit Card',12),(8,110.00,'2025-04-08 12:26:32','Cash',13),(9,9.99,'2025-04-09 12:36:34','Cash',4),(10,54.98,'2025-04-10 14:16:32','Cash',8),(11,121.97,'2025-04-12 08:26:32','Cash',13);
/*!40000 ALTER TABLE `Bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ChargesFor`
--

DROP TABLE IF EXISTS `ChargesFor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChargesFor` (
  `ServiceID` int NOT NULL,
  `BillID` int NOT NULL,
  PRIMARY KEY (`ServiceID`,`BillID`),
  KEY `BillID` (`BillID`),
  CONSTRAINT `chargesfor_ibfk_1` FOREIGN KEY (`ServiceID`) REFERENCES `Service` (`ServiceID`),
  CONSTRAINT `chargesfor_ibfk_2` FOREIGN KEY (`BillID`) REFERENCES `Bill` (`BillID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChargesFor`
--

LOCK TABLES `ChargesFor` WRITE;
/*!40000 ALTER TABLE `ChargesFor` DISABLE KEYS */;
INSERT INTO `ChargesFor` VALUES (2,1),(3,1),(1,2),(5,2),(15,3),(11,4),(19,4),(3,5),(10,5),(18,6),(2,7),(7,7),(12,8),(16,8);
/*!40000 ALTER TABLE `ChargesFor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Client`
--

DROP TABLE IF EXISTS `Client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Client` (
  `ClientID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Birthday` date NOT NULL,
  `Email` varchar(200) NOT NULL,
  `ContactNumber` varchar(50) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `RegisterDate` datetime NOT NULL,
  `PreferredContact` varchar(50) NOT NULL,
  PRIMARY KEY (`ClientID`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `ContactNumber` (`ContactNumber`),
  UNIQUE KEY `RegisterDate` (`RegisterDate`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Client`
--

LOCK TABLES `Client` WRITE;
/*!40000 ALTER TABLE `Client` DISABLE KEYS */;
INSERT INTO `Client` VALUES (1,'Daniel','Moore','2000-03-12','danielmoore@gmail.com','+44 7201 654321','150 River Street London SW6 2YZ UK','2025-12-27 09:30:00','Phone'),(2,'Hannah','Walker','2004-09-08','hannahwalker@gmail.com','+44 7112 987654','78 Greenway Road Bristol BS3 1AB UK','2022-03-11 11:15:00','Email'),(3,'Ryan','Phillips','2005-12-25','ryanphillips@gmail.com','+44 7303 456789','24 Sunset Avenue Liverpool L6 3EF UK','2020-05-30 14:20:00','Email'),(4,'Emily','Harrison','1995-07-05','emilyharrison@gmail.com','+44 7404 789012','92 Pine Road Manchester M5 2AC UK','2023-08-17 16:45:00','Phone'),(5,'James','Foster','1999-11-22','jamesfoster@gmail.com','+44 7505 321654','47 Meadow Lane Glasgow G3 8XJ UK','2022-01-12 10:05:00','Email'),(6,'Olivia','Reed','1994-02-17','oliviareed@gmail.com','+44 7606 654789','11 Orchard Street Edinburgh EH2 4GH UK','2024-09-25 12:40:00','Email'),(7,'Nathan','Cooper','2002-06-28','nathancooper@gmail.com','+44 7707 890123','34 Birch Avenue Cardiff CF11 9AD UK','2021-10-19 15:30:00','Phone'),(8,'Sophia','Morgan','1996-10-10','sophiamorgan@gmail.com','+44 7808 567890','56 Willow Close Leeds LS3 7LP UK','2022-02-22 08:55:00','Email'),(9,'William','Taylor','1991-04-18','williamtaylor@gmail.com','+44 7909 432109','83 Oak Drive Sheffield S10 2CD UK','2023-05-14 13:25:00','Phone'),(10,'Grace','Lewis','1997-08-30','gracelewis@gmail.com','+44 7010 876543','29 Maple Street Newcastle NE1 5GF UK','2021-11-03 09:40:00','Email'),(11,'Thomas','Wilson','1989-01-15','thomaswilson@gmail.com','+44 7111 234567','62 Elm Avenue Birmingham B5 4EH UK','2022-07-21 14:10:00','Phone'),(12,'Isabella','Baker','2001-05-27','isabellabaker@gmail.com','+44 7212 345678','17 Cedar Lane Oxford OX1 3DF UK','2024-02-09 11:50:00','Email'),(13,'Alexander','Carter','1993-12-04','alexandercarter@gmail.com','+44 7313 456789','42 Beech Road Cambridge CB2 1QP UK','2023-06-28 16:05:00','Phone'),(14,'Mock','Client','1993-12-04','mockclient@gmail.com','+44 1111 222222','diku','2025-06-28 11:15:11','asgje');
/*!40000 ALTER TABLE `Client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Doctor`
--

DROP TABLE IF EXISTS `Doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Doctor` (
  `DoctorID` int NOT NULL AUTO_INCREMENT,
  `PersonalID` int NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Birthday` date NOT NULL,
  `Email` varchar(200) NOT NULL,
  `ContactNumber` varchar(50) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `HireDate` datetime NOT NULL,
  `Specialty` varchar(100) NOT NULL,
  `Qualifications` text NOT NULL,
  `SalaryID` int NOT NULL,
  PRIMARY KEY (`DoctorID`),
  UNIQUE KEY `PersonalID` (`PersonalID`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `ContactNumber` (`ContactNumber`),
  UNIQUE KEY `HireDate` (`HireDate`),
  KEY `SalaryID` (`SalaryID`),
  CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`SalaryID`) REFERENCES `Salary` (`SalaryID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Doctor`
--

LOCK TABLES `Doctor` WRITE;
/*!40000 ALTER TABLE `Doctor` DISABLE KEYS */;
INSERT INTO `Doctor` VALUES (1,30001,'Ethan','Hunt','2000-07-14','ethanhunt@petclinic.com','+44 7804 678901','14 Church Lane Bristol BS1 5HG UK','2022-04-01 09:10:21','General Veterinary','Doctor of Veterinary Medicine (DVM) - University of Edinburgh',3),(2,30002,'Sophia','Miller','1989-05-22','sophiamiller@petclinic.com','+44 7905 789012','67 Park Road Glasgow G2 8JT UK','2022-04-01 10:23:21','General Veterinary','Doctor of Veterinary Medicine (DVM) - Royal Veterinary College, London',3),(3,30003,'Liam','Clark','1990-12-01','liamclark@petclinic.com','+44 7306 890123','32 Victoria Street Cardiff CF10 1AD UK','2022-04-01 11:00:59','Surgery','Diplomate of the European College of Veterinary Surgeons (DipECVS) - University of Bristol',4),(4,30004,'Olivia','Taylor','1993-03-18','oliviatayler@petclinic.com','+44 7407 901234','89 King’s Avenue Leeds LS2 7AP UK','2022-04-01 13:22:22','Surgery','Diplomate of the European College of Veterinary Surgeons (DipECVS) - University of Glasgow',4),(5,30005,'MockDoctor1','Fake','1992-06-25','mockdoctor1@petclinic.com','+1110002222','Fake Doctor Address 1','2023-06-10 09:32:11','FakeSpecialty1','Fake Qualifications 1',3),(6,30006,'MockDoctor2','Fake','1994-08-10','mockdoctor2@petclinic.com','+2220003333','Fake Doctor Address 2','2023-06-10 12:45:37','FakeSpecialty2','Fake Qualifications 2',3);
/*!40000 ALTER TABLE `Doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Feedback`
--

DROP TABLE IF EXISTS `Feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Feedback` (
  `FeedbackID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `UserEmail` varchar(200) NOT NULL,
  `Comment` text NOT NULL,
  `Date` datetime NOT NULL,
  PRIMARY KEY (`FeedbackID`),
  UNIQUE KEY `Date` (`Date`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Feedback`
--

LOCK TABLES `Feedback` WRITE;
/*!40000 ALTER TABLE `Feedback` DISABLE KEYS */;
INSERT INTO `Feedback` VALUES (1,'Daniel','Moore','danielmoore@gmail.com','Great service, very professional and quick response. Highly recommend!','2025-12-27 09:30:00'),(2,'Hannah','Walker','hannahwalker@gmail.com','The website was easy to navigate and the support team was extremely helpful.','2022-03-11 11:15:00'),(3,'Ryan','Phillips','ryanphillips@gmail.com','Very satisfied with the product quality. Will definitely purchase again.','2025-05-30 14:20:00'),(4,'Mock','User','mockuser@example.com','This is a mock feedback comment for testing purposes.','2025-01-15 10:00:00'),(5,'John','Smith','johnsmith@gmail.com','The customer service was helpful, but the delivery took longer than expected.','2023-11-20 14:45:00'),(6,'Olivia','Johnson','oliviajohnson@gmail.com','Good experience overall, but I would appreciate more detailed product descriptions.','2024-08-18 16:00:00');
/*!40000 ALTER TABLE `Feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Groomer`
--

DROP TABLE IF EXISTS `Groomer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Groomer` (
  `GroomerID` int NOT NULL AUTO_INCREMENT,
  `PersonalID` int NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Birthday` date NOT NULL,
  `Email` varchar(200) NOT NULL,
  `ContactNumber` varchar(50) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `HireDate` datetime NOT NULL,
  `SalaryID` int NOT NULL,
  PRIMARY KEY (`GroomerID`),
  UNIQUE KEY `PersonalID` (`PersonalID`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `ContactNumber` (`ContactNumber`),
  UNIQUE KEY `HireDate` (`HireDate`),
  KEY `SalaryID` (`SalaryID`),
  CONSTRAINT `groomer_ibfk_1` FOREIGN KEY (`SalaryID`) REFERENCES `Salary` (`SalaryID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Groomer`
--

LOCK TABLES `Groomer` WRITE;
/*!40000 ALTER TABLE `Groomer` DISABLE KEYS */;
INSERT INTO `Groomer` VALUES (1,20001,'Alice','Smith','1995-06-10','alicesmith@petclinic.com','+44 7400 654321','45 Maple Avenue Manchester M1 2AB UK','2022-02-15 08:13:48',2),(2,20002,'Bob','Johnson','1994-08-22','bobjohnson@petclinic.com','+44 7501 987654','78 Elm Road Birmingham B2 3CD UK','2022-02-15 10:34:52',2),(3,20003,'Charlie','Brown','1993-09-10','charliebrown@petclinic.com','+44 7703 567890','12 Oak Crescent Liverpool L4 5EF UK','2022-02-15 16:12:03',2),(4,20004,'Daisy','White','1996-11-12','daisywhite@petclinic.com','+44 7602 345678','56 Willow Close Edinburgh EH3 6GH UK','2022-02-15 16:43:23',2),(5,20005,'MockGroomer1','Fake','1990-01-15','mockgroomer1@petclinic.com','+1112223333','Fake Groomer Address 1','2023-05-01 09:23:59',2),(6,20006,'MockGroomer2','Fake','1991-03-20','mockgroomer2@petclinic.com','+2223334444','Fake Groomer Address 2','2023-05-01 08:41:12',2);
/*!40000 ALTER TABLE `Groomer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IsIncludedIn`
--

DROP TABLE IF EXISTS `IsIncludedIn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IsIncludedIn` (
  `NoItemsBought` int NOT NULL,
  `BillID` int NOT NULL,
  `ProductID` int NOT NULL,
  PRIMARY KEY (`BillID`,`ProductID`),
  KEY `ProductID` (`ProductID`),
  CONSTRAINT `isincludedin_ibfk_1` FOREIGN KEY (`BillID`) REFERENCES `Bill` (`BillID`),
  CONSTRAINT `isincludedin_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IsIncludedIn`
--

LOCK TABLES `IsIncludedIn` WRITE;
/*!40000 ALTER TABLE `IsIncludedIn` DISABLE KEYS */;
INSERT INTO `IsIncludedIn` VALUES (1,2,3),(2,3,1),(1,4,21),(1,4,34),(2,5,34),(1,6,7),(1,6,25),(1,9,8),(1,10,2),(1,10,3),(2,11,43),(2,11,44);
/*!40000 ALTER TABLE `IsIncludedIn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Manager`
--

DROP TABLE IF EXISTS `Manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Manager` (
  `ManagerID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Birthday` date NOT NULL,
  `Email` varchar(200) NOT NULL,
  `ContactNumber` varchar(50) NOT NULL,
  `PersonalID` int NOT NULL,
  `HireDate` datetime NOT NULL,
  `Address` varchar(255) NOT NULL,
  `SalaryID` int NOT NULL,
  PRIMARY KEY (`ManagerID`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `ContactNumber` (`ContactNumber`),
  UNIQUE KEY `PersonalID` (`PersonalID`),
  UNIQUE KEY `HireDate` (`HireDate`),
  KEY `SalaryID` (`SalaryID`),
  CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`SalaryID`) REFERENCES `Salary` (`SalaryID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Manager`
--

LOCK TABLES `Manager` WRITE;
/*!40000 ALTER TABLE `Manager` DISABLE KEYS */;
INSERT INTO `Manager` VALUES (7,'Leona','Strei','1985-04-15','leonastrei@petclinic.com','+44 7300 123456',10010,'2022-01-10 09:00:00','23 High Street London SW1A 1AA UK',1),(8,'MockManager1','Fake','1990-02-20','mockmanager1@petclinic.com','+1111111111',10011,'2023-03-12 09:00:01','Fake Address 1',1),(9,'MockManager2','Fake','1992-05-30','mockmanager2@petclinic.com','+2222222222',10012,'2023-03-12 13:21:03','Fake Address 2',1);
/*!40000 ALTER TABLE `Manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MedicalChart`
--

DROP TABLE IF EXISTS `MedicalChart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MedicalChart` (
  `MedicalChartID` int NOT NULL AUTO_INCREMENT,
  `Description` text NOT NULL,
  `Date` datetime NOT NULL,
  `PetID` int NOT NULL,
  PRIMARY KEY (`MedicalChartID`),
  UNIQUE KEY `Date` (`Date`),
  KEY `PetID` (`PetID`),
  CONSTRAINT `medicalchart_ibfk_1` FOREIGN KEY (`PetID`) REFERENCES `Pet` (`PetID`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MedicalChart`
--

LOCK TABLES `MedicalChart` WRITE;
/*!40000 ALTER TABLE `MedicalChart` DISABLE KEYS */;
INSERT INTO `MedicalChart` VALUES (1,'Routine check-up and vaccinations.','2020-01-15 09:32:47',1),(2,'Routine check-up and vaccinations.','2021-05-18 14:25:09',1),(3,'Routine check-up and vaccinations.','2022-09-30 10:17:33',1),(4,'Routine check-up and vaccinations.','2021-03-20 11:45:22',2),(5,'Routine check-up and vaccinations.','2022-11-12 15:38:54',2),(6,'Dental cleaning and minor extractions.','2019-02-10 13:42:15',3),(7,'Comprehensive blood work panel, diagnosed with early kidney disease. Prescribed special diet and medication regimen.','2022-08-17 08:23:41',3),(8,'Routine check-up and vaccinations.','2023-07-22 16:57:03',3),(9,'Follow-up on kidney disease and dental health. Blood work shows stable kidney function with prescribed diet. Dental check-up indicates minor plaque buildup; scheduled cleaning in six months.','2024-03-10 10:36:58',3),(10,'Anxiety medication prescribed.','2021-06-25 14:52:18',4),(11,'Routine check-up and vaccinations.','2022-04-30 11:19:37',4),(12,'Joint supplements started for arthritis.','2021-02-10 09:47:26',5),(13,'Advanced arthritis assessment. Increased pain medication dosage and recommended hydrotherapy sessions twice weekly. X-rays show significant joint deterioration in hind legs.','2023-09-18 13:28:45',5),(14,'Routine check-up and vaccinations.','2024-05-21 15:39:12',5),(15,'Routine check-up and vaccinations.','2025-03-20 10:08:34',5),(16,'Feather plucking consultation and vitamin therapy.','2022-02-05 09:15:53',6),(17,'Routine check-up and vaccinations.','2023-04-17 14:43:29',6),(18,'Routine check-up and vaccinations.','2021-09-10 11:34:07',7),(19,'Routine check-up and vaccinations.','2024-04-05 16:21:48',7),(20,'Changed bedding material to hypoallergenic type.','2023-03-05 10:42:31',8),(21,'Routine check-up and vaccinations.','2024-06-18 15:27:09',8),(22,'Teeth trimming procedure.','2023-03-07 13:19:46',9),(23,'Routine check-up and vaccinations.','2024-08-22 09:56:22',9),(24,'Teeth trimming procedure. Noted slight overgrowth on left incisors, recommended more frequent checks.','2025-01-15 11:38:17',9),(25,'Routine check-up, no issues detected.','2023-03-08 14:05:39',10),(26,'Vision assessment, special diet recommended.','2023-03-10 10:31:24',11),(27,'Comprehensive eye examination. Progressive cataracts detected in both eyes. Started eye drops.','2024-05-20 15:49:03',11),(28,'Routine check-up and vaccinations.','2024-09-15 13:22:51',11),(29,'Follow-up eye treatment. Cataracts stabilized but not improving. Adjusted medication and continued specialized diet with added supplements.','2025-02-10 11:13:48',11),(30,'Allergy test for sunflower seeds.','2024-03-12 09:37:26',12),(31,'Routine check-up and vaccinations.','2024-10-05 14:51:33',12),(32,'Behavioral therapy for separation anxiety.','2020-09-10 13:42:19',13),(33,'Routine check-up and vaccinations.','2022-03-25 10:29:57',13),(34,'Hearing test performed, training tips given.','2021-11-15 15:18:46',14),(35,'Routine check-up and vaccinations.','2022-06-30 09:53:41',14),(36,'Routine check-up and vaccinations.','2023-12-12 14:07:25',14),(37,'Routine check-up and vaccinations.','2020-07-10 11:23:37',15),(38,'Routine check-up and vaccinations.','2024-01-30 16:09:52',15),(39,'Routine check-up and vaccinations.','2021-04-15 09:45:28',16),(40,'Routine check-up and vaccinations.','2024-03-28 13:34:16',16),(41,'Chronic respiratory treatment started.','2022-06-20 15:27:39',17),(42,'Respiratory reassessment. Nebulizer treatments increased to twice daily. Air purifier recommended for home environment. Antibiotic course prescribed for secondary infection.','2023-08-05 10:51:04',17),(43,'Follow-up on chronic respiratory condition. Symptoms improved with the current regimen. Continued medication at current dosage. Recommended seasonal allergen avoidance protocol.','2024-02-18 14:13:47',17),(44,'Routine check-up and vaccinations.','2023-12-10 11:36:29',17),(45,'Humidity control device recommended.','2022-02-20 09:41:23',18),(46,'Routine check-up blood tests, cultures, X-ray to check for other diseases. No issues detected','2023-04-15 14:17:52',18),(47,'Routine check-up blood tests, cultures, X-ray to check for other diseases. No issues detected','2024-07-22 11:53:38',18),(48,'Hoof trimming and maintenance.','2022-02-01 13:26:47',19),(49,'Annual vaccination. Administered tetanus toxoid, Eastern and Western Equine Encephalomyelitis, West Nile Virus, and rabies vaccines.','2022-05-15 10:39:15',19),(50,'Routine check-up and vaccinations.','2023-06-10 15:48:31',19),(51,'Routine check-up and vaccinations.','2024-06-08 09:24:56',19),(52,'Urinary tract infection treatment.','2023-09-15 14:32:08',20),(53,'Routine check-up and vaccinations.','2024-02-28 11:17:43',20),(54,'Hip dysplasia therapy started.','2022-06-01 09:28:14',21),(55,'Routine check-up and vaccinations.','2023-05-20 15:43:26',21),(56,'Routine check-up and vaccinations.','2021-01-20 13:05:51',22),(57,'Routine check-up and vaccinations.','2022-06-30 10:37:19',22),(58,'Routine check-up and vaccinations.','2024-02-25 14:59:43',22),(59,'Routine check-up and vaccinations.','2023-08-10 11:23:35',23),(60,'Dermatological examination revealed multiple hot spots and fungal infection on back and underbelly. Prescribed medicated shampoo, oral antifungal medication, and cone to prevent scratching.','2024-01-15 16:14:08',23),(61,'Routine check-up and vaccinations.','2024-09-05 09:46:27',23),(62,'Routine check-up, weight stable, heart and lungs clear, coat in good condition. No issues detected.','2021-08-12 13:34:52',24),(63,'Routine check-up and vaccinations.','2022-10-18 10:18:39',24),(64,'Routine check-up and vaccinations.','2024-04-30 15:29:17',24);
/*!40000 ALTER TABLE `MedicalChart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pet`
--

DROP TABLE IF EXISTS `Pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pet` (
  `PetID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Birthday` date NOT NULL,
  `Species` varchar(50) NOT NULL,
  `Gender` varchar(50) NOT NULL,
  `Weight` decimal(5,2) NOT NULL,
  `AllergyInfo` text,
  `SpecialNeed` text,
  `Breed` varchar(50) NOT NULL,
  `Color` varchar(50) NOT NULL,
  `Castrated` tinyint(1) NOT NULL,
  `HealthStatus` int NOT NULL,
  `RegisterDate` datetime NOT NULL,
  `ClientID` int NOT NULL,
  PRIMARY KEY (`PetID`),
  UNIQUE KEY `RegisterDate` (`RegisterDate`),
  KEY `ClientID` (`ClientID`),
  CONSTRAINT `pet_ibfk_1` FOREIGN KEY (`ClientID`) REFERENCES `Client` (`ClientID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pet`
--

LOCK TABLES `Pet` WRITE;
/*!40000 ALTER TABLE `Pet` DISABLE KEYS */;
INSERT INTO `Pet` VALUES (1,'Whiskers','2019-05-15','Cat','Male',4.50,'None','Sensitive stomach','Domestic Shorthair','Orange Tabby',1,8,'2020-01-10 09:30:00',1),(2,'Mittens','2020-02-20','Cat','Female',3.80,'Chicken','None','Maine Coon','Gray',1,10,'2020-03-15 14:45:00',1),(3,'Shadow','2018-11-12','Cat','Male',5.20,'None','Dental issues','Siamese','Cream',1,9,'2019-01-05 10:15:00',1),(4,'Luna','2021-03-30','Cat','Female',3.50,'None','Anxiety during storms','Bengal','Spotted Brown',1,10,'2021-06-20 11:00:00',2),(5,'Max','2019-08-14','Dog','Male',28.40,'Beef','Arthritis','Golden Retriever','Golden',1,7,'2020-01-12 15:30:00',2),(6,'Tweety','2022-01-05','Bird','Male',0.10,'None','Feather plucking','Canary','Yellow',0,10,'2022-02-10 13:20:00',3),(7,'Polly','2021-07-22','Bird','Female',0.35,'None','None','Parrot','Green',0,10,'2021-09-05 10:45:00',3),(8,'Tiny','2023-02-18','Hamster','Male',0.08,'None','Needs special bedding','Syrian','Golden',0,9,'2023-03-01 16:15:00',5),(9,'Peanut','2023-02-20','Hamster','Female',0.07,'None','Dental overgrowth','Dwarf','Gray',0,9,'2023-03-02 16:20:00',5),(10,'Nibbles','2023-01-15','Hamster','Male',0.09,'None','None','Roborovski','White',0,9,'2023-03-03 16:25:00',5),(11,'Coco','2023-02-10','Hamster','Female',0.08,'None','Vision issues','Chinese','Brown',0,8,'2023-03-04 16:30:00',5),(12,'Hazel','2023-03-01','Hamster','Female',0.06,'Sunflower seeds','None','Winter White','Cream',0,10,'2023-03-05 16:35:00',5),(13,'Buddy','2018-06-10','Dog','Male',32.50,'Chicken','Separation anxiety','Labrador Retriever','Black',1,10,'2018-08-15 14:00:00',6),(14,'Daisy','2020-09-22','Dog','Female',8.30,'None','Hearing impaired','Dachshund','Tan',1,10,'2020-11-10 09:15:00',6),(15,'Oliver','2020-04-15','Cat','Male',5.00,'Milk','None','Domestic Longhair','Black',1,10,'2020-06-20 10:30:00',9),(16,'Lucy','2021-02-28','Cat','Female',3.70,'Fish','None','Russian Blue','Gray',1,9,'2021-04-10 13:45:00',9),(17,'Kiwi','2022-05-10','Bird','Female',0.40,'None','Chronic respiratory issues','Budgerigar','Blue',0,6,'2022-06-15 11:20:00',9),(18,'Sly','2019-10-05','Snake','Male',2.30,'None','Requires humidity control','Corn Snake','Red and Orange',0,10,'2020-02-18 15:10:00',10),(19,'Mocha','2021-08-12','Cow','Female',180.50,'Certain grasses','Hoof maintenance','Miniature Highland','Red',0,8,'2022-01-15 09:00:00',11),(20,'Leo','2020-07-30','Cat','Male',4.80,'Dairy','None','Domestic Shorthair','White',1,9,'2020-09-10 10:00:00',12),(21,'Charlie','2019-03-12','Dog','Male',18.20,'None','Hip dysplasia','Beagle','Tricolor',1,7,'2019-05-20 14:30:00',13),(22,'Bella','2020-11-05','Dog','Female',25.70,'None','None','Border Collie','Black and White',1,9,'2021-01-15 11:45:00',13),(23,'Simba','2021-06-18','Cat','Male',4.20,'None','None','Domestic Shorthair','Orange',1,10,'2021-08-05 09:30:00',13),(24,'Nala','2021-06-20','Cat','Female',3.90,'Chicken','None','Domestic Shorthair','Calico',1,9,'2021-08-06 10:45:00',13);
/*!40000 ALTER TABLE `Pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Category` varchar(50) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Description` text,
  `ImageURL` varchar(1000) DEFAULT NULL,
  `AnimalType` varchar(50) NOT NULL,
  `DateAdded` datetime NOT NULL,
  PRIMARY KEY (`ProductID`),
  UNIQUE KEY `DateAdded` (`DateAdded`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (1,'Premium Cat Kibble','Nutritional Supplements & Food',10.99,'High-protein grain-free kibble designed for indoor cats','https://kitcat.es/cdn/shop/products/CREATIVEPHOTO-02_1000x1000.jpg?v=1663175431','Cat','2025-04-01 08:32:50'),(2,'Interactive Laser Toy','Pet Accessories',14.99,'Motion-activated laser toy to keep cats entertained and active','https://m.media-amazon.com/images/I/71lkxJZ5R2L._AC_SL1500_.jpg','Cat','2025-04-01 08:43:58'),(3,'Plush Cat Bed','Pet Accessories',39.99,'Self-warming plush bed with raised edges for security and comfort','https://ae01.alicdn.com/kf/S778d4c03bf584190af0304629e07768fw.jpg_960x960.jpg','Cat','2025-04-01 05:35:24'),(4,'Cat Dental Treats','Prescription Medications',12.49,'Crunchy treats designed to reduce tartar and freshen breath','https://assets.sainsburys-groceries.co.uk/gol/7745364/1/640x640.jpg','Cat','2025-04-01 08:51:14'),(5,'Catnip-Infused Scratching Post','Pet Accessories',24.99,'Sisal rope scratching post with integrated catnip compartments','https://i.ebayimg.com/images/g/BvcAAOSw33Vi4~fq/s-l400.jpg','Cat','2025-04-01 10:05:51'),(6,'Senior Dog Formula','Nutritional Supplements & Food',12.99,'Complete nutrition for senior dogs with added joint support','https://i.ebayimg.com/thumbs/images/g/lNAAAOSwCFdnYbjf/s-l1200.jpg','Dog','2025-04-01 11:49:51'),(7,'Orthopedic Dog Bed','Pet Accessories',59.99,'Memory foam bed providing joint relief for older dogs','https://i.ebayimg.com/images/g/h~oAAOSwYUdmOKCl/s-l1200.jpg','Dog','2025-04-01 11:56:37'),(8,'Durable Chew Toy Set','Pet Accessories',9.99,'Set of three reinforced rubber toys for aggressive chewers','https://m.media-amazon.com/images/I/71pQZNQvFsL.jpg','Dog','2025-04-01 14:12:31'),(9,'Dog Training Treats','Nutritional Supplements & Food',8.99,'Small, low-calorie treats perfect for training sessions','https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTjv3QVHOr0DK-47vLk8YFnnjz8SckQVlEKf-UWtm--oo7x-qx_','Dog','2025-04-01 15:02:02'),(10,'Reflective Dog Leash','Pet Accessories',9.99,'Durable 6-foot leash with reflective threading for night walks','https://m.media-amazon.com/images/I/71k1mki85VL._AC_UF350,350_QL80_.jpg','Dog','2025-04-02 05:40:01'),(11,'Premium Seed Mix','Nutritional Supplements & Food',14.99,'Blend of seeds, nuts, and dried fruits for small to medium birds','https://www.aquanatureonline.com/wp-content/uploads/2021/08/Premium-Seeds-1-300x300.png','Bird','2025-04-02 05:44:05'),(12,'Bird Cage Playground','Pet Accessories',49.99,'Multi-level playground with ladders, perches, and interactive toys','https://m.media-amazon.com/images/I/71fS1FXRmGL._AC_SY200_QL15_.jpg','Bird','2025-04-02 16:10:25'),(13,'Cuttlebone Pack','Nutritional Supplements & Food',7.99,'Natural calcium source to support bird beak and bone health','https://images-na.ssl-images-amazon.com/images/I/816r-Fol9HL._AC_UL495_SR435,495_.jpg','Bird','2025-04-02 20:53:38'),(14,'Avian Vitamin Drops','Nutritional Supplements & Food',8.99,'Liquid vitamin supplement added to drinking water for complete nutrition','https://images-eu.ssl-images-amazon.com/images/I/71DOpXQBCnL._AC_UL200_SR200,200_.jpg','Bird','2025-04-03 07:00:50'),(15,'Bird Bath House','Grooming Supplies',22.99,'Easy-attach bath house for cage mounting with clear viewing panels','https://img.kwcdn.com/product/fancy/70d52ebf-a822-4e36-b05c-8dfacb050116.jpg?imageMogr2/auto-orient|imageView2/2/w/800/q/70/format/webp','Bird','2025-04-03 07:28:07'),(16,'Hamster Exercise Wheel','Pet Accessories',15.99,'Silent spinner wheel designed for nighttime running','https://i.ebayimg.com/images/g/l-oAAOSwd9hkF7Tn/s-l1600.jpg','Hamster','2025-04-03 08:07:34'),(17,'Natural Timothy Hay','Nutritional Supplements & Food',8.99,'Premium timothy hay for nesting and foraging','https://i5.walmartimages.com/seo/Kaytee-Forti-Diet-All-Natural-Timothy-Hay-96-ounce_87f8c160-89a5-4aa4-a6cc-515c90e4f878.ef8912de23271c59b45516a6b842558c.jpeg','Hamster','2025-04-03 14:03:34'),(18,'Hamster Tunnel System','Pet Accessories',29.99,'Expandable plastic tunnel system with multiple connection points','https://m.media-amazon.com/images/I/61w7P5vNiUL._AC_UF894,1000_QL80_.jpg','Hamster','2025-04-03 15:47:55'),(19,'Hamster Hideaway House','Pet Accessories',12.99,'Wooden house providing security and chewing enrichment','https://s.catch.com.au/images/product/0210/210318/666391a776ec1385674559_w803h620.webp','Hamster','2025-04-03 19:38:47'),(20,'Heat Lamp Kit','Pet Accessories',32.99,'Complete heat lamp setup with thermostat control','https://m.media-amazon.com/images/I/71lQrZwOesL.jpg','Snake','2025-04-04 20:11:11'),(21,'Reptile Calcium Powder','Nutritional Supplements & Food',9.99,'Calcium supplement for dusting prey items','https://m.media-amazon.com/images/I/512IV7dM33L._AC_UF1000,1000_QL80_.jpg','Snake','2025-04-04 20:55:47'),(22,'Snake Hiding Cave','Pet Accessories',14.99,'Naturalistic hide mimicking rock formation for security','https://zoomed.com/wp-content/uploads/RC-32_Repti_Shelter_Alt.jpg','Snake','2025-04-05 08:03:23'),(23,'Reptile Substrate','Pet Accessories',15.99,'Premium cypress mulch substrate for proper humidity','https://pettex.co.uk/wp-content/uploads/2018/11/Beech-Bag-e1546873431909.jpg','Snake','2025-04-05 17:16:50'),(24,'Mini Highland Coat Conditioner','Grooming Supplies',24.99,'Specially formulated conditioner for long highland coats','https://www.groomers-online.com/images/groomers-signature-evening-primrose-oil-coat-conditioning-spray-p17612-13336_thumb.jpg','Miniature Highland Cow','2025-04-06 17:55:55'),(25,'Hoof Maintenance Kit','Grooming Supplies',35.99,'Complete kit for trimming and maintaining healthy hooves','https://agrivetstore.ie/wp-content/uploads/2021/05/Hoof-Care-Starter-Kit.jpg','Miniature Highland Cow','2025-04-06 19:45:18'),(26,'Mini Cow Feed Mix','Nutritional Supplements & Food',22.99,'Balanced nutrition formulated for miniature cattle breeds','https://images-eu.ssl-images-amazon.com/images/I/61o5P4MkgbL._AC_UL600_SR600,600_.jpg','Miniature Highland Cow','2025-04-07 06:29:25'),(27,'Highland Halter','Pet Accessories',19.99,'Adjustable halter designed for miniature highland cattle','https://m.media-amazon.com/images/I/316P6iP5U0L._AC_UF350,350_QL80_.jpg','Miniature Highland Cow','2025-04-07 08:32:55'),(28,'Broad Spectrum Antibiotic','Prescription Medications',24.99,'Veterinary-grade antibiotic for treating various bacterial infections','https://www.nuzyra.com/hcp/img/nuzyra-vial-and-tablets.png','All','2025-04-07 19:51:25'),(29,'Canine Joint Support','Nutritional Supplements & Food',25.99,'Advanced glucosamine and chondroitin formula for aging dogs','https://caninelifeco.co.uk/wp-content/uploads/2021/01/cls-ejs-120-single-bottle-v2-400px.png','Dog','2025-04-07 20:29:00'),(30,'Feline Hairball Relief','Prescription Medications',8.99,'Paste formula to help prevent and eliminate hairballs','https://m.media-amazon.com/images/I/51axcejxDOL._AC_UF894,1000_QL80_.jpg','Cat','2025-04-07 18:31:13'),(31,'All-Species Wound Spray','Prescription Medications',16.99,'Antiseptic spray safe for all animal types','https://i.ebayimg.com/images/g/NGMAAOSwPYpiqAlz/s-l225.jpg','All','2025-04-07 17:47:56'),(32,'Small Animal Probiotic','Nutritional Supplements & Food',14.99,'Digestive support for hamsters, guinea pigs, and other small pets','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaHW_Q4V3pPT2Niq3J5k94_ah7m9ccqbnyW4xkR43QcHkSbpoY','Hamster','2025-04-08 12:26:32'),(33,'Livestock Dewormer','Prescription Medications',14.99,'Safe and effective parasitic control for farm animals','https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTH36i2xQ3KfJZ1U-0U3Qh_QQFIQFfnHXP7YDTk3399ELoeKERg','Miniature Highland Cow','2025-04-08 15:01:18'),(34,'All-Purpose Pet First Aid Kit','Prescription Medications',29.99,'Complete first aid kit designed for all pet emergencies','https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTB15-S0587ByVrA35CnmuAR3jUohOsYopIyeI0NAH0J-CPzgz7','All','2025-04-08 16:24:50'),(35,'Veterinary-Grade Pain Reliever','Prescription Medications',18.99,'Non-steroidal anti-inflammatory for short-term pain management','https://vetsbest.com/cdn/shop/files/3165810126_main.png?v=1712335888&width=550','All','2025-04-09 16:56:31'),(36,'Professional Pet Clipper Set','Grooming Supplies',59.99,'Rechargeable clippers with multiple guide combs for all coat types','https://m.media-amazon.com/images/I/71iboo0TlsL.jpg','All','2025-04-09 17:42:17'),(37,'Deshedding Tool','Grooming Supplies',12.99,'Specialized brush that removes loose undercoat hair','https://m.media-amazon.com/images/I/61Zyw4N-VkL._AC_UL420_SR420,420_.jpg','Cat, Dog','2025-04-10 07:31:13'),(38,'Hypoallergenic Pet Shampoo','Grooming Supplies',18.99,'Gentle formula for pets with sensitive skin','https://m.media-amazon.com/images/I/715WhnA-tPL.jpg','All','2025-04-10 11:18:16'),(39,'Nail Trimming Kit','Grooming Supplies',14.99,'Professional-grade nail clippers with safety guard and file','https://m.media-amazon.com/images/I/61s7CKRUwTL._AC_UF894,1000_QL80_.jpg','Cat, Dog, Bird','2025-04-10 13:40:48'),(40,'Electronic Pet Door','Pet Accessories',149.99,'RFID-activated door that only opens for pets wearing the special collar tag','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRcox1IW6gwUhQePd7Mrouvmk200pUD2ao6Sc9Lu5EqavjH-XQg','Cat, Dog','2025-04-11 07:14:25'),(41,'Natural Flea & Tick Spray','Prescription Medications',19.99,'Plant-based formula that repels parasites without harsh chemicals','https://petstore.co.ke/wp-content/uploads/2025/01/Natural-Tick-Flea-spray.png','All','2025-04-11 10:26:29'),(42,'Pet Water Fountain','Pet Accessories',44.99,'Circulating water fountain with replaceable carbon filters','https://m.media-amazon.com/images/I/718++2Ia+TL._AC_UF1000,1000_QL80_.jpg','All','2025-04-11 14:38:59'),(43,'Cat Hotel Stay','Pet Boarding',25.99,'Hotel stay for cats with cozy private rooms, scratching posts, and gourmet meals.','https://thisismeowness.com/media/IMG_01292.JPEG','Cat','2025-04-11 16:30:57'),(44,'Dog Hotel Stay','Pet Boarding',34.99,'Spacious rooms for dogs with daily exercise, play sessions, and grooming services.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmy3_x3TZmoDjIFwhhxq4XiyGF2ezPDeo2dlA2Evorj76rZQxvVAGciUeCZHRGJUTRHr0&usqp=CAU','Dog','2025-04-11 18:47:24'),(45,'Hamster Hotel Stay','Pet Boarding',10.99,'Comfortable and secure enclosures for hamsters with tunnels, wheels, and fresh bedding.','https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1136,h=867,fit=crop/ALpXv85qoMcQxoR7/img_1650-YD0BX4xrE0FVnPJQ.JPG','Hamster','2025-04-12 07:36:09'),(46,'Bird Hotel Stay','Pet Boarding',10.99,'Spacious cages with perches, toys, and nutritious meals for a relaxing stay.','https://5.imimg.com/data5/SELLER/Default/2023/11/359186660/CI/JF/XN/118870776/bc51-metal-decorative-bird-cage-250x250.jpg','Bird','2025-04-12 14:20:06');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Receptionist`
--

DROP TABLE IF EXISTS `Receptionist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Receptionist` (
  `ReceptionistID` int NOT NULL AUTO_INCREMENT,
  `PersonalID` int NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Birthday` date NOT NULL,
  `Email` varchar(200) NOT NULL,
  `ContactNumber` varchar(50) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `HireDate` datetime NOT NULL,
  `Qualification` varchar(100) NOT NULL,
  `SalaryID` int NOT NULL,
  PRIMARY KEY (`ReceptionistID`),
  UNIQUE KEY `PersonalID` (`PersonalID`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `ContactNumber` (`ContactNumber`),
  UNIQUE KEY `HireDate` (`HireDate`),
  KEY `SalaryID` (`SalaryID`),
  CONSTRAINT `receptionist_ibfk_1` FOREIGN KEY (`SalaryID`) REFERENCES `Salary` (`SalaryID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Receptionist`
--

LOCK TABLES `Receptionist` WRITE;
/*!40000 ALTER TABLE `Receptionist` DISABLE KEYS */;
INSERT INTO `Receptionist` VALUES (16,40001,'Emma','Davis','1991-02-10','emmadavis@petclinic.com','+44 7508 012345','89 King’s Avenue Leeds LS2 7AP UK','2022-05-01 09:00:00','NVQ Level 2/3 in Business and Administratio',5),(17,40002,'Michael','Wilson','1992-09-25','michaelwilson@petclinic.com','+44 7609 123450','21 Rosewood Crescent Newcastle upon Tyne NE1 4HY UK','2022-05-01 08:00:00','City & Guilds Level 2/3 Diploma in Reception and Administration Skills',5),(18,40003,'ReceptionistMock1','Fake','1993-04-15','mockreceptionist1@petclinic.com','+1110004444','Fake Reception Address 1','2023-07-10 08:00:00','Fake Qualification 1',5),(19,40004,'ReceptionistMock2','Fake','1994-06-20','mockreceptionist2@petclinic.com','+2220005555','Fake Reception Address 2','2023-07-10 09:00:00','Fake Qualification 2',5),(20,40005,'ReceptionistMock3','Fake','1995-08-25','mockreceptionist3@petclinic.com','+3330006666','Fake Reception Address 3','2023-07-10 10:00:00','Fake Qualification 3',5);
/*!40000 ALTER TABLE `Receptionist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Salary`
--

DROP TABLE IF EXISTS `Salary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Salary` (
  `SalaryID` int NOT NULL AUTO_INCREMENT,
  `BaseSalary` decimal(10,2) NOT NULL,
  `PayCycle` varchar(50) NOT NULL,
  `OvertimeRate` decimal(5,2) NOT NULL,
  PRIMARY KEY (`SalaryID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Salary`
--

LOCK TABLES `Salary` WRITE;
/*!40000 ALTER TABLE `Salary` DISABLE KEYS */;
INSERT INTO `Salary` VALUES (1,65000.00,'Monthly',1.50),(2,38000.00,'Bi-weekly',1.25),(3,95000.00,'Monthly',2.00),(4,110000.00,'Monthly',2.25),(5,35000.00,'Bi-weekly',1.25);
/*!40000 ALTER TABLE `Salary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service`
--

DROP TABLE IF EXISTS `Service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Service` (
  `ServiceID` int NOT NULL AUTO_INCREMENT,
  `ServiceType` varchar(50) NOT NULL,
  `ServiceName` varchar(100) NOT NULL,
  `Description` text,
  `Price` decimal(10,2) NOT NULL,
  `EstimatedDuration` int NOT NULL,
  PRIMARY KEY (`ServiceID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service`
--

LOCK TABLES `Service` WRITE;
/*!40000 ALTER TABLE `Service` DISABLE KEYS */;
INSERT INTO `Service` VALUES (1,'Grooming','Basic Bath & Brush','Shampoo, conditioner, blow dry, and brush out.',20.00,60),(2,'Grooming','Full Grooming Package','Bath, dry, brush, haircut, nail trim, ear cleaning, and anal gland expression.',35.00,90),(3,'Grooming','Nail Trim','Trimming of nails to appropriate length.',10.00,20),(4,'Grooming','De-shedding Treatment','Specialized treatment to reduce shedding.',25.00,60),(5,'Grooming','Ear Cleaning','Thorough cleaning of ears and ear canal.',15.00,20),(6,'Grooming','Paw Pad Treatment','Moisturizing treatment for dry or cracked paw pads.',15.00,30),(7,'Grooming','Flea & Tick Treatment Bath','Special shampoo treatment to eliminate fleas and ticks.',30.00,60),(8,'Grooming','Sanitary Trim','Trimming of fur in sanitary areas.',15.00,20),(9,'Surgery','Spay/Neuter','Surgical sterilization procedure.',50.00,60),(10,'Surgery','Dental Cleaning & Extraction','Cleaning teeth and removing damaged teeth under anesthesia.',50.00,60),(11,'Surgery','Foreign Body Removal','Surgical removal of ingested foreign objects.',75.00,60),(12,'General','Skin Allergy Testing','Comprehensive testing for skin allergies.',55.00,60),(13,'General','Dermatitis Treatment','Diagnosis and treatment of skin inflammation.',50.00,60),(14,'General','Digestive Disorder Consultation','Diagnosis and treatment planning for digestive issues.',50.00,60),(15,'Surgery','Cardiac Disease Management','Ongoing treatment and monitoring of heart conditions.',150.00,60),(16,'General','Annual Wellness Exam','Comprehensive health check including weight, vitals, and physical examination.',55.00,60),(17,'General','Vaccination - Core','Administration of core vaccines.',20.00,15),(18,'General','Vaccination - Non-Core','Administration of lifestyle-based vaccines.',35.00,15),(19,'General','Parasite Screening','Testing for internal and external parasites.',55.00,30);
/*!40000 ALTER TABLE `Service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Timetable`
--

DROP TABLE IF EXISTS `Timetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Timetable` (
  `AppointmentID` int NOT NULL AUTO_INCREMENT,
  `StartTime` datetime NOT NULL,
  `EndTime` datetime NOT NULL,
  `Description` text,
  `Status` varchar(50) NOT NULL,
  `PetID` int NOT NULL,
  `ServiceID` int NOT NULL,
  PRIMARY KEY (`AppointmentID`),
  KEY `PetID` (`PetID`),
  KEY `ServiceID` (`ServiceID`),
  CONSTRAINT `timetable_ibfk_1` FOREIGN KEY (`PetID`) REFERENCES `Pet` (`PetID`),
  CONSTRAINT `timetable_ibfk_2` FOREIGN KEY (`ServiceID`) REFERENCES `Service` (`ServiceID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Timetable`
--

LOCK TABLES `Timetable` WRITE;
/*!40000 ALTER TABLE `Timetable` DISABLE KEYS */;
INSERT INTO `Timetable` VALUES (1,'2025-04-05 09:00:00','2025-04-05 10:00:00','Regular grooming session for cat','Confirmed',1,1),(2,'2025-04-08 13:30:00','2025-04-08 14:30:00','Complete grooming with haircut','Confirmed',3,2),(3,'2025-04-12 11:00:00','2025-04-12 12:00:00','Heavy shedding season treatment','Confirmed',5,4),(4,'2025-04-18 10:00:00','2025-04-18 11:00:00','Preventative flea treatment','Confirmed',13,7),(5,'2025-04-10 09:00:00','2025-04-10 10:00:00','Routine spay procedure','Pending',2,9),(6,'2025-04-16 10:00:00','2025-04-16 11:00:00','Dental cleaning with possible extraction','Pending',4,10),(7,'2025-04-06 14:00:00','2025-04-06 15:00:00','Yearly check-up and health assessment','Confirmed',6,16),(8,'2025-04-09 15:30:00','2025-04-09 15:45:00','Annual core vaccinations','Confirmed',8,17),(9,'2025-04-14 11:30:00','2025-04-14 11:45:00','Lifestyle-specific vaccinations','Confirmed',9,18),(10,'2025-04-19 16:00:00','2025-04-19 16:30:00','Routine parasite screening','Pending',22,19);
/*!40000 ALTER TABLE `Timetable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAuth`
--

DROP TABLE IF EXISTS `UserAuth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserAuth` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` varchar(50) NOT NULL,
  `ManagerID` int DEFAULT NULL,
  `ClientID` int DEFAULT NULL,
  `GroomerID` int DEFAULT NULL,
  `DoctorID` int DEFAULT NULL,
  `ReceptionistID` int DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Username` (`Username`),
  KEY `ManagerID` (`ManagerID`),
  KEY `ClientID` (`ClientID`),
  KEY `GroomerID` (`GroomerID`),
  KEY `DoctorID` (`DoctorID`),
  KEY `ReceptionistID` (`ReceptionistID`),
  CONSTRAINT `userauth_ibfk_1` FOREIGN KEY (`ManagerID`) REFERENCES `Manager` (`ManagerID`),
  CONSTRAINT `userauth_ibfk_2` FOREIGN KEY (`ClientID`) REFERENCES `Client` (`ClientID`),
  CONSTRAINT `userauth_ibfk_3` FOREIGN KEY (`GroomerID`) REFERENCES `Groomer` (`GroomerID`),
  CONSTRAINT `userauth_ibfk_4` FOREIGN KEY (`DoctorID`) REFERENCES `Doctor` (`DoctorID`),
  CONSTRAINT `userauth_ibfk_5` FOREIGN KEY (`ReceptionistID`) REFERENCES `Receptionist` (`ReceptionistID`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAuth`
--

LOCK TABLES `UserAuth` WRITE;
/*!40000 ALTER TABLE `UserAuth` DISABLE KEYS */;
INSERT INTO `UserAuth` VALUES (166,'leona.strei','manager_1','Manager',7,NULL,NULL,NULL,NULL),(167,'manager.mock1','manager_2','Manager',8,NULL,NULL,NULL,NULL),(168,'manager.mock2','manager_3','Manager',9,NULL,NULL,NULL,NULL),(169,'alice.smith','groomer_1','Groomer',NULL,NULL,1,NULL,NULL),(170,'bob.johnson','groomer_2','Groomer',NULL,NULL,2,NULL,NULL),(171,'charlie.brown','groomer_3','Groomer',NULL,NULL,3,NULL,NULL),(172,'daisy.white','groomer_4','Groomer',NULL,NULL,4,NULL,NULL),(173,'groomer.mock1','groomer_5','Groomer',NULL,NULL,5,NULL,NULL),(174,'groomer.mock2','groomer_6','Groomer',NULL,NULL,6,NULL,NULL),(175,'ethan.hunt','doctor_1','Doctor',NULL,NULL,NULL,1,NULL),(176,'sophia.miller','doctor_2','Doctor',NULL,NULL,NULL,2,NULL),(177,'liam.clark','doctor_3','Doctor',NULL,NULL,NULL,3,NULL),(178,'olivia.taylor','doctor_4','Doctor',NULL,NULL,NULL,4,NULL),(179,'doctor.mock1','doctor_5','Doctor',NULL,NULL,NULL,5,NULL),(180,'doctor.mock2','doctor_6','Doctor',NULL,NULL,NULL,6,NULL),(181,'emma.davis','receptionist_1','Receptionist',NULL,NULL,NULL,NULL,16),(182,'michael.wilson','receptionist_2','Receptionist',NULL,NULL,NULL,NULL,17),(183,'receptionist.mock1','receptionist_3','Receptionist',NULL,NULL,NULL,NULL,18),(184,'receptionist.mock2','receptionist_4','Receptionist',NULL,NULL,NULL,NULL,19),(185,'receptionist.mock3','receptionist_5','Receptionist',NULL,NULL,NULL,NULL,20),(186,'daniel.moore','client_1','Client',NULL,1,NULL,NULL,NULL),(187,'hannah.walker','client_2','Client',NULL,2,NULL,NULL,NULL),(188,'ryan.phillips','client_3','Client',NULL,3,NULL,NULL,NULL),(189,'emily.harrison','client_4','Client',NULL,4,NULL,NULL,NULL),(190,'james.foster','client_5','Client',NULL,5,NULL,NULL,NULL),(191,'olivia.reed','client_6','Client',NULL,6,NULL,NULL,NULL),(192,'nathan.cooper','client_7','Client',NULL,7,NULL,NULL,NULL),(193,'sophia.morgan','client_8','Client',NULL,8,NULL,NULL,NULL),(194,'william.taylor','client_9','Client',NULL,9,NULL,NULL,NULL),(195,'grace.lewis','client_10','Client',NULL,10,NULL,NULL,NULL),(196,'thomas.wilson','client_11','Client',NULL,11,NULL,NULL,NULL),(197,'isabella.baker','client_12','Client',NULL,12,NULL,NULL,NULL),(198,'alexander.carter','client_13','Client',NULL,13,NULL,NULL,NULL);
/*!40000 ALTER TABLE `UserAuth` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-25  3:27:35
