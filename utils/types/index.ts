export type USER_TYPE = {
    email?: string;
    name?: string;
    phone?: string;
    token?: string;
    plan?: string;
    starter?: string;
    id?: number;
    state?: string;
    city?: string;
    address?: string;
    type?: string;
    is_email_verified?: boolean;
    is_phone_verified?: boolean;
    plan_expiration_date?: string;
    pin?: string;
    wallet?: walletType;
};

type walletType = {
    amount?: string;
    id?: number;
};

export type COUPON_TYPE = {
    code?: string;
    driver?: string;
    amount?: string;
    created_at?: string;
    product?: string;
    station_address?: string;
    station_city?: string;
    station_name?: string;
    station_state?: string;
    status?: string;
    vehicle_name?: string;
    vehicle_number?: string;
    validated_by?: string;
};
