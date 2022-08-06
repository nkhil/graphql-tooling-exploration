import { builder } from '../builder';
import { Comment, Comments, Post, Posts, User, Users } from '../data';

export const userRef = builder.objectType(User, {
  name: 'User',
  fields: (t) => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    fullName: t.string({
      resolve: (user) => `${user.firstName} ${user.lastName}`,
    }),
    posts: t.field({
      type: [Post],
      resolve: (user) => [...Posts.values()].filter((post) => post.authorId === user.id),
    }),
    comments: t.field({
      type: [Comment],
      resolve: (user) => [...Comments.values()].filter((comment) => comment.authorId === user.id),
    }),
  }),
});

export const postRef = builder.objectType(Post, {
  name: 'Post',
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    content: t.exposeString('content'),
    author: t.field({
      type: User,
      nullable: true,
      resolve: (post) => [...Users.values()].find((user) => user.id === post.authorId),
    }),
    comments: t.field({
      type: [Comment],
      resolve: (post) => [...Comments.values()].filter((comment) => comment.postId === post.id),
    }),
  }),
});

export const commentRef = builder.objectType(Comment, {
  name: 'Comment',
  fields: (t) => ({
    id: t.exposeID('id'),
    comment: t.exposeString('comment'),
    author: t.field({
      type: User,
      nullable: true,
      resolve: (post) => [...Users.values()].find((user) => user.id === post.authorId),
    }),
    post: t.field({
      type: Post,
      resolve: (comment) => [...Posts.values()].find((post) => post.id === comment.postId)!,
    }),
  }),
});

const DEFAULT_PAGE_SIZE = 10;

export const queryRef = builder.queryType({
  fields: (t) => ({
    post: t.field({
      type: Post,
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (root, args) => Posts.get(String(args.id)),
    }),
    posts: t.field({
      type: [Post],
      nullable: true,
      args: {
        take: t.arg.int(),
        skip: t.arg.int(),
      },
      resolve: (root, { skip, take }) =>
        [...Posts.values()].slice(skip ?? 0, (skip ?? 0) + (take ?? DEFAULT_PAGE_SIZE)),
    }),
    user: t.field({
      type: User,
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (root, args) => Users.get(String(args.id)),
    }),
  }),
});
