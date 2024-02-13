import axios from "axios"
import { API } from "./API";

// axios.interceptors.response.use(
//     (res: any) => res,
//     (err: any) => {
//        return err
//     }
// )



type userData = {
    email: string,
    phone: string,
    name: string
}


export const verifyEmail = async (data: any) =>
    await axios.post(`${API.apiBaseUrl}/auth/verify_login_email`, data,
        { headers: { 'Content-Type': 'application/json' } }).
        then(res => res.data).
        catch((err: any) => err.response.data);

export const LoginWithEmail = async (data: any) =>
    await axios.post(`${API.apiBaseUrl}/auth/login_with_email`, data,
        { headers: { 'Content-Type': 'application/json' } }).
        then(res => res.data).
        catch((err: any) => err.response.data);

export const verifyNumber = async (data: any) =>
    await axios.post(`${API.apiBaseUrl}/auth/verify_with_number`, data,
        { headers: { 'Content-Type': 'application/json' } }).
        then(res => res.data).
        catch((err: any) => err.response.data);

export const LoginWithNumber = async (data: any) =>
    await axios.post(`${API.apiBaseUrl}/auth/login_with_number`, data,
        { headers: { 'Content-Type': 'application/json' } }).
        then(res => res.data).
        catch((err: any) => err.response.data);

export const verifyUser = async (data: userData) =>
    await axios.post(`${API.apiBaseUrl}/auth/verify_user`, data,
        { headers: { 'Content-Type': 'application/json' } }).
        then(res => res.data).
        catch((err: any) => err.response.data);


export const saveNewUser = async (data: userData) =>
    await axios.post(`${API.apiBaseUrl}/auth/save_new_user`, data,
        { headers: { 'Content-Type': 'application/json' } }).
        then(res => res.data).
        catch((err: any) => err.response.data);

export const GoogleAuthAPI = async () =>
    await axios.get(`${API.staticBaseUrl}/auth/google/callback`,
        { headers: { 'Content-Type': 'application/json' } }).
        then(res => console.log(res.data)).
        catch((err: any) => console.log(err));


export const GoogleSuccessUserAPI = async () =>
    await axios.get(`${API.staticBaseUrl}/auth/login/success`,
        { headers: { 'Content-Type': 'application/json' } }).
        then(res => console.log(res.data)).
        catch((err: any) => console.log(err));        