

// Generated by https://quicktype.io
interface Base {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface Chatpdf extends Base {
    name: string;
    key: string;
    userId: string;
    user: User;
}


export interface ChatpdfMsg extends Base {
    content: string;
    chatpdfId: string;
    chatpdf: Chatpdf;
    role: "user" | "system" | "assistant"
}

export interface User extends Base {
    id: string;
    username: string | null;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    password: string;
    photo: string;
    phone: string;
    Status: "active" | "inactive";
}