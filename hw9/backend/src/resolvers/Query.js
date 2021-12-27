import { makeName } from "./utility";
const Query = {
  chatBox(parent, {name1, name2}, { db }, info) {
    if (!name1 || !name2) {
      throw new Error('empty chatbox name')
    }
    const chatBoxName = makeName(name1, name2)
    return db.ChatBoxModel.findOne({name:chatBoxName})
  },
  messages(parent, args, {db}, info){
    return db.MessageModel.find()
  },
  async users(parent, args, { db }, info) {
    const users = await db.UserModel.find()
    if (!args.query) return users
    return users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
};

export { Query as default };
