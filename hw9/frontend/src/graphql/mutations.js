import { gql } from "@apollo/client";

export const CREATE_CHATBOX_MUTATION = gql`
    mutation createChatBox($name1: String!, $name2:String!){
        createChatBox(name1: $name1, name2:$name2){
            id
            name
            messages{
                id
                sender{
                    id
                    name
                }
                body
            }
        }
    }
`

export const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage($from: String!, $to:String!, $message: String!){
        createMessage(from: $name1, to:$to, message:$message){
            sender{
                name
            }
            body
        }
    }
`