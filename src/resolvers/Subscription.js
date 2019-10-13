const Subscription = {
  comment: {
    subscribe: (parent, { postId }, { prisma }, info) => {
      // Prisma -> Node -> Client (Graphql Playground)
      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: postId
              }
            }
          }
        },
        info
      )
    }
  },
  post: {
    subscribe: (parent, args, { prisma }, info) => {
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true
            }
          }
        },
        info
      )
    }
  }
}

export default Subscription
