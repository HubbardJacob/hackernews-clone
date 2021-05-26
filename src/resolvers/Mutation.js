

async function postLink(parent, args, context, info) {
    const newLink = await context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description
        }
    })
    return newLink
}

async function updateLink(parent, args, context, info){
    const id = +args.id;
    const updateLink = await context.prisma.link.update({
        where: {
            id: id
        },
        data: {
            url: args.url,
            description: args.description
        }
    })

    return updateLink
}

async function deleteLink(parent, args, context, info){
    const id = +args.id;
    const linkToRem = await context.prisma.link.delete({
        where: {
            id: id,
        }
    })
    
    return linkToRem
}


module.exports = {
    postLink,
    updateLink,
    deleteLink
}