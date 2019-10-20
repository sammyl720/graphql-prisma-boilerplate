import hashPassword from '../utils/hashPassword'
import bcrypt from 'bcryptjs'
import jwtGenerate from '../utils/jwtGenerate'
import getUserId from '../utils/getUserId'
const Mutation = {
  createUser: async (parent, args, { prisma }, info) => {
    const password = await hashPassword(args.data.password, 10)
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    })
    return {
      user,
      token: jwtGenerate(user.id)
    }
  },
  loginUser: async (
    parent,
    { data: { email, password } },
    { prisma },
    info
  ) => {
    const user = await prisma.query.user({ where: { email: email } })
    if (!user) throw new Error('User not found')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Unable to login')

    return {
      user,
      token: jwtGenerate(user.id)
    }
  },
  deleteUser: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request)
    return prisma.mutation.deleteUser({ where: { id: userId } }, info)
  },
  updateUser: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request)
    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password, 10)
    }
    return prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: args.data
      },
      info
    )
  }
}

export default Mutation
