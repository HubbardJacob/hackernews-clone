

async function feed(parent, args, context, info) {
    return context.prisma.link.findMany()
}

async function users(parent, args, context, info) {
    return context.prisma.user.findMany()
}

module.exports = {
    feed,
    users
}