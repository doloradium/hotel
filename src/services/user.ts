import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { z, ZodSchema } from 'zod';

import noImage from '@/assets/noImage.svg';
import { Interface } from '@/interfaces';

import { S_PRIVATE_AXIOS, S_PUBLIC_AXIOS } from '../shared/axios';

export const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const makeRequest = async <T>(
    axiosInstance: AxiosInstance,
    method: 'get' | 'post' | 'delete' | 'put',
    path: string,
    scheme: ZodSchema<T>, 
    payloadOrQuery: any = null 
): Promise<{ success: boolean; data?: T; status?: number; message?: string } | null> => {
    try {
        let response;
        
        switch (method) {
            case 'post':
                response = await axiosInstance.post(path, payloadOrQuery);
                break;
            case 'put':
                response = await axiosInstance.put(path, payloadOrQuery);
                break;
            case 'delete':
                response = await axiosInstance.delete(path, { params: payloadOrQuery }) 
                break;
            case 'get':
            default:
                response = await axiosInstance.get(path, { params: payloadOrQuery });
        }

        const data = scheme.parse(response.data);
        return { success: true, data };
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            console.error(error.issues);
            return null;
        } else {
            toast.error(error.message)
            return { success: false, status: error.status, message: error.message };
        }
    }
};

const getRoomFeatures = (room: {
    is_noisecancelling: boolean;
    is_wifi: boolean;
    is_pc: boolean;
    is_breakfast: boolean;
    is_biometry_key: boolean;
    is_tv: boolean;
}) => {
    const features: string[] = [];

    if (room.is_noisecancelling) {
        features.push('noiseCancelling');
    }
    if (room.is_wifi) {
        features.push('wifi');
    }
    if (room.is_pc) {
        features.push('computer');
    }
    if (room.is_breakfast) {
        features.push('breakfast');
    }
    if (room.is_biometry_key) {
        features.push('bioKey');
    }
    if (room.is_tv) {
        features.push('tv');
    }

    return features;
};

export const login = async (payload: Interface.LoginPayload) => {
    const schema = z.object({
        access_token: z.string(),
        refresh_token: z.string(),
        token_type: z.string()
    })

    const result = await makeRequest(S_PUBLIC_AXIOS, 'post', '/api/v1/auth/login', schema, payload);

    if (result?.data) {
        localStorage.setItem('accessToken', result.data.access_token);
        localStorage.setItem('refreshToken', result.data.refresh_token);
    }

    return result;
};

export const refresh = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/admin/refresh`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`,
            },
            withCredentials: false
        });

        const scheme = z.object({
            access_token: z.string(),
            refresh_token: z.string(),
            token_type: z.literal("Bearer"),
        });

        const data = scheme.parse(response.data);

        return { success: true, data };
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            console.error(error.issues);
            return null;
        } else {
            return { success: false, status: error.status, message: error.message };
        }
    }
};


export const register = async (payload: Interface.RegisterPayload) => {
    const schema = z.object({
        message: z.string(),
        status_code: z.number(),
    })

    const result = await makeRequest(S_PUBLIC_AXIOS, 'post', '/api/v1/auth/register', schema, payload);

    return result;
};

export const getMe = async () => {
    const schema = z.object({
        id: z.number(),
        name: z.string(),
        surname: z.string(),
        birth_date: z.string(),
        email: z.string(),
        created_at: z.string()
    })

    const result = await makeRequest(S_PRIVATE_AXIOS, 'get', '/api/v1/user', schema);

    return result;
};

export const getRooms = async (params: Interface.RoomParams) => {
    const schema = z.array(
        z.object({
            id: z.number(),
            preview: z.string().nullable(),
            description: z.string().nullable(),
            room_count: z.number(),
            name: z.string(),
            count_of_people: z.number(),
            price: z.number(),
            rating: z.number(),
            is_noisecancelling: z.boolean().nullable(),
            is_wifi: z.boolean(),
            is_pc: z.boolean(),
            is_breakfast: z.boolean(),
            is_biometry_key: z.boolean(),
            is_tv: z.boolean(),
            features: z.array(z.string()).optional()
        })
    )

    const result = await makeRequest(S_PRIVATE_AXIOS, 'get', '/api/v1/rooms/list', schema, params);

    if (result && result.data && result.success) {
        const roomsWithFeatures = result.data.map(room => ({
            ...room,
            preview: room.preview ?? noImage,
            features: getRoomFeatures({
                is_biometry_key: room.is_biometry_key,
                is_noisecancelling: Boolean(room.is_noisecancelling),
                is_wifi: room.is_wifi,
                is_pc: room.is_pc,
                is_breakfast: room.is_breakfast,
                is_tv: room.is_tv,
            }),
        }));
        return { success: true, data: roomsWithFeatures };
    }

    return result;
};

