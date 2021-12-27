import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
    subscription message($name1: String!, $to:String!){
        message(name1:$name1, name2:$name2){
            mutation
            data{
                sender {
                    name
                }
                body
            }
        }
    }
`