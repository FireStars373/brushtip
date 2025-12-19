import express from "express";
import Database from "../database.js";
import verifyToken from "../authMiddleware.js";
import multer from "multer";
const mockVerification = async (image) => {
	const randomFloat = Math.random();
	return {aiPercentage: randomFloat}
} 
export default mockVerification;


