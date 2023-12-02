import User from "@/models/user";
import dbConnect from "@/app/dbConnect";


export async function GET(req) {
    const id = req.nextUrl.pathname.split('/')[2]
    await dbConnect()
    //await User.deleteOne({address: id})
    let data = await User.findOne({address: id})
    return Response.json({data})
}

export async function PUT(req) {
    const id = req.nextUrl.pathname.split('/')[2]
    const data = await req.json()
    await dbConnect()
    let user = await User.findOne({address: id})
    if (user) {
        const _user = await User.updateOne({address: id}, {address: id, ...data, links: JSON.stringify(data.links)})
        return Response.json({ data: _user })
    }
    const _user = await User.create({address: id, ...data, links: JSON.stringify(data.links)})
    return Response.json({ data })

}
