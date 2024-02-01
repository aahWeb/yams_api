export const trimAll = (data: any) => {
    for (const key in data) {
        if (typeof data[key] === 'string')
        data[key] = data[key]?.trim() ?? '';
    }
    return data;
};

export const generateRandomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};