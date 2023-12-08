import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const {messages} = await request.json()
    console.log(messages)
    const response = await fetch(`${process.env.CHAT_URL}/post_example`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: messages }),
    })
    if (!response.ok) {
        return NextResponse.error()
    }

    return NextResponse.json(await response.json())
}
