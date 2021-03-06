const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')


async function signup(parent, args, context, info) {
    
    const password = await bcrypt.hash(args.password, 10)
    
    const user = await context.prisma.user.create({ data: {...args, password } })

    const token = jwt.sign({ userId: user.id }, APP_SECRET)
 
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    // 1
    const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  
    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 3
    return {
      token,
      user,
    }
  }


async function postLink(parent, args, context, info) {
    const userId = context.userId

    return await context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: {id: userId } },
        }
    })
}

async function updateLink(parent, args, context, info){
    const id = +args.id;
    const userId  = context.userId
    console.log(userId)
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
    deleteLink,
    signup,
    login,
}