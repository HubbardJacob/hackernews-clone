

async function feed(parent, args, context, info) {
    return context.prisma.link.findMany()
}

async function users(parent, args, context, info) {
    return context.prisma.user.findMany()
}

async function user(parent, args, context, info) {
    const id = +args.id
    return await context.prisma.user.findUnique({ 
        where: {
            id: id
        }
    })
}

module.exports = {
    feed,
    users,
    user
}