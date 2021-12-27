// find all messages in a certain chatbox
const ChatBox = {
    messages(parent, args, { db }, info) {
    //   console.log(parent.messages[0])
    //   console.log(await db.MessageModel.findById(parent.messages[0]))
      return Promise.all(
        parent.messages.map(
          (mId) => db.MessageModel.findById(mId))
      )
    },
};
export default ChatBox  