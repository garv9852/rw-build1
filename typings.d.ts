export interface props{
    children?:JSX.Element | JSX.Element[];
}
export interface jso{
    alreadyExist?:boolean,
    message?:string,
    erm?:any,
    accountCreated?:boolean
}
export interface Comment{
    name:string;
    comment:string;
    email:string;
    post:[object];
}