export const getRoomData = async (room_id: number) => {
    const schema = z.object({
        id: z.number(),
        preview: z.string().nullable(),
        description: z.string().nullable(),
        room_count: z.number(),
        name: z.string(),
        count_of_people: z.number(),
        price: z.number(),
        rating: z.number(),
        is_noisecancelling: z.boolean().nullable(),
        is_wifi: z.boolean(),
        is_pc: z.boolean(),
        is_breakfast: z.boolean(),
        is_biometry_key: z.boolean(),
        is_tv: z.boolean(),
        features: z.array(z.string()).optional()
    });

    const result = await makeRequest(S_PRIVATE_AXIOS, 'get', '/api/v1/rooms/one', schema, { room_id });

    if (result && result.data && result.success) {
        const room = {
            ...result.data,
            preview: result.data.preview ?? noImage,
            features: getRoomFeatures({
                is_biometry_key: result.data.is_biometry_key,
                is_noisecancelling: Boolean(result.data.is_noisecancelling),
                is_wifi: result.data.is_wifi,
                is_pc: result.data.is_pc,
                is_breakfast: result.data.is_breakfast,
                is_tv: result.data.is_tv,
            }),
        };
        return { success: true, data: room };
    }

    return result;
};

export const getReviews = async (room_id: number) => {
    const schema = z.object({
        reviews: z.array(
            z.object({
                review_id: z.number(),
                text: z.string(),
                rating: z.number(),
                created_at: z.string(),
                user: z.object({
                    user_id: z.number(),
                    name: z.string()
                })
            })
        )
    })

    const result = await makeRequest(S_PRIVATE_AXIOS, 'get', '/api/v1/reviews/list', schema, {room_id});

    return result;
};

export const createReview = async (payload: Interface.ReviewProps) => {
    const schema = z.object({
        message: z.string(),
        status_code: z.number()
    })

    const result = await makeRequest(S_PRIVATE_AXIOS, 'post', '/api/v1/reviews/', schema, payload);

    return result;
};

export const bookRoom = async (payload: Interface.BookPayload) => {
    const schema = z.object({
        message: z.string(),
        status: z.string()
    })

    const result = await makeRequest(S_PRIVATE_AXIOS, 'post', '/api/v1/rooms/reservations', schema, payload);

    return result;
};

export const getBookedDates = async (room_id: number) => {
    const schema = z.array(
        z.object({
            start_date: z.string(),
            end_date: z.string()
        })
    )

    const result = await makeRequest(S_PRIVATE_AXIOS, 'get', '/api/v1/rooms/busy/dates', schema, {room_id});

    return result;
};

export const getReservations = async () => {
    const schema = z.array(
        z.object({
            id: z.number(),
            user_id: z.number(),
            room: z.object({
                id: z.number(),
                name: z.string(),
                description: z.string(),
                room_count: z.number(),
                count_of_people: z.number(),
                price: z.number(),
                rating: z.number(),
            }),
            start_date: z.string(),
            end_date: z.string(),
            count_nights: z.number(),
            price: z.number(),
        })
    )

    const result = await makeRequest(S_PRIVATE_AXIOS, 'get', '/api/v1/rooms/reservations', schema, {limit: 100, offset: 0});

    return result;
};

export const deleteReservation = async (reservation_id: number) => {
    const schema = z.object({}).nullable()

    const result = await makeRequest(S_PRIVATE_AXIOS, 'delete', '/api/v1/rooms/reservations', schema, { reservation_id });

    return result;
};

export const updateReservation = async (payload: {
    reservation_id: number;
    count_of_people: number;
    start_date: string;
    end_date: string;
}) => {
    const schema = z.object({
        message: z.string(),
        status: z.string()
    });

    const result = await makeRequest(S_PRIVATE_AXIOS, 'put', '/api/v1/rooms/reservations', schema, payload);

    return result;
};


