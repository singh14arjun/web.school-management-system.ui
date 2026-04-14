import client from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const loginUser = async (payload) => {
    const response = await client.post(API_ENDPOINTS.AUTH.LOGIN, payload);
    return response.data;
};

export const signupUser = async (payload) => {
    const response = await client.post(API_ENDPOINTS.AUTH.REGISTER, payload);
    return response.data;
};

export const createSchool = async (payload) => {
    const response = await client.post(API_ENDPOINTS.SCHOOL.CREATE, payload);
    return response.data;
};