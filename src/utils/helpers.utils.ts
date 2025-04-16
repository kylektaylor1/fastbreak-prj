import { nanoid } from 'nanoid';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function generateAppId() {
    return nanoid();
}

export function appCreatedAt() {
    return new Date();
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
