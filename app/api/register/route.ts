import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        name,
        password,
        repeated_password
    } = body;
    console.log(password);
    console.log(repeated_password);

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        // Compare the password with the hashed password
        const match = await bcrypt.compare(repeated_password, hashedPassword);
        if (!match) {
            return NextResponse.json({ error: "Passwords doesn't match" }, { status: 400 });
        }
    } catch (error) {
        // Handle error
        throw new Error('Error comparing passwords');
    }

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
        }
    });

    return NextResponse.json(user);
}