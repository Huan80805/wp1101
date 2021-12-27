const Message = {
    sender(parent, args, {db}, infro){
        return db.UserModel.findById(parent.sender)
    }
}
export default Message